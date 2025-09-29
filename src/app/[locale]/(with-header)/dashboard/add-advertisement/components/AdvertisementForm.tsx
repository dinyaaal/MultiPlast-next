"use client";

import { AdvertisementInputs } from "@/lib/schema";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { Category, MapSelectData, PriceType, ProductType } from "@/types/types";
import { Select, SelectItem } from "@heroui/react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Map from "@/Components/Map/Map";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";

interface AdvertisementFormProps {
  setNewPhotos: (photos: File[]) => void;
  setNewFiles: (files: File[]) => void;
  product?: ProductType | null;
  categories: Category[];
  register: UseFormRegister<AdvertisementInputs>;
  errors: FieldErrors<AdvertisementInputs>;
  setValue: UseFormSetValue<AdvertisementInputs>;
  watch: UseFormWatch<AdvertisementInputs>;
  clearErrors: UseFormClearErrors<AdvertisementInputs>;
  setProduct: (product: ProductType) => void;
}

const units = [
  { key: "for_hour", label: "За годину" },
  { key: "for_minute", label: "За хвилину" },
  { key: "for_piece", label: "За штуку" },
  { key: "for_kg", label: "За кілограм" },
  { key: "for_meter", label: "За метр" },
];

const advertTypes = [
  { key: "sell", label: "Продажа" },
  { key: "buy", label: "Покупка" },
];

export default function AdvertisementForm({
  setProduct,
  setNewPhotos,
  setNewFiles,
  clearErrors,
  product,
  categories,
  register,
  errors,
  setValue,
  watch,
}: AdvertisementFormProps) {
  const t = useTranslations("Dashboard.Sell");
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [files, setFiles] = useState<File[] | null>(null);
  const { data: session, status } = useSession();
  const [arrangement, setArrangement] = useState<boolean>(false);
  //   const [typePrice, setTypePrice] = useState<PriceType>({ type: "for_kg" });
  const [categoryId, setCategoryId] = useState<number>(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  const MAX_FILE_SIZE_MB = 100;

  const handlePhotosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const maxSize = MAX_FILE_SIZE_MB * 1024 * 1024; // 1 МБ в байтах

    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      toast.error(t("toast.photo-size-error"));
    }

    if (validFiles.length > 0) {
      const updatedPhotos = [...photos, ...validFiles];
      setPhotos((prevPhotos) => [...prevPhotos, ...validFiles]);
      setNewPhotos(updatedPhotos);
    }

    // Сброс input, чтобы можно было загрузить те же файлы повторно
    event.target.value = "";
  };

  const updateSearchParams = (params: Record<string, string | null>) => {
    // Создаём новый объект параметров
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    // Обновляем URL без перезагрузки страницы
    router.replace(`?${newParams.toString()}`);
  };

  const handleDeleteActivePhoto = async () => {
    if (!product || !session?.user.access_token) {
      // просто удаляем локально из photos если product нет или токена нет
      const totalProductPhotos = product?.photos?.length || 0;
      const totalUploadedPhotos = photos.length;
      if (activePhotoIndex >= totalProductPhotos) {
        const uploadedIndex = activePhotoIndex - totalProductPhotos;
        const newPhotos = [...photos];
        newPhotos.splice(uploadedIndex, 1);
        setPhotos(newPhotos);
        setNewPhotos(newPhotos);
        setActivePhotoIndex((prev) => Math.max(prev - 1, 0));
      }
      return;
    }

    const totalProductPhotos = product.photos.length;

    if (activePhotoIndex < totalProductPhotos) {
      // фото из product.photos — нужно вызвать API удаления
      const photoToDelete = product.photos[activePhotoIndex];

      try {
        const res = await fetch("/api/products/photos/delete", {
          method: "DELETE",
          headers: {
            token: session.user.access_token,
            id: String(photoToDelete.id),
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Ошибка при удалении фото");
        }

        // Если успешно, обновляем локально
        const newProductPhotos = [...product.photos];
        newProductPhotos.splice(activePhotoIndex, 1);

        // setProduct((prev) => ({
        //   ...prev!,
        //   photos: newProductPhotos,
        // }));
        const newProduct = {
          ...product!, // предыдущий объект
          photos: newProductPhotos,
        };
        setProduct(newProduct);

        // Обновляем индекс активного слайда
        setActivePhotoIndex((prev) => Math.max(prev - 1, 0));

        toast.success(t("toast.photo-delete-success"));
      } catch (err) {
        console.error("Ошибка при удалении:", err);
        toast.error(t("toast.photo-delete-error"));
      }
    } else {
      // фото из локальных загруженных photos
      const uploadedIndex = activePhotoIndex - totalProductPhotos;
      const newPhotos = [...photos];
      newPhotos.splice(uploadedIndex, 1);
      setPhotos(newPhotos);
      setNewPhotos(newPhotos);
      setActivePhotoIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFiles(Array.from(files));
    }
  };

  const handleAdvertTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("advertType", e.target.value as "sell" | "buy"); // обновляем react-hook-form
    updateSearchParams({ type: e.target.value }); // обновляем только advertType в URL
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    clearErrors();
    const newCategoryId = e.target.value;

    setValue("polymer", "");
    setCategoryId(Number(newCategoryId));
    setValue("mainCategory", newCategoryId);

    updateSearchParams({
      category: newCategoryId,
      subCategory: null,
    });

    if (Number(e.target.value) === 1 || Number(e.target.value) === 2) {
      setValue("type_price", "for_kg");
    } else if (Number(e.target.value) === 3 || Number(e.target.value) === 5) {
      setValue("type_price", "for_piece");
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue("type", e.target.value); // обновляем react-hook-form
    updateSearchParams({ subCategory: e.target.value }); // обновляем только advertType в URL
  };

  const handleCheckboxChange = (checkbox: "arrangement" | "fixed") => {
    if (checkbox === "arrangement") {
      const newValue = !arrangement;
      setArrangement(newValue);
      setValue("arrangement", newValue);
    } else {
      setArrangement(false);
      setValue("arrangement", false);
    }
  };

  const handleChangeTypePrice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedKey = event.target.value;
    const selectedUnit = units.find((unit) => unit.key === selectedKey);
    if (selectedUnit) {
      console.log(selectedUnit.key as PriceType["type"]);
      setValue("type_price", selectedUnit.key as PriceType["type"]);
      //   setTypePrice({
      //     type: selectedUnit.key as PriceType["type"],
      //   });
    }
  };

  const handleMapSelect = (data: MapSelectData) => {
    console.log(data);
    setValue("latitude", data.lat.toString());
    setValue("longitude", data.lng.toString());
    setValue("address", data.address.formatted);
    setValue("city", data.address.city);
    setValue("area", data.address.region);
  };

  const deleteFiles = () => {
    setFiles([]);
    setNewFiles([]);
  };

  return (
    <>
      <div className=" wrapper-dashboard">
        <h2 className="wrapper-dashboard__title title title--small">
          {t("fill-ad-title")}
        </h2>
        <div className="wrapper-dashboard__body body-dashboard">
          <div className="body-dashboard__wrapper">
            <div className="body-dashboard__block">
              <div className="input-block">
                <p>{t("select-ad-type")}*</p>

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
                  onChange={handleAdvertTypeChange}
                  // {...register("advertType")}
                  // onChange={(selectedKey) => handleChangeType(selectedKey)}
                >
                  {advertTypes.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <div className="input-block">
                <p>{t("select-category")}*</p>

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
                      ? t("select-equipment")
                      : Number(watch("mainCategory")) === 4
                      ? t("select-service")
                      : Number(watch("mainCategory")) === 5
                      ? t("select-type-ad")
                      : ""}
                  </p>

                  <Select
                    disallowEmptySelection
                    placeholder={
                      Number(watch("mainCategory")) === 2
                        ? t("select-type")
                        : Number(watch("mainCategory")) === 3
                        ? t("select-equipment")
                        : Number(watch("mainCategory")) === 4
                        ? t("select-service")
                        : Number(watch("mainCategory")) === 5
                        ? t("select-type-ad")
                        : ""
                    }
                    classNames={{
                      trigger: `min-h-[45px] text-black px-[12px] bg-[#F8FBFF] rounded-[5px] outline-offset-0 outline-[1px]  ${
                        errors.type ? "outline-[#FF0000] " : "outline-[#B0BFD7]"
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
                    // {...register("type")}
                    onChange={handleTypeChange}
                  >
                    {categories
                      .filter(
                        (category) =>
                          category.id === Number(watch("mainCategory"))
                      )
                      .flatMap((category) => category.categories)
                      .filter((subCategory) => subCategory.type === "Сировина")

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
                  <p>{t("select-polymer")}*</p>

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
            </div>
            <div className="body-dashboard__block">
              <div className="input-block">
                <p>{t("upload-photo")}</p>
                <div className="input-body-file">
                  <div className="input-body-file__input-wrapper">
                    <label
                      htmlFor="dashboard-photo"
                      className="input-body-file__input input"
                    >
                      {photos.length > 0 ||
                      (product?.photos && product?.photos?.length > 0) ? (
                        <>
                          <Swiper
                            spaceBetween={20}
                            slidesPerView={1}
                            modules={[Navigation]}
                            className="w-full "
                            navigation={{
                              nextEl: ".swiper-button-next",
                              prevEl: ".swiper-button-prev",
                            }}
                            onSlideChange={(swiper) =>
                              setActivePhotoIndex(swiper.activeIndex)
                            }
                          >
                            {product?.photos?.map((photo, index) => (
                              <SwiperSlide key={`product-${index}`}>
                                <Image
                                  src={photo.url}
                                  className="ibg"
                                  alt={`Uploaded image ${index + 1}`}
                                  width={600}
                                  height={600}
                                />
                              </SwiperSlide>
                            ))}
                            {photos.map((photo, index) => (
                              <SwiperSlide key={`uploaded-${index}`}>
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
                            className="swiper-button swiper-button-prev"
                          >
                            <ChevronRight />
                          </button>
                          <button
                            type="button"
                            className="swiper-button swiper-button-next"
                          >
                            <ChevronRight />
                          </button>
                        </>
                      ) : (
                        <Image
                          src="/icons/image.svg"
                          alt="no-image"
                          width={150}
                          height={150}
                          className="w-full h-full max-w-[150px] aspect-square"
                        />
                      )}

                      <input
                        type="file"
                        id="dashboard-photo"
                        accept="image/jpeg, image/png, image/webp"
                        // {...register("photos")}
                        onChange={handlePhotosChange}
                        multiple
                      />
                    </label>
                  </div>
                  <p>{t("main-photo")}</p>
                  <div className="input-body-file__content">
                    <div className="input-body-file__downloads downloads-input-body-file">
                      <div className="downloads-input-body-file__image-box">
                        <div className="downloads-input-body-file__image"></div>
                      </div>
                      <p className="downloads-input-body-file__text">
                        <span>
                          {(photos?.length || 0) +
                            (product?.photos?.length || 0)}
                        </span>{" "}
                        {t("photos-uploaded")}
                      </p>
                    </div>
                    <div className="input-body-file__actions">
                      <label
                        htmlFor="dashboard-photo"
                        className="input-body-file__button button"
                      >
                        {t("upload")}
                      </label>

                      {(photos.length > 0 ||
                        (product?.photos && product?.photos?.length > 0)) && (
                        <>
                          <button
                            type="button"
                            onClick={handleDeleteActivePhoto}
                            className="input-body-file__delete"
                          >
                            {t("delete")}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-dashboard__block">
            <div className="input-block input-block-title">
              <p>{t("enter-ad-title")}*</p>
              <div className="w-full flex flex-col items-end gap-1">
                <div className="input-body__item">{t("max-characters")}</div>
                <input
                  maxLength={150}
                  type="text"
                  placeholder={t("enter-ad-title")}
                  className={`input ${errors.title ? "input--error" : ""}`}
                  // value={watch("title")}
                  {...register("title")}
                />
              </div>
            </div>
            <div className="description input-block">
              <p>{t("enter-description")}*</p>
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
                <div className="input-body-file__content dashboard-files">
                  <div className="flex flex-col gap-1">
                    <p>{t("upload-files")}</p>

                    {files && files.length > 0 && (
                      <p className="input-body-file__item">
                        {t("files-uploaded")} {files.length}
                      </p>
                    )}
                  </div>
                  <div className="input-body-file__actions">
                    <label className="input-body-file__button button">
                      <input
                        id="dashboard-files"
                        type="file"
                        className="dashboard-files__input"
                        onChange={handleFilesChange}
                      />
                      {t("upload")}
                    </label>
                    <button
                      type="button"
                      onClick={deleteFiles}
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
      <div className="grid gap-10 ">
        <div className="flex flex-col gap-8 ">
          <h2 className=" title title--small">{t("enter-price")}</h2>
          <div className="flex flex-col gap-5">
            <div className="input-block input-block--price">
              <p>
                {Number(watch("mainCategory")) === 1 ||
                Number(watch("mainCategory")) === 2
                  ? t("price-per-kg")
                  : t("enter-price")}
              </p>

              <div className="input-block">
                {/* {(Number(watch("mainCategory")) === 1 ||
                      Number(watch("mainCategory")) === 2 ||
                      Number(watch("mainCategory")) === 3 ||
                      Number(watch("mainCategory")) === 5) && (
                      <p>{t("negotiated-price")}</p>
                    )} */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="block-row__item">
                    <label className="check">
                      <input
                        type="checkbox"
                        className="real-checkbox"
                        {...register("arrangement")}
                        // checked={arrangement}
                        // onChange={() => handleCheckboxChange("arrangement")}
                      />
                      <span className="custom-checkbox"></span>
                      {t("negotiated-price")}
                    </label>
                  </div>
                  <div className="block-row__item">
                    <label className="check">
                      <input
                        type="checkbox"
                        className="real-checkbox"
                        checked={!watch("arrangement")} // второй чекбокс активен, когда arrangement = false
                        onChange={() =>
                          setValue("arrangement", !watch("arrangement"))
                        }
                      />
                      <span className="custom-checkbox"></span>
                      Фіксована ціна
                    </label>
                  </div>
                </div>
              </div>
              <div className="block-row">
                {!watch("arrangement") && (
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>{t("fixed-price")}</p>

                      <label
                        className={`input-body input ${
                          errors.price ? "input--error" : ""
                        }`}
                      >
                        <input
                          disabled={watch("arrangement")}
                          autoComplete="off"
                          type="number"
                          placeholder=""
                          className="input-body__input input-number"
                          {...register("price")}
                        />
                        <div className="input-body__item">грн</div>
                      </label>
                    </div>
                  </div>
                )}
                {!watch("arrangement") &&
                  Number(watch("mainCategory")) === 4 && (
                    <div className="block-row__item">
                      <div className="input-block">
                        <p>{t("price-type")}</p>

                        <Select
                          isDisabled={arrangement}
                          disallowEmptySelection
                          placeholder={t("select-category")}
                          className="w-full"
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
                      </div>
                    </div>
                  )}
              </div>
            </div>
            {!watch("arrangement") &&
              (Number(watch("mainCategory")) === 1 ||
                Number(watch("mainCategory")) === 2) && (
                <button
                  type="button"
                  onClick={() => setShowDiscount((prev) => !prev)}
                  className=" button button--secondary"
                >
                  {showDiscount
                    ? t("price-without-discount")
                    : t("price-with-discount")}
                </button>
              )}
            {!watch("arrangement") &&
              showDiscount &&
              (Number(watch("mainCategory")) === 1 ||
                Number(watch("mainCategory")) === 2) && (
                <div className="block-row">
                  <div className="block-row__item">
                    <div className="input-block">
                      <p>{t("enter-volume")}</p>
                      <label className="input-body input">
                        <input
                          disabled={arrangement}
                          autoComplete="off"
                          type="number"
                          placeholder=""
                          className="input-body__input input-number"
                          {...register("volume")}
                        />
                        <div className="input-body__item">кг</div>
                      </label>
                    </div>
                  </div>

                  <div className="block-row__item">
                    <div className="input-block">
                      <p>{t("enter-price")}</p>
                      <label className="input-body input">
                        <input
                          disabled={arrangement}
                          autoComplete="off"
                          type="number"
                          placeholder=""
                          className="input-body__input input-number"
                          {...register("volume_price")}
                        />
                        <div className="input-body__item">грн</div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="flex flex-col gap-8 ">
          <h2 className="contact-dashboard__title title title--small">
            {t("location")}
          </h2>
          <div className="flex flex-col gap-5">
            <div
              className={`map ${
                errors.latitude || errors.longitude ? "input--error" : ""
              }`}
            >
              <Map
                lat={Number(watch("latitude"))}
                lng={Number(watch("longitude"))}
                onSelect={handleMapSelect}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 ">
          <h2 className="contact-dashboard__title title title--small">
            {t("information")}
          </h2>
          <div className="flex flex-col gap-5">
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
          </div>
        </div>
      </div>
    </>
  );
}
