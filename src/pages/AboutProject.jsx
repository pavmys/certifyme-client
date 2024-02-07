import React from "react";
import "../styles/AboutProject.css";
import HeaderWithoutLogin from "../components/HeaderWIthoutLogin";

function AboutProject() {
  return (
    <div className="about-project-page">
      <HeaderWithoutLogin />

      <main className="about-project-content">
        <h2>ПРО ПРОЄКТ</h2>
        <p>
          Цей проєкт розроблено спеціально для студентів та викладачів як спосіб
          полегшити процедуру прийняття сертифікатів про визнання результатів у
          формальній та неформальній освіті.
        </p>
        <section className="about__steps">
          <div className="about__steps__circles">
            <div className="about__steps__circle">1</div>
            <div className="about__steps__circle">2</div>
            <div className="about__steps__circle">3</div>
            <div className="about__steps__circle">4</div>
          </div>
          <div className="about__steps__texts">
            <span>Завантаж свій сертифікат у свій профіль</span>
            <span>Вибери потрібний тобі предмет</span>
            <span>Створи заявку про зарахування сертифікату</span>
            <span>Згенеруй заяву про визнання результатів навчання</span>
          </div>
        </section>
        <p className="paragraph-2">
          Все дуже просто: ти завантажуєш свій сертифікат у профіль, обираєш
          потрібний курс, створюєш на нього заявку, у якій вказуєш свій
          сертифікат; викладач бачить твою заявку, і приймає її; у разі
          успішного прийняття тобі на сторінці курсу відобразиться можливість
          згенерувати заяву про визнання результатів навчання, яку ти разом із
          роздрукованим сертифікатом несеш у деканат. Далі по схемі викладача.
          Ось і все!!
        </p>
        <hr />
        <footer className="footer">
          <div className="footer__text">
            <span>(C). 2023 - 2024. Made by Pavlo Myskiv</span>
          </div>
          <div className="footer__socials">
            <a href="https://www.instagram.com/myskiv_p/">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/instagram-new.png"
                alt="instagram-new"
              />
            </a>
            <a href="https://www.facebook.com/pavlomyskiw">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/facebook-new.png"
                alt="facebook-new"
              />
            </a>
            <a href="https://www.linkedin.com/in/pavlo-m-b27983272/">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/linkedin.png"
                alt="linkedin"
              />
            </a>
            <a href="https://github.com/pavmys">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/office/48/github.png"
                alt="github"
              />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default AboutProject;
