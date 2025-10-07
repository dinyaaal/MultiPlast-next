"use client";

import React, { useState } from "react";

interface INotificationsCountProps {
  nCount?: number;
}

export const NotificationsCount: React.FC<INotificationsCountProps> = ({
  nCount = 0,
}) => {
  const [notificationsCount, setNotificationsCount] = useState(nCount);

  return (
    <>
      {!!notificationsCount && (
        <div className="notification-value">
          <span className="notification-value__number">
            {notificationsCount}
          </span>
        </div>
      )}
    </>
  );
};
