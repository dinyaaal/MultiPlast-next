import { Link } from "@/i18n/routing";
import ModalContact from "../Modals/ModalContact";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  const session = await getServerSession();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__body">
          <div className="footer__block">
            <Link href="/" className="footer__logo logo">
              Л<span>ого</span>
            </Link>
            <div className="footer__socials socials">
              <p className="socials__text">{t("socialsText")}</p>

              <div className="socials__items">
                <Link href="#" className="socials__item">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_598_18032)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 17.5977C0 26.2996 6.31896 33.5329 14.5833 35V22.3606H10.2083V17.5H14.5833V13.6106C14.5833 9.23563 17.4023 6.80604 21.3894 6.80604C22.6523 6.80604 24.0144 7 25.2773 7.19396V11.6667H23.0417C20.9023 11.6667 20.4167 12.7356 20.4167 14.0977V17.5H25.0833L24.306 22.3606H20.4167V35C28.681 33.5329 35 26.2996 35 17.5977C35 7.91875 27.125 0 17.5 0C7.875 0 0 7.91875 0 17.5977Z"
                        fill="#0E274D"
                      />
                    </g>
                  </svg>
                </Link>
                <Link href="#" className="socials__item">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="17.5" cy="17.5" r="17" stroke="#0E274D" />
                    <path
                      d="M28.5408 12.3432C28.4156 11.8894 28.1701 11.4756 27.8288 11.1432C27.4875 10.8108 27.0625 10.5714 26.5962 10.449C24.8799 10 18 10 18 10C18 10 11.1201 10 9.40379 10.4467C8.93733 10.5687 8.51207 10.8079 8.17073 11.1404C7.82939 11.4729 7.58398 11.8868 7.45915 12.3408C7 14.0127 7 17.5 7 17.5C7 17.5 7 20.9873 7.45915 22.6568C7.71205 23.5788 8.45848 24.3049 9.40379 24.551C11.1201 25 18 25 18 25C18 25 24.8799 25 26.5962 24.551C27.544 24.3049 28.2879 23.5788 28.5408 22.6568C29 20.9873 29 17.5 29 17.5C29 17.5 29 14.0127 28.5408 12.3432ZM15.8147 20.7006V14.2994L21.5112 17.4761L15.8147 20.7006Z"
                      fill="#0E274D"
                    />
                  </svg>
                </Link>
                <Link href="#" className="socials__item">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="17.5" cy="17.5" r="17" stroke="#0E274D" />
                    <path
                      d="M22.9622 9H25.877L19.5106 16.2005L27 26H21.1373L16.5422 20.0582L11.2905 26H8.37158L15.1797 18.2969L8 9H14.0113L18.1606 14.431L22.9622 9ZM21.9383 24.2755H23.5526L13.1319 10.6346H11.3979L21.9383 24.2755Z"
                      fill="#0E274D"
                    />
                  </svg>
                </Link>
                <Link href="#" className="socials__item">
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.1308 7C20.3682 7.0033 20.9963 7.0099 21.5386 7.0253L21.752 7.033C21.9984 7.0418 22.2415 7.0528 22.5351 7.066C23.7055 7.121 24.504 7.30579 25.2047 7.57749C25.9307 7.85688 26.5422 8.23527 27.1538 8.84576C27.7131 9.39563 28.1459 10.0608 28.422 10.7949C28.6937 11.4956 28.8785 12.2942 28.9335 13.4656C28.9467 13.7582 28.9577 14.0013 28.9665 14.2488L28.9731 14.4622C28.9896 15.0034 28.9962 15.6315 28.9984 16.869L28.9995 17.6896V19.1305C29.0022 19.9328 28.9938 20.7352 28.9742 21.5373L28.9676 21.7507C28.9588 21.9981 28.9478 22.2412 28.9346 22.5338C28.8796 23.7053 28.6926 24.5028 28.422 25.2046C28.1467 25.9391 27.7138 26.6044 27.1538 27.1537C26.6038 27.7129 25.9387 28.1456 25.2047 28.422C24.504 28.6937 23.7055 28.8785 22.5351 28.9335C22.2741 28.9458 22.0131 28.9568 21.752 28.9665L21.5386 28.9731C20.9963 28.9885 20.3682 28.9962 19.1308 28.9984L18.3103 28.9995H16.8704C16.0678 29.0023 15.2651 28.9938 14.4627 28.9742L14.2493 28.9676C13.9881 28.9577 13.7271 28.9463 13.4661 28.9335C12.2958 28.8785 11.4972 28.6937 10.7954 28.422C10.0614 28.1463 9.39655 27.7134 8.84744 27.1537C8.28762 26.6041 7.85444 25.9389 7.57811 25.2046C7.30642 24.5039 7.12163 23.7053 7.06663 22.5338C7.05438 22.2728 7.04338 22.0118 7.03363 21.7507L7.02813 21.5373C7.00786 20.7352 6.9987 19.9329 7.00063 19.1305V16.869C6.99756 16.0666 7.00563 15.2643 7.02483 14.4622L7.03253 14.2488C7.04133 14.0013 7.05233 13.7582 7.06553 13.4656C7.12053 12.2942 7.30532 11.4967 7.57701 10.7949C7.85322 10.06 8.28726 9.39467 8.84854 8.84576C9.39751 8.28639 10.0619 7.85357 10.7954 7.57749C11.4972 7.30579 12.2947 7.121 13.4661 7.066C13.7587 7.0528 14.0029 7.0418 14.2493 7.033L14.4627 7.0264C15.2647 7.00686 16.067 6.99842 16.8693 7.0011L19.1308 7ZM18.0001 12.4999C16.5415 12.4999 15.1426 13.0793 14.1112 14.1107C13.0798 15.1422 12.5004 16.5411 12.5004 17.9997C12.5004 19.4584 13.0798 20.8573 14.1112 21.8887C15.1426 22.9202 16.5415 23.4996 18.0001 23.4996C19.4587 23.4996 20.8576 22.9202 21.889 21.8887C22.9204 20.8573 23.4998 19.4584 23.4998 17.9997C23.4998 16.5411 22.9204 15.1422 21.889 14.1107C20.8576 13.0793 19.4587 12.4999 18.0001 12.4999ZM18.0001 14.6998C18.4334 14.6997 18.8625 14.785 19.2629 14.9508C19.6633 15.1166 20.0271 15.3596 20.3336 15.666C20.64 15.9723 20.8832 16.3361 21.0491 16.7364C21.215 17.1367 21.3004 17.5658 21.3005 17.9992C21.3005 18.4325 21.2152 18.8617 21.0495 19.2621C20.8837 19.6625 20.6407 20.0263 20.3343 20.3328C20.028 20.6392 19.6642 20.8824 19.2639 21.0483C18.8636 21.2142 18.4345 21.2996 18.0012 21.2997C17.126 21.2997 16.2867 20.952 15.6678 20.3331C15.049 19.7143 14.7013 18.8749 14.7013 17.9997C14.7013 17.1245 15.049 16.2852 15.6678 15.6663C16.2867 15.0475 17.126 14.6998 18.0012 14.6998M23.7759 10.8499C23.4112 10.8499 23.0615 10.9948 22.8037 11.2526C22.5458 11.5105 22.4009 11.8602 22.4009 12.2249C22.4009 12.5895 22.5458 12.9393 22.8037 13.1971C23.0615 13.455 23.4112 13.5998 23.7759 13.5998C24.1405 13.5998 24.4902 13.455 24.7481 13.1971C25.0059 12.9393 25.1508 12.5895 25.1508 12.2249C25.1508 11.8602 25.0059 11.5105 24.7481 11.2526C24.4902 10.9948 24.1405 10.8499 23.7759 10.8499Z"
                      fill="#0E274D"
                    />
                    <circle cx="17.5" cy="17.5" r="17" stroke="#0E274D" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="footer__menu menu-footer">
            <div className="menu-footer__title">{t("informationPages")}</div>
            <ul className="menu-footer__items">
              <li className="menu-footer__item">
                <Link href="/about">{t("aboutProject")}</Link>
              </li>
              <li className="menu-footer__item">
                <Link href="#">{t("userAgreement")}</Link>
              </li>

              <li className="menu-footer__item">
                <Link href="#">{t("howToSellBuy")}</Link>
              </li>
              <li className="menu-footer__item">
                <Link href="#">{t("privacyPolicy")}</Link>
              </li>
            </ul>
          </div>
          <div className="footer__menu menu-footer">
            <div className="menu-footer__title">{t("forClients")}</div>
            <ul className="menu-footer__items">
              <li className="menu-footer__item">
                <Link href="/">{t("home")}</Link>
              </li>
              <li className="menu-footer__item">
                <Link href="/forum">{t("forum")}</Link>
              </li>
              <li className="menu-footer__item">
                <Link href="/products">{t("marketplace")}</Link>
              </li>
              {session && (
                <>
                  <li className="menu-footer__item">
                    <Link href="/messages">{t("myMessages")}</Link>
                  </li>
                  <li className="menu-footer__item">
                    <Link href="/dashboard/add-advertisement">
                      {t("postAd")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="footer__support support-footer">
            <div className="support-footer__title">{t("techSupport")}</div>
            <p className="support-footer__text">{t("contactSupportText")}</p>
            <ModalContact />
          </div>
        </div>
        <div className="footer__copy">{t("copyright")}</div>
      </div>
    </footer>
  );
}
