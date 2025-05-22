"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useClickOutside } from "@/hooks/ClickOutside";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

const notificationsFake = [
  {
    id: 51,
    title: "1234567890",
    content: " Asf sdfsdf jasdf ;lsdfjsdflsj fl;asfj lsdfj dklsfjlsdf jdsfsdaf",
    to_user_id: 14,
    is_read: 0,
    type: 3,
    read_at: null,
    root_id: null,
    created_at: "2025-05-22T05:43:06.000000Z",
    updated_at: "2025-05-22T05:43:06.000000Z",
    should_be_shown_in: "2025-05-22 05:42:40",
  },
  {
    id: 52,
    title: "1234567890",
    content: " Asf sdfsdf jasdf ;lsdfjsdflsj fl;asfj lsdfj dklsfjlsdf jdsfsdaf",
    to_user_id: 14,
    is_read: 0,
    type: 3,
    read_at: null,
    root_id: null,
    created_at: "2025-05-22T05:43:06.000000Z",
    updated_at: "2025-05-22T05:43:06.000000Z",
    should_be_shown_in: "2025-05-22 05:42:40",
  },
  {
    id: 53,
    title: "1234567890321",
    content: " Asf sdfsdf jasdf ;lsdfjsdflsj fl;asfj lsdfj dklsfjlsdf jdsfsdaf",
    to_user_id: 14,
    is_read: 1,
    type: 3,
    read_at: null,
    root_id: null,
    created_at: "2025-05-22T05:43:06.000000Z",
    updated_at: "2025-05-22T05:43:06.000000Z",
    should_be_shown_in: "2025-05-22 05:42:40",
  },
];

export default function Notifications() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [notificationsList, setNotificationsList] = useState(notificationsFake);

  const { rootEl } = useClickOutside(setIsOpen);
  const { data: session, status } = useSession();

  const handleReadItem = async (id: number) => {
    const newList = notificationsList.map((item) =>
      item.id == id ? { ...item, is_read: 1 } : item
    );
    setNotificationsList(newList);

    // TODO запрос для удаление из прочитанного
    // const res = await fetch(
    //   `https://multiplast.web-hub.online/api/notifications/read/${id}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${session?.user.access_token}`,
    //     },
    //   }
    // );
  };

  const handleRead = async () => {
    const allReadNotifications = notificationsList.map((item) => ({
      ...item,
      is_read: 1,
    }));
    setNotificationsList(allReadNotifications);

    toast.success("Все уведомления успешно прочитаны");

    // TODO запрос для удаление из прочитанного
    // const res = await fetch(
    //   "https://multiplast.web-hub.online/api/notifications/read-all",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${session?.user.access_token}`,
    //     },
    //   }
    // );
  };

  async function getNotifications() {
    // TODO запрос на получение всех уведомлений
    // const res = await fetch(
    //   "https://multiplast.web-hub.online/api/notifications",
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${session?.user.access_token}`,
    //     },
    //   }
    // );
  }

  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    setNotificationsCount(
      notificationsList.filter((item) => item.is_read == 0).length
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
          <button
            disabled={!notificationsCount}
            onClick={handleRead}
            className="login-user__link link-login-user login-user__log-in"
          >
            Прочитать все
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
                <p className="item-body-notifications__text">{item.content}</p>
              </div>
                <button className={item.is_read == 0 ? "" : "hidden"} onClick={(_) => handleReadItem(item.id)}>
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
              {/* <a href="#" className="item-body-notifications__more">
                <span>Детальніше</span>
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.5303 6.53033C19.8232 6.23744 19.8232 5.76256 19.5303 5.46967L14.7574 0.696699C14.4645 0.403806 13.9896 0.403806 13.6967 0.696699C13.4038 0.989593 13.4038 1.46447 13.6967 1.75736L17.9393 6L13.6967 10.2426C13.4038 10.5355 13.4038 11.0104 13.6967 11.3033C13.9896 11.5962 14.4645 11.5962 14.7574 11.3033L19.5303 6.53033ZM0 6.75H19V5.25H0V6.75Z"
                    fill="#1858B8"
                  />
                </svg>
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
