"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { AdvertismentSchema } from "@/lib/schema";
import { RootState } from "@/store/store";
import { Category, Photo, ProductType, User } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectItem, Spinner } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

interface SellProps {
  categories: Category[];
}

const units = [
  { key: "for_hour", label: "За годину" },
  { key: "for_minute", label: "За хвилину" },
  { key: "for_piece", label: "За штуку" },
  { key: "for_kg", label: "За кілограм" },
];

const advertTypes = [
  { key: "sell", label: "Продажа" },
  { key: "buy", label: "Покупка" },
];

interface typePrice {
  type: "by_arrangement" | "for_minute" | "for_hour" | "for_piece" | "for_kg";
}

type Inputs = z.infer<typeof AdvertismentSchema>;

export default function Advertisement({ categories }: SellProps) {
  const t = useTranslations("Sell");
  const searchParams = useSearchParams();
  // const router = useRouter();
  const editId = searchParams.get("edit");
  const searchCategory = searchParams.get("category");
  const searchType = searchParams.get("type");
  const searchSubCategory = searchParams.get("subCategory");
  const router = useRouter();
  const pathname = usePathname();
  const { data: userInfo, error } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { data: session, status } = useSession();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [categoryId, setCategoryId] = useState<number>(1);
  const [advertType, setAdvertType] = useState<"sell" | "buy">("sell");
  const [arrangement, setArrangement] = useState<boolean>(false);

  const [photos, setPhotos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[] | null>(null);
  const [typePrice, setTypePrice] = useState<typePrice>({ type: "for_kg" });
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
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AdvertismentSchema),
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
      setValue("name", userInfo?.first_name ? userInfo?.first_name : "");
      setValue(
        "name_of_enterprise",
        userInfo?.name_of_enterprise ? userInfo?.name_of_enterprise : ""
      );
      setValue("city", userInfo?.city ? userInfo?.city : "");
      setValue("address", userInfo?.address ? userInfo?.address : "");
      setValue("area", userInfo?.area ? userInfo?.area : "");
      setValue(
        "phone_number",
        userInfo?.phone_number ? userInfo?.phone_number : ""
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (product) {
      // setCategoryId(
      //   Number(
      //     product?.categories.find((category) => category.parent_id === null)
      //       ?.id
      //   )
      // );
      setValue(
        "mainCategory",
        product?.categories
          .find((category) => category.parent_id === null)
          ?.id?.toString() || ""
      );
      setValue("title", product?.title);
      setValue("text", product?.text);
      setValue("address", product?.contact.address || "");
      setValue("name", product?.contact.name || "");
      setValue("area", product?.contact.area || "");
      setValue("city", product?.contact.city || "");
      setValue("name_of_enterprise", product?.contact.name_of_enterprise || "");
      setValue("phone_number", product?.contact.phone_number || "");
      setValue("price", product.price?.toString() || "");
      setArrangement(product.type_price === "by_arrangement");

      setValue("advertType", product?.type_of_product || "");
      setValue(
        "polymer",
        product?.categories
          .find((category) => category.type === "Полімер")
          ?.id?.toString() || ""
      );
      setValue(
        "type",
        product?.categories
          .find((category) => category.type === "Сировина")
          ?.id?.toString() || ""
      );
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
    setCategoryId(Number(newCategoryId));
    setAdvertType(newAdvertType);
    setValue("mainCategory", newCategoryId);
    setValue("advertType", newAdvertType);
    setValue("type", searchSubCategory || "");
  }, [searchCategory, searchSubCategory, searchType]);

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPhotos((prevPhotos) => [...prevPhotos, ...Array.from(files)]);
    }
  };
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    clearErrors();
    reset(
      {
        type: "",
        polymer: "",
      },
      {
        keepErrors: false, // ошибки тоже будут сброшены
      }
    );
    setCategoryId(Number(e.target.value));
    setValue("mainCategory", e.target.value);
    if (Number(e.target.value) === 1 || Number(e.target.value) === 2) {
      setTypePrice({
        type: "for_kg",
      });
    } else if (Number(e.target.value) === 3 || Number(e.target.value) === 5) {
      setTypePrice({
        type: "for_piece",
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrangement(e.target.checked);
  };

  const handleChangeTypePrice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedKey = event.target.value;
    const selectedUnit = units.find((unit) => unit.key === selectedKey);
    if (selectedUnit) {
      setTypePrice({
        type: selectedUnit.key as typePrice["type"],
      });
    }
  };
  // const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setAdvertType(event.target.value as "sell" | "buy");
  // };

  const processForm: SubmitHandler<Inputs> = async (data) => {
    if (!session?.user.access_token && !session?.user.id) {
      return;
    }

    setIsLoadingRequest(true);

    const token = session.user.access_token;

    const formData = new FormData();

    const {
      name_of_enterprise,
      name,
      phone_number,
      address,
      city,
      area,
      mainCategory,
      type,
      polymer,
      title,
      text,
      price,
      volume,
      volume_price,
      arrangement,
    } = data;

    const categoriesData = {
      mainCategory,
      type,
      polymer,
    };

    const contactData = {
      name_of_enterprise,
      name,
      phone_number,
      address,
      city,
      area,
    };
    Object.entries(categoriesData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(`categories[${key}]`, value);
      }
    });

    Object.entries(contactData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(`contact_data[${key}]`, value);
      }
    });

    if (photos && photos.length > 0) {
      photos.forEach((photo) => {
        formData.append("photos[]", photo);
      });
    }

    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("files[]", file);
      });
    }

    formData.append("title", title);
    if (text) {
      formData.append("text", text);
    }

    formData.append("type_of_product", data.advertType);
    if (arrangement) {
      formData.append("type_price", "by_arrangement");
    } else {
      formData.append("type_price", typePrice.type);
    }
    if (!arrangement && price) {
      formData.append("price", price);
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
          toast.success("Обновлено!");
        } else {
          throw new Error("Ошибка обновления информации пользователя");
        }
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        toast.error("Ошибка обновления товара");
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
        if (postResponse.ok) {
          toast.success("Оголошення подано");
        } else {
          throw new Error("Ошибка обновления информации пользователя");
        }
        const editResult = await postResponse.json();
        console.log(editResult);
      } catch (error) {
        console.error("Ошибка при отправке данных:", error);
        toast.error("Ошибка создания товара");
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
      <form
        className="advertisement__form"
        onSubmit={handleSubmit(processForm)}
      >
        <div className=" wrapper-advertisement">
          <h2 className="wrapper-advertisement__title title title--small">
            {t("fill-ad-title")}
          </h2>
          <div className="wrapper-advertisement__body body-advertisement">
            <div className="body-advertisement__wrapper">
              <div className="body-advertisement__block">
                <div className="input-block">
                  <p>{t("select-category")}</p>

                  <Select
                    placeholder={`Виберерите тип объявления`}
                    disallowEmptySelection
                    classNames={{
                      trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                        errors.advertType
                          ? "outline-[#FF0000] "
                          : "outline-[#B0BFD7]"
                      } `,

                      popoverContent:
                        "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
                      listbox: "p-0",
                    }}
                    listboxProps={{
                      itemClasses: {
                        base: [
                          "min-h-[39px]",
                          "px-[15px]",
                          "py-[5px]",
                          "rounded-none",
                          "bg-transparent",
                          "transition-colors",

                          "data-[hover=true]:bg-[#c4dbff]",
                          "data-[selectable=true]:focus:bg-[#c4dbff]",
                        ],
                      },
                    }}
                    // defaultSelectedKeys={[advertType]}
                    selectedKeys={[watch("advertType")?.toString() || ""]}
                    {...register("advertType")}
                    // onChange={(selectedKey) => handleChangeType(selectedKey)}
                  >
                    {advertTypes.map((type) => (
                      <SelectItem key={type.key}>{type.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="input-block">
                  <p>{t("select-category")}</p>

                  <Select
                    placeholder={t("select-category")}
                    disallowEmptySelection
                    classNames={{
                      trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                        errors.mainCategory
                          ? "outline-[#FF0000] "
                          : "outline-[#B0BFD7]"
                      } `,

                      popoverContent:
                        "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
                      listbox: "p-0",
                    }}
                    listboxProps={{
                      itemClasses: {
                        base: [
                          "min-h-[39px]",
                          "px-[15px]",
                          "py-[5px]",
                          "rounded-none",
                          "bg-transparent",
                          "transition-colors",

                          "data-[hover=true]:bg-[#c4dbff]",
                          "data-[selectable=true]:focus:bg-[#c4dbff]",
                        ],
                      },
                    }}
                    // defaultSelectedKeys={[categoryId.toString()]}
                    selectedKeys={[watch("mainCategory")?.toString() || ""]}
                    // {...register("mainCategory")}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                </div>
                {Number(watch("mainCategory")) !== 1 && (
                  <div className="input-block">
                    <p>
                      {Number(watch("mainCategory")) === 2
                        ? t("select-type")
                        : Number(watch("mainCategory")) === 3
                        ? "Виберіть тип устаткування:"
                        : Number(watch("mainCategory")) === 4
                        ? "Виберіть послугу:"
                        : Number(watch("mainCategory")) === 5
                        ? "Виберіть тип оголошення:"
                        : ""}
                    </p>

                    <Select
                      disallowEmptySelection
                      placeholder={
                        Number(watch("mainCategory")) === 2
                          ? t("select-type")
                          : Number(watch("mainCategory")) === 3
                          ? "Виберіть тип устаткування:"
                          : Number(watch("mainCategory")) === 4
                          ? "Виберіть послугу:"
                          : Number(watch("mainCategory")) === 5
                          ? "Виберіть тип оголошення:"
                          : ""
                      }
                      classNames={{
                        trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                          errors.type
                            ? "outline-[#FF0000] "
                            : "outline-[#B0BFD7]"
                        } `,

                        popoverContent:
                          "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
                        listbox: "p-0",
                      }}
                      listboxProps={{
                        itemClasses: {
                          base: [
                            "min-h-[39px]",
                            "px-[15px]",
                            "py-[5px]",
                            "rounded-none",
                            "bg-transparent",
                            "transition-colors",

                            "data-[hover=true]:bg-[#c4dbff]",
                            "data-[selectable=true]:focus:bg-[#c4dbff]",
                          ],
                        },
                      }}
                      // defaultSelectedKeys={[
                      //   product?.categories
                      //     .find((category) => category.type === "Сировина")
                      //     ?.id?.toString() || "",
                      // ]}
                      selectedKeys={[watch("type")?.toString() || ""]}
                      {...register("type")}
                      // onChange={handleTypeChange}
                    >
                      {categories
                        .filter(
                          (category) =>
                            category.id === Number(watch("mainCategory"))
                        )
                        .flatMap((category) => category.categories)
                        .filter(
                          (subCategory) => subCategory.type === "Сировина"
                        )

                        .map((subCategory) => (
                          <SelectItem key={subCategory.id}>
                            {subCategory.name}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                )}

                {(Number(watch("mainCategory")) === 1 ||
                  Number(watch("mainCategory")) === 2) && (
                  <div className="input-block">
                    <p>{t("select-polymer")}</p>

                    <Select
                      disallowEmptySelection
                      placeholder={t("select-polymer")}
                      classNames={{
                        trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                          errors.polymer
                            ? "outline-[#FF0000] "
                            : "outline-[#B0BFD7]"
                        } `,

                        popoverContent:
                          "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
                        listbox: "p-0",
                      }}
                      listboxProps={{
                        itemClasses: {
                          base: [
                            "min-h-[39px]",
                            "px-[15px]",
                            "py-[5px]",
                            "rounded-none",
                            "bg-transparent",
                            "transition-colors",

                            "data-[hover=true]:bg-[#c4dbff]",
                            "data-[selectable=true]:focus:bg-[#c4dbff]",
                          ],
                        },
                      }}
                      // defaultSelectedKeys={[
                      //   product?.categories
                      //     .find((category) => category.type === "Полімер")
                      //     ?.id?.toString() || "",
                      // ]}
                      selectedKeys={[watch("polymer")?.toString() || ""]}
                      {...register("polymer")}
                      // onChange={handlePolymerChange}
                    >
                      {categories
                        .filter(
                          (category) =>
                            category.id === Number(watch("mainCategory"))
                        )
                        .flatMap((category) => category.categories)
                        .filter((subCategory) => subCategory.type === "Полімер")

                        .map((subCategory) => (
                          <SelectItem key={subCategory.id}>
                            {subCategory.name}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                )}

                <div className="input-block input-block--price">
                  <p>
                    {Number(watch("mainCategory")) === 1 ||
                    Number(watch("mainCategory")) === 2
                      ? t("price-per-kg")
                      : t("enter-price")}
                  </p>
                  <div className="block-row block-row--nowrap">
                    <div className="input-block">
                      {(Number(watch("mainCategory")) === 1 ||
                        Number(watch("mainCategory")) === 2 ||
                        Number(watch("mainCategory")) === 3 ||
                        Number(watch("mainCategory")) === 5) && (
                        <p>{t("negotiated-price")}</p>
                      )}
                      <div className="block-row__item">
                        <label className="check">
                          <input
                            type="checkbox"
                            className="real-checkbox"
                            checked={arrangement}
                            {...register("arrangement")}
                            onChange={handleCheckboxChange}
                          />
                          <span className="custom-checkbox"></span>
                          {t("negotiated-price")}
                        </label>
                      </div>
                      {Number(watch("mainCategory")) === 4 && (
                        <Select
                          isDisabled={arrangement}
                          disallowEmptySelection
                          placeholder={t("select-category")}
                          classNames={{
                            trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]`,

                            popoverContent:
                              "bg-[#F8FBFF] p-0 rounded-[5px] outline-offset-0 outline-[1px] outline-[#B0BFD7]",
                            listbox: "p-0",
                          }}
                          listboxProps={{
                            itemClasses: {
                              base: [
                                "min-h-[39px]",
                                "px-[15px]",
                                "py-[5px]",
                                "rounded-none",
                                "bg-transparent",
                                "transition-colors",

                                "data-[hover=true]:bg-[#c4dbff]",
                                "data-[selectable=true]:focus:bg-[#c4dbff]",
                              ],
                            },
                          }}
                          defaultSelectedKeys={["for_hour"]}
                          onChange={(selectedKey) =>
                            handleChangeTypePrice(selectedKey)
                          }
                        >
                          {units.map((unit) => (
                            <SelectItem key={unit.key}>{unit.label}</SelectItem>
                          ))}
                        </Select>
                      )}
                    </div>

                    <div className="input-block">
                      <p>{t("fixed-price")}</p>
                      <div className="block-row__item">
                        <div
                          className={`input-body input ${
                            errors.price ? "input--error" : ""
                          }`}
                        >
                          <input
                            disabled={arrangement}
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                            {...register("price")}
                          />
                          <div className="input-body__item">грн</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {(Number(watch("mainCategory")) === 1 ||
                  Number(watch("mainCategory")) === 2) && (
                  <div className="block-row">
                    <div className="block-row__item">
                      <div className="input-block">
                        <p>{t("enter-volume")}</p>
                        <div className="input-body input">
                          <input
                            disabled={arrangement}
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                            {...register("volume")}
                          />
                          <div className="input-body__item">кг</div>
                        </div>
                      </div>
                    </div>

                    <div className="block-row__item">
                      <div className="input-block">
                        <p>{t("enter-price")}</p>
                        <div className="input-body input">
                          <input
                            disabled={arrangement}
                            autoComplete="off"
                            type="number"
                            placeholder=""
                            className="input-body__input input-number"
                            {...register("volume_price")}
                          />
                          <div className="input-body__item">грн</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="body-advertisement__block">
                <div className="input-block input-block-title">
                  <p>{t("enter-ad-title")}</p>
                  <div className="input-body input-body--title">
                    <input
                      maxLength={150}
                      type="text"
                      placeholder={t("enter-ad-title")}
                      className={`input ${errors.title ? "input--error" : ""}`}
                      // value={watch("title")}
                      {...register("title")}
                    />
                    <div className="input-body__item">
                      {t("max-characters")}
                    </div>
                  </div>
                </div>
                <div className="input-block">
                  <p>{t("upload-photo")}</p>
                  <div className="input-body-file">
                    <div className="input-body-file__input-wrapper">
                      <label
                        htmlFor="advertisement-photo"
                        className="input-body-file__input input"
                      >
                        {/* <Swiper
                          spaceBetween={20}
                          slidesPerView={1}
                          modules={[Navigation]}
                          className="w-full h-full"
                          // navigation={{
                          //   nextEl: ".swiper-arrow-next",
                          //   prevEl: ".swiper-arrow-prev",
                          // }}
                        >
                          <SwiperSlide>
                            <Image
                              src={"/icons/image.svg"}
                              className="ibg"
                              alt="User image"
                              width={600}
                              height={600}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Image
                              src={"/icons/image.svg"}
                              className="ibg"
                              alt="User image"
                              width={600}
                              height={600}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Image
                              src={"/icons/image.svg"}
                              className="ibg"
                              alt="User image"
                              width={600}
                              height={600}
                            />
                          </SwiperSlide>
                          <SwiperSlide>
                            <Image
                              src={"/icons/image.svg"}
                              className="ibg"
                              alt="User image"
                              width={600}
                              height={600}
                            />
                          </SwiperSlide>
                        </Swiper> */}
                        {photos && photos?.length > 0 && (
                          <>
                            <Swiper
                              spaceBetween={20}
                              slidesPerView={1}
                              modules={[Navigation]}
                              className="w-full h-full"
                              navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                              }}
                            >
                              {photos.map((photo, index) => (
                                <SwiperSlide key={index}>
                                  <Image
                                    src={URL.createObjectURL(photo)}
                                    className="ibg"
                                    alt={`Uploaded image ${index + 1}`}
                                    width={600}
                                    height={600}
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                            <button
                              type="button"
                              className="swiper-button swiper-button-prev "
                            >
                              <svg
                                width="41"
                                height="41"
                                viewBox="0 0 41 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="40"
                                  height="40"
                                  rx="3.5"
                                  fill="#1858B8"
                                  stroke="#1858B8"
                                />
                                <path
                                  d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              className="swiper-button swiper-button-next "
                            >
                              <svg
                                width="41"
                                height="41"
                                viewBox="0 0 41 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="0.5"
                                  y="0.5"
                                  width="40"
                                  height="40"
                                  rx="3.5"
                                  fill="#1858B8"
                                  stroke="#1858B8"
                                />
                                <path
                                  d="M24.5303 21.5303C24.8232 21.2374 24.8232 20.7626 24.5303 20.4697L19.7574 15.6967C19.4645 15.4038 18.9896 15.4038 18.6967 15.6967C18.4038 15.9896 18.4038 16.4645 18.6967 16.7574L22.9393 21L18.6967 25.2426C18.4038 25.5355 18.4038 26.0104 18.6967 26.3033C18.9896 26.5962 19.4645 26.5962 19.7574 26.3033L24.5303 21.5303ZM24 20.25H23V21.75H24V20.25Z"
                                  fill="white"
                                />
                              </svg>
                            </button>
                          </>
                        )}

                        <input
                          type="file"
                          id="advertisement-photo"
                          accept="image/jpeg, image/png"
                          // {...register("photos")}
                          onChange={handlePhotosChange}
                          multiple
                        />
                      </label>
                    </div>
                    <div className="input-body-file__content">
                      <div className="input-body-file__downloads downloads-input-body-file">
                        <div className="downloads-input-body-file__image-box">
                          <div className="downloads-input-body-file__image"></div>
                        </div>
                        <p className="downloads-input-body-file__text">
                          <span>{photos?.length || 0} </span>{" "}
                          {t("photos-uploaded")}
                        </p>
                      </div>
                      <div className="input-body-file__actions">
                        <label
                          htmlFor="advertisement-photo"
                          className="input-body-file__button button"
                        >
                          {t("upload")}
                        </label>
                        <button
                          type="button"
                          onClick={(e) => setPhotos([])}
                          className="input-body-file__delete"
                        >
                          {t("delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-advertisement__block">
              <div className="description input-block">
                <p>{t("enter-description")}</p>
                <textarea
                  placeholder="Написати..."
                  className={`description__input input  ${
                    errors.text ? "input--error" : ""
                  }`}
                  // value={watch("text")}
                  {...register("text")}
                ></textarea>
              </div>
              <div className="input-block">
                <div className="input-body-file">
                  <div className="input-body-file__content advertisement-files">
                    <p>{t("upload-files")}</p>
                    <div className="input-body-file__actions">
                      <label className="input-body-file__button button">
                        <input
                          id="advertisement-files"
                          type="file"
                          className="advertisement-files__input"
                          onChange={handleFilesChange}
                          multiple
                        />
                        {t("upload")}
                      </label>
                      <button
                        type="button"
                        onClick={(e) => setFiles([])}
                        className="input-body-file__delete"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="advertisement__contact contact-advertisement">
          <h2 className="contact-advertisement__title title title--small">
            {t("contact-details")}
          </h2>
          <div className="contact-advertisement__body">
            <div className="contact-advertisement__content">
              <div className="input-block">
                <p>{t("company-name")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${
                    errors.name_of_enterprise ? "input--error" : ""
                  }`}
                  {...register("name_of_enterprise")}
                  // value={
                  //   userInformation?.name_of_enterprise
                  //     ? userInformation?.name_of_enterprise
                  //     : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev
                  //       ? { ...prev, name_of_enterprise: e.target.value }
                  //       : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("name")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.name ? "input--error" : ""}`}
                  {...register("name")}
                  // value={
                  //   userInformation?.first_name
                  //     ? userInformation?.first_name
                  //     : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, name: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("phone")}</p>
                <input
                  autoComplete="off"
                  type="number"
                  placeholder=""
                  className={`input ${
                    errors.phone_number ? "input--error" : ""
                  }`}
                  {...register("phone_number")}
                  // value={
                  //   userInformation?.phone_number
                  //     ? userInformation?.phone_number
                  //     : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, phone_number: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("address")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.address ? "input--error" : ""}`}
                  {...register("address")}
                  // value={
                  //   userInformation?.address ? userInformation?.address : ""
                  // }
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, address: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("city")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.city ? "input--error" : ""}`}
                  {...register("city")}
                  // value={userInformation?.city ? userInformation?.city : ""}
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, city: e.target.value } : null
                  //   )
                  // }
                />
              </div>
              <div className="input-block">
                <p>{t("region")}</p>
                <input
                  autoComplete="off"
                  type="text"
                  placeholder=""
                  className={`input ${errors.area ? "input--error" : ""}`}
                  {...register("area")}
                  // value={userInformation?.area ? userInformation?.area : ""}
                  // onChange={(e) =>
                  //   setUserInformation((prev) =>
                  //     prev ? { ...prev, area: e.target.value } : null
                  //   )
                  // }
                />
              </div>
            </div>
            <p className="contact-advertisement__text">{t("default-info")}</p>
          </div>
        </div>
        <div className="advertisement__actions actions-advertisement">
          <button type="submit" className="actions-advertisement__save button">
            {t("save-publish")}
            {isLoadingRequest && <Spinner color="current" size="sm" />}
          </button>
          {editId && product && (
            <button
              type="button"
              onClick={handleAdvertDelete}
              className="actions-advertisement__delete button button--secondary"
            >
              {t("delete-ad")}
            </button>
          )}
        </div>
      </form>
    </>
  );
}
