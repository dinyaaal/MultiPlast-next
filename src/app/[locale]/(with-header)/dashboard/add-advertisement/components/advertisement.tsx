"use client";

import { AdvertisementInputs, AdvertismentSchema } from "@/lib/schema";
import { RootState } from "@/store/store";
import { Category, ProductType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";
import ContactsSection from "./ContactsSection";
import AdvertisementForm from "./AdvertisementForm";

interface SellProps {
  categories: Category[];
}

export default function Advertisement({ categories }: SellProps) {
  const t = useTranslations("Dashboard.Sell");
  const searchParams = useSearchParams();
  // const router = useRouter();
  const editId = searchParams.get("edit");
  const searchCategory = searchParams.get("category");
  const searchType = searchParams.get("type");
  const searchSubCategory = searchParams.get("subCategory");
  const router = useRouter();
  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { data: session, status } = useSession();
  const [product, setProduct] = useState<ProductType | null>(null);

  const [photos, setPhotos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<AdvertisementInputs>({
    resolver: zodResolver(AdvertismentSchema),
    defaultValues: {
      contact_data: [
        { name: "", position: "", phone_numbers: [""] }, // минимум один контакт с телефоном
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contact_data",
  });

  const fetchProduct = async () => {
    if (!editId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/product?id=${editId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data = await response.json();
      // const files = await Promise.all(
      //   data.photos.map(convertApiResponseToFile)
      // );
      // setPhotos(data.photos[0]);
      console.log(data.photos[0]);
      setProduct(data);
    } catch (err) {
      setProductError("Ошибка при загрузке продукта");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvertDelete = async () => {
    if (!session?.user.access_token || !editId) {
      return;
    }

    try {
      const deleteResponse = await fetch(`/api/products/delete`, {
        method: "DELETE",
        headers: {
          token: session?.user.access_token,
          id: editId,
        },
      });
      if (deleteResponse.ok) {
        toast.success("Удалено!");
        router.push("/products");
      } else {
        throw new Error("Ошибка обновления информации пользователя");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      toast.error("Ошибка удаления");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [editId]);

  useEffect(() => {
    if (userInfo && !editId) {
      setValue(
        "name_of_enterprise",
        userInfo?.name_of_enterprise ? userInfo?.name_of_enterprise : ""
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (product) {
      // Категории
      setValue(
        "mainCategory",
        product.categories.find((c) => c.parent_id === null)?.id?.toString() ||
          ""
      );
      setValue(
        "polymer",
        product.categories.find((c) => c.type === "Полімер")?.id?.toString() ||
          ""
      );
      setValue(
        "type",
        product.categories.find((c) => c.type === "Сировина")?.id?.toString() ||
          ""
      );

      // Основные поля объявления
      setValue("title", product.title);
      setValue("text", product.text);
      console.log(product.latitude, product.longitude);
      setValue("latitude", product.latitude);
      setValue("longitude", product.longitude);
      setValue("price", product.price?.toString() || "");
      // setArrangement(product.type_price === "by_arrangement");
      setValue("arrangement", product.type_price === "by_arrangement");
      setValue("volume", product.volume || "");
      setValue("volume_price", product.price_per_volume || "");
      setValue("advertType", product.type_of_product || "");
      setValue("address", product.contacts[0].address || "");
      setValue("city", product.contacts[0].city || "");
      setValue("area", product.contacts[0].area || "");
      setValue(
        "name_of_enterprise",
        product.contacts[0].name_of_enterprise || ""
      );

      // Заполняем массив контактов
      if (Array.isArray(product.contacts) && product.contacts.length > 0) {
        reset({
          contact_data: product.contacts.map((c) => ({
            name: c.name,

            position: c.position || "", // если есть поле position, добавь в интерфейс и сюда
          })),
        });
      } else {
        reset({ contact_data: [] });
      }
    }
  }, [product]);

  useEffect(() => {
    reset(
      {
        type: "",
        polymer: "",
      },
      {
        keepErrors: false, // ошибки тоже будут сброшены
      }
    );
  }, [searchParams]);

  useEffect(() => {
    // reset();
    const newCategoryId = searchCategory || "1";
    // const newSubCategoryId = searchSubCategory || "1";

    const typeParam = searchType;
    const newAdvertType =
      typeParam === "sell" || typeParam === "buy" ? typeParam : "sell";
    // setCategoryId(Number(newCategoryId));

    // setAdvertType(newAdvertType);

    setValue("mainCategory", newCategoryId);
    setValue("advertType", newAdvertType);
    setValue("type", searchSubCategory || "");
  }, [searchCategory, searchSubCategory, searchType]);

  const processForm: SubmitHandler<AdvertisementInputs> = async (data) => {
    if (!session?.user.access_token && !session?.user.id) {
      return;
    }

    setIsLoadingRequest(true);

    const token = session.user.access_token;

    const formData = new FormData();

    const {
      address,
      city,
      area,
      latitude,
      longitude,
      name_of_enterprise,
      mainCategory,
      type,
      polymer,
      title,
      text,
      price,
      volume,
      volume_price,
      arrangement,
      contact_data, // <- ожидаем, что это массив контактов
    } = data;

    const categoriesData = { mainCategory, type, polymer };
    Object.entries(categoriesData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(`categories[${key}]`, value);
      }
    });

    // Контакты
    (contact_data || []).forEach((contact, index) => {
      const { phone_numbers, name, position } = contact;

      formData.append(`contact_data[${index}][name]`, name);
      if (position)
        formData.append(`contact_data[${index}][position]`, position);
      if (phone_numbers && phone_numbers.length > 0) {
        phone_numbers.forEach((phone, phoneIndex) => {
          formData.append(
            `contact_data[${index}][phone_numbers][${phoneIndex}]`,
            phone
          );
        });
      }

      // Можно добавить поля адреса для каждого контакта, если нужно
      if (city) {
        formData.append(`contact_data[${index}][city]`, city);
      }
      if (address) {
        formData.append(`contact_data[${index}][address]`, address);
      }
      if (area) {
        formData.append(`contact_data[${index}][area]`, area);
      }
      if (name_of_enterprise)
        formData.append(
          `contact_data[${index}][name_of_enterprise]`,
          name_of_enterprise
        );
    });

    // Файлы и фото
    photos.forEach((photo) => formData.append("photos[]", photo));
    if (files && files.length > 0) {
      files.forEach((file) => formData.append("files[]", file));
    }

    // Основные поля объявления
    formData.append("title", title);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    if (text) formData.append("text", text);
    formData.append("type_of_product", data.advertType);
    formData.append(
      "type_price",
      data.arrangement ? "by_arrangement" : data.type_price || ""
      // arrangement ? "by_arrangement" : typePrice.type
    );

    if (!arrangement && price) formData.append("price", price);
    if (volume && volume_price) {
      formData.append("volume", volume);
      formData.append("price_per_volume", volume_price);
    }

    if (editId && product) {
      try {
        const editResponse = await fetch(`/api/products/edit`, {
          method: "POST",
          headers: {
            token: token,
            id: editId,
          },
          body: formData,
        });
        if (editResponse.ok) {
          toast.success(t("toast.update-success"));
          const result = await editResponse.json();
          router.push(`/products/${product.id}`);
        } else {
          throw new Error(t("toast.update-error"));
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        toast.error(t("toast.update-error"));
      } finally {
        setIsLoadingRequest(false);
      }
    } else {
      try {
        const postResponse = await fetch(`/api/products/add`, {
          method: "POST",
          headers: {
            token: token,
          },
          body: formData,
        });
        const result = await postResponse.json();
        if (postResponse.ok) {
          toast.success(t("toast.success"));
          router.push(`/products/${result.id}`);
        } else {
          const errorMessage = result?.error || "Ошибка создания товара";
          throw new Error(errorMessage);
        }
      } catch (error: any) {
        console.error("Ошибка при отправке данных:", error);
        toast.error(error.message || t("toast.error"));
      } finally {
        setIsLoadingRequest(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-full flex-auto items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <form className="dashboard__form" onSubmit={handleSubmit(processForm)}>
        <AdvertisementForm
          setNewPhotos={setPhotos}
          setNewFiles={setFiles}
          setProduct={setProduct}
          product={product}
          clearErrors={clearErrors}
          categories={categories}
          register={register}
          watch={watch}
          errors={errors}
          setValue={setValue}
        />
        <ContactsSection
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          fields={fields}
          append={append}
          remove={remove}
        />
        <div className="dashboard__actions actions-dashboard">
          <button
            type="submit"
            disabled={isLoadingRequest}
            className="actions-dashboard__save button"
          >
            {t("save-publish")}
            {isLoadingRequest && <Spinner color="current" size="sm" />}
          </button>
          {editId && product && (
            <button
              type="button"
              onClick={handleAdvertDelete}
              className="actions-dashboard__delete button button--secondary"
            >
              {t("delete-ad")}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
