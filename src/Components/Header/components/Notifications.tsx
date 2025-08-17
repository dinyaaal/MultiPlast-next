"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/ClickOutside";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { NotificationType } from "@/types/types";
import { useTranslations } from "next-intl";

// const notificationsFake = [
//   {
//     id: 51,
//     title: "1234567890",
//     content: " Asf sdfsdf jasdf ;lsdfjsdflsj fl;asfj lsdfj dklsfjlsdf jdsfsdaf",
//     to_user_id: 14,
//     is_read: 0,
//     type: 3,
//     read_at: null,
//     root_id: null,
//     created_at: "2025-05-22T05:43:06.000000Z",
//     updated_at: "2025-05-22T05:43:06.000000Z",
//     should_be_shown_in: "2025-05-22 05:42:40",
//   },
//   {
//     id: 52,
//     title: "1234567890",
//     content: " Asf sdfsdf jasdf ;lsdfjsdflsj fl;asfj lsdfj dklsfjlsdf jdsfsdaf",
//     to_user_id: 14,
//     is_read: 0,
//     type: 3,
//     read_at: null,
//     root_id: null,
//     created_at: "2025-05-22T05:43:06.000000Z",
//     updated_at: "2025-05-22T05:43:06.000000Z",
//     should_be_shown_in: "2025-05-22 05:42:40",
//   },
//   {
//     id: 53,
//     title: "1234567890321",
//     content: " Asf sdfsdf jasdf ;lsdfjsdflsj fl;asfj lsdfj dklsfjlsdf jdsfsdaf",
//     to_user_id: 14,
//     is_read: 1,
//     type: 3,
//     read_at: null,
//     root_id: null,
//     created_at: "2025-05-22T05:43:06.000000Z",
//     updated_at: "2025-05-22T05:43:06.000000Z",
//     should_be_shown_in: "2025-05-22 05:42:40",
//   },
// ];

export default function Notifications() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notificationsList, setNotificationsList] = useState<
    NotificationType[]
  >([]);

  const { rootEl } = useClickOutside(setIsOpen);
  const { data: session, status } = useSession();
  const t = useTranslations("Notifications");

  const token = session?.user?.access_token;

  const handleReadItem = async (id: number) => {
    const newList: NotificationType[] = notificationsList.map((item) =>
      item.id === id ? { ...item, is_read: 1 as 0 | 1 } : item
    );
    setNotificationsList(newList);

    if (!token) return;

    try {
      const res = await fetch(`/api/notifications/read`, {
        method: "POST",
        headers: {
          token: `${token}`,
          id: `${id}`,
        },
      });

      if (!res.ok) throw new Error(t("toast.readItemError"));
    } catch (error) {
      toast.error(t("toast.readItemError"));
    }
  };

  const handleRead = async () => {
    if (!token) return;

    // Обновляем список уведомлений локально
    const updated = notificationsList.map((item) => ({
      ...item,
      is_read: 1 as 0 | 1,
    }));
    setNotificationsList(updated);

    toast.success(t("toast.readAllSuccess"));

    try {
      const res = await fetch("/api/notifications/read-all", {
        method: "POST",
        headers: {
          token: `${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(t("toast.readAllError"));
      }
    } catch (error) {
      toast.error(t("toast.readAllError"));
    }
  };

  const getNotifications = async () => {
    if (!token) return;

    try {
      const res = await fetch("/api/notifications/get", {
        method: "GET",
        headers: {
          token: `${token}`,
        },
      });

      if (!res.ok) throw new Error(t("toast.getError"));

      const data = await res.json();
      setNotificationsList(data.notifications);
    } catch (error) {
      toast.error(t("toast.getError"));
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getNotifications();
    }
  }, [status]);

  useEffect(() => {
    setNotificationsCount(
      notificationsList.filter((item) => item.is_read === 0).length
    );
  }, [notificationsList]);

  return (
    <div className="notifications__inner" ref={rootEl}>
      <button
        onClick={(_) => setIsOpen(!isOpen)}
        className={`btn-icon btn-icon--notify notifications notifications--desktop ${
          isOpen ? "active" : ""
        }`}
      >
        <div className="btn-icon__image">
          <Image src="/icons/bell.svg" alt="Icon" width={100} height={100} />
        </div>
        {!!notificationsCount && (
          <div className="notification-value">
            <span className="notification-value__number">
              {notificationsCount}
            </span>
          </div>
        )}
      </button>
      <div
        className={
          "notifications__body body-notifications " + (isOpen ? "active" : "")
        }
      >
        <div className="body-notifications__items">
          {notificationsList.length > 0 ? (
            <>
              <button
                disabled={!notificationsCount}
                onClick={handleRead}
                className="login-user__link link-login-user login-user__log-in"
              >
                {t("readAll")}
              </button>

              {notificationsList.map((item) => (
                <div
                  key={item.id}
                  className={
                    "body-notifications__item item-body-notifications " +
                    (!item.is_read ? "new" : "")
                  }
                >
                  <div className="item-body-notifications__content">
                    <strong>{item.title}</strong>
                    <p className="item-body-notifications__text">
                      {item.content}
                    </p>
                  </div>
                  <button
                    className={item.is_read == 0 ? "" : "hidden"}
                    onClick={(_) => handleReadItem(item.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10.89 1.767a2.25 2.25 0 0 1 2.22 0l9.75 5.525A2.25 2.25 0 0 1 24 9.249v9.501A2.25 2.25 0 0 1 21.75 21H2.25A2.25 2.25 0 0 1 0 18.75v-9.5c0-.81.435-1.558 1.14-1.958Zm1.48 1.305a.75.75 0 0 0-.74 0l-9.316 5.28l7.41 4.233a3.75 3.75 0 0 1 4.553 0l7.41-4.234zM20.65 19.5l-7.26-5.704a2.25 2.25 0 0 0-2.78 0L3.35 19.5Zm1.85-9.886l-6.95 3.971l6.663 5.236q.135.107.21.26a.75.75 0 0 0 .077-.331ZM8.45 13.585L1.5 9.614v9.136q.002.18.076.33a.74.74 0 0 1 .21-.259Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </>
          ) : (
            <h3 className="item-body-notifications__text">
              {t("noNotifications")}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
