import Hero from "@/Components/Hero/Hero";
import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <>
      <Hero />
      <section className="about">
        <div className="about__container">
          <div className="about__decor about__decor--01">
            <Image
              src="/decor/molecules-01.png"
              alt="Decor"
              width={1000}
              height={1000}
            />
          </div>
          <h2 className="about__title title">Про нас</h2>
          <div className="about__body">
            <div className="about__block">
              <p>
                <strong>Multi Plast</strong> - проект, створений групою
                українських компаній – виробників виробів із полімерів.
                Завданням проекту є створення єдиної інформаційної спільноти для
                всіх учасників полімерного ринку України. Ми хочемо надати
                кожному учаснику спільноти можливість:
              </p>
            </div>
            <div className="about__block">
              <ol>
                <li>
                  запропонувати свою продукцію та послуги всьому полімерному
                  ринку України;
                </li>
                <li>
                  отримувати допомогу професіоналів у вирішенні всіх питань, що
                  виникають;
                </li>
                <li>
                  здійснювати ефективну комунікацію та пошук нових ділових
                  партнерів;
                </li>
              </ol>
            </div>
            <div className="about__block">
              <p>Сьогодні Multi Plast включає:</p>
              <ol>
                <li>
                  Торговий майданчик, створений спеціально для продажу та
                  купівлі полімерної сировини, обладнання та сервісів. Ваші
                  оголошення одразу побачить велику кількість потенційних
                  замовників – учасників полімерного ринку України.
                </li>
                <li>
                  Галузевий форум із питань переробки полімерів. Обговоріть Ваші
                  завдання з професіоналами і поділіться знаннями з
                  фахівцями-початківцями – наш форум відкритий для всіх.
                </li>
                <li>
                  Зручний та простий дизайн. Ми використовуємо всі сучасні
                  технології, щоб робота з сайтом була зрозумілою та комфортною
                  для кожного.
                </li>
                <li>
                  Безліч нових ідей щодо розвитку проекту та команду
                  ентузіастів, що постійно працює над їх втіленням. Ми хочемо,
                  щоб ресурс був цікавий та корисний усім.
                </li>
              </ol>
              <p>
                Multi Plast не є комерційним проектом, тому всі перераховані
                сервіси – БЕЗКОШТОВНІ!
              </p>
            </div>
          </div>
          <div className="about__decor about__decor--02">
            <Image
              src="/decor/molecules-02.png"
              alt="Decor"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>
    </>
  );
}
