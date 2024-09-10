import React from "react";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="page page-registration">
      <div className="login">
        <div className="login__container">
          <div className="login__wrapper">
            <div className="login__body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
