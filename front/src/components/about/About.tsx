import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar, Typography } from '@material-ui/core';
import { Carousel } from 'antd';
import unmountCanvas from '../../hoc/unmomuntCanvas';
import useStyles from './style';
import vladimir from '../../assets/img/vladimir.jpg';
import sasha from '../../assets/img/sasha.jpg';
import artem from '../../assets/img/artem.jpg';
import git1 from '../../assets/img/git/git1.jpg';
import git2 from '../../assets/img/git/git2.jpg';
import git3 from '../../assets/img/git/git3.jpg';
import git4 from '../../assets/img/git/git4.jpg';
import git5 from '../../assets/img/git/git5.jpg';
import git6 from '../../assets/img/git/git6.jpg';
import git7 from '../../assets/img/git/git7.jpg';
import git8 from '../../assets/img/git/git8.jpg';
import git9 from '../../assets/img/git/git9.jpg';

const About: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <main>
      <div className="container-inner">
        <div className="score-content">
          <section className={classes.aboutSection}>
            <div className="main-title text-right">Наша команда</div>
            <Grid
              className={classes.gridMargin}
              container
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt="Remy Sharp"
                  src={vladimir}
                  className={classes.large}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography paragraph variant="h6" component="p">
                  Мажирин Владимир
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  На старте учебы я работал в сфере государственных закупок. В
                  процессе обучения принял предложение на должность ServiceNow
                  developer.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  Про RS School узнал на dou.ua. Прочитав много положительных
                  отзывов, решил записаться на курс. От данного курса я ожидал
                  повысить свой уровень знаний, наполнить резюме проектами и в
                  идеале, получить возможность пройти собеседование в ЕПАМ.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  Мой главный совет - если есть время, выполняйте таски наперед.
                  Не расслабляйтесь, не пропускайте лекции, принимайте активное
                  участие в обсуждениях и впитывайте любую полезную информацию.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              className={classes.gridMargin}
              container
              spacing={3}
              alignItems="center"
            >
              <Grid className="order-bot" item xs={12} sm={8}>
                <Typography paragraph variant="h6" component="p">
                  Кулев Александр
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  На данный момент работаю в компании по производству комплектов
                  расширения кузова для автомобилей. Пол года назад решил
                  сменить сферу деятельности. Записался на курс по совету друга.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  Курсы дают одну очень важную вещь, желание учиться и впитывать
                  как можно больше полезной информации. Сам подход через таски и
                  дедлайны считаю очень удачным! Тебе некогда расслабиться -
                  всегда в учёбе.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  На мой взгляд полученной информации из лекций недостаточно для
                  успешного прохождения курса. В большинстве случаев приходилось
                  черпать знания из других источников.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  В рамках курса есть отдельное сообщество которое сильно
                  помогает решать те или иные проблемы и трудности и которое
                  помогло завести друзей единомышленников. Понравилась система
                  проверки работ cross-check, исходя из того, что она не
                  идеальна я считаю её реализацию довольно успешной.
                </Typography>
              </Grid>
              <Grid className="order-top" item xs={12} sm={4}>
                <Avatar
                  alt="Remy Sharp"
                  src={sasha}
                  className={classes.large}
                />
              </Grid>
            </Grid>
            <Grid
              className={classes.gridMargin}
              container
              spacing={3}
              alignItems="center"
            >
              <Grid item xs={12} sm={4}>
                <Avatar
                  alt="Remy Sharp"
                  src={artem}
                  className={classes.large}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
                <Typography paragraph variant="h6" component="p">
                  Цыбулько Артем
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  В школу пришел по рекомендации друга, который ранее заканчивал
                  RS School и успешно устроился на работу в EPAM. На данный
                  момент заинтересован в смене своего рода деятельности, поэтому
                  предложение друга показалось заманчивым.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  К моменту начала курсов уже обладал базовыми знаниями web
                  разработки, которые немного упростили мой процесс обучения.
                  Все задания старался выполнять на максимальный бал, а в
                  случаях возникновения сложностей – заполнять свои пробелы в
                  знаниях. В свободное от заданий время старался помогать и
                  другим студентам, за что неоднократно получал благодарности, а
                  в будущем был повышен до активиста школы.
                </Typography>
                <Typography paragraph variant="body1" component="p">
                  С уверенностью могу сказать, что все мои старания были не
                  напрасны, большинство заданий выполнены на максимальный балл,
                  а за время их выполнения получена наивысшая для меня награда –
                  знания. Невероятно, но факт, сегодня можно получить
                  качественные знания абсолютно бесплатно и за это спасибо RS
                  School!
                </Typography>
              </Grid>
            </Grid>
          </section>
          <section className={classes.aboutSection}>
            <div className="main-title text-left">Описание проекта</div>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Нашей командной было реализовано приложение - Ball bouncer. Это
              аналог старой доброй игры Arkanoid. Основную часть игры мы решили
              реализовать при помощи Canvas, интерфейс - при помощи React, а
              также BackEnd с использованием Node JS и Mongo DB.
            </Typography>
            <Typography paragraph variant="h5" component="p">
              BackEnd
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Для написания BackEnd мы выбрали NodeJS в связке с фреймворком
              Express.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              При выборе базы данных мы остановились на mongoDB - это
              нереляционная база данных для удобства работы с которой мы
              использовали в проекте библиотеку Mongoose.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В проекте реализована регистрация пользователей по email и с
              помощью социальных сетей (google, facebook, github).
            </Typography>

            <Typography paragraph variant="h6" component="p">
              Регистрация по e-mail:
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>Получаем почту и пароль от фронта;</li>
                <li>Валидируем полученные данные при помощи библиотеки Joi;</li>
                <li>Хэшируем пароль при помощи Bcryptjs;</li>
                <li>
                  Отправляем пользователю письмо со ссылкой на верификацию
                  e-mail (Реализована возможность повторной отправки письма,
                  если юзер не получил его с первого раза);
                </li>
                <li>
                  После верификации возвращаем фронту токен, что можно получить
                  доступ к защищенным маршрутам. Например для получения данных
                  аккаунта;
                </li>
                <li>
                  Если пароль утрачен, реализована возможность его восстановить.
                </li>
              </ul>
            </Typography>
            <Typography paragraph variant="h6" component="p">
              Регистрация через социальные сети (google, facebook, github):
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>
                  Получаем от фронта ссылку по которой отправляем юзера на один
                  из вышеуказанных сайтов (google, facebook или github);
                </li>
                <li>
                  Пользователь разрешает нашему приложению доступ и
                  автоматически переадресовывается на сайт с приложением;
                </li>
                <li>Происходит автоматический логин.</li>
              </ul>
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Также в проекте реализована защита маршрутов при помощи библиотеки
              jsonwebtoken.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Пользователь может изменить свой аватар в разделе Settings. Аватар
              хранится в базе данных в виде Base64 строки.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Реализован RESTful API.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Реализован CRUD для сохранений игры. Все сохранения привязаны к ID
              пользователя. У пользователя есть доступ только к своим
              сохранениям.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В приложении реализовано хранение статистики набранных очков. Как
              полученных за всю игру так и за каждый уровень. В разделе Score
              отображается статистика всех пользователей, в Settings текущего
              пользователя.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Сервер отдаёт HTTP ошибки с правильными body, по которым можно
              понять, что именно произошло, а также пишет читаемые логи.
            </Typography>
            <Typography paragraph variant="h5" component="p">
              FrontEnd
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Управление состоянием приложения осуществляется через Redux.
              Взаимодействие с серверным API, при выполнении асинхронных
              действий, реализовано с помощью Redux-Thunk.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              С помощью react-router-dom реализован роутинг (переход по
              страницам осуществляется без ее перезагрузки), а также редирект
              для случаев, когда пользователь вводит неправильный адрес, либо
              будучи не авторизованным пытается получить доступ к функциям,
              которые отображаются только для авторизованных пользователей.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Для удобства разработки и уменьшения количества дублирования кода
              используются Higher-Order Components.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В формах логина и регистрации реализована валидация электронной
              почты и пароля, а также обработка и отображение ошибок входа, либо
              регистрации.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Для удобства управления игрой реализовано 5 горячих клавиш:
              сохранить игру, загрузить игру, поставить на паузу, выключить звук
              и начать новую игру.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Дизайн приложения разработан с использованием Material-UI и
              Ant-Design компонент.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В приложении используются модальные окна: форма авторизации,
              игровые уведомления и меню сохранений. Для анимации плавных
              появлений и закрытий окон используется React-transition-group.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В приложении реализовано несколько типов анимации: SVG анимация
              (прелоадеры и основной фон), а также CSS анимация с использованием
              ключевых кадров (кнопка начать игру).
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В таблицах результатов игры и списка сохраненных игр реализована
              пагинации.
            </Typography>
            <Typography paragraph variant="h5" component="p">
              Game / Canvas
            </Typography>
            <Typography paragraph variant="h6" component="p">
              Основной функционал:
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>Столкновение мяча с различными поверхностями;</li>
                <li>Запуск мяча с платформы в случайном направлении;</li>
                <li>Увеличение скорости мяча при отскоке от углов;</li>
                <li>Управление платформой как мышкой так и с клавиатуры.</li>
              </ul>
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Также реализовано выпадение случайного бонуса при ударе мяча о
              блок, который изменяет размер платформы или скорость мяча.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Добавлены звуки при следующих действиях: столкновении мяча с
              поверхностями, победе, поражении, потере жизни.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              У блоков реализовано разное количество жизней.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Реализовано 10 уровней с разным фоном, цветом блоков и их
              расположением.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Все элементы за исключение бонусов отрисовываются средствами
              Canvas.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Реализован подсчет и отображение набранных очков, за текущий
              уровень и за все уровни. Общий скор обновляется при прохождении
              уровня или проигрыше (необходима авторизация).
            </Typography>
          </section>
          <section className={classes.aboutSection}>
            <div className="main-title text-right">
              Организация командной работы
            </div>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              На первоначальном этапе создания приложения, наша команда
              разделилась на 3 направления. BackEnd, FrontEnd и Canvas. Весь
              процесс разработки приложения отражён на GitHub.
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Для организации командной работы был использован ряд удобных
              инструментов таких как:
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>Trello Board</li>
                <li>GitHub</li>
                <li>Telegram</li>
                <li>Discord</li>
                <li>Postman</li>
                <li>Swagger </li>
              </ul>
            </Typography>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              В связи с тем, что каждый разработчик в нашей команде занимался
              своим участком, в процессе разработки приложения у нас не
              возникало спорных моментов и сложностей в организации работы. Если
              у кого то из членов команды возникал спорный вопрос, как правило
              мы в тот же день организовывали митинг и решали поставленную
              задачу.
            </Typography>
          </section>
          <section className={classes.aboutSection}>
            <div className="main-title text-left">Архитектура проекта</div>
            <Typography paragraph variant="h6" component="p">
              BackEnd
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>
                  Node JS с использованием фреймворка Express. Express крайне
                  удобный инструмент для работы, понятный и довольно простой;
                </li>
                <li>
                  mongoDB - нереляционная база для хранения данных. При помощи
                  библиотеки Mongoose с ней стало работать куда удобнее, т.к.
                  Mongoose предоставляет огромный набор функциональных
                  возможностей для создания и работы со схемами;
                </li>
                <li>
                  Joi - очень мощный инструмент для валидации полученных данных;
                </li>
                <li>Bcryptjs - инструмент для хэширования паролей;</li>
                <li>
                  passport-facebook / passport-github2 / passport-google-oauth20
                  - библиотеки для аутентификации в соц. сетях. Недостатки -
                  очень поверхностная документация;
                </li>
                <li>jsonwebtoken - инструмент для защиты маршрутов.</li>
              </ul>
            </Typography>
            <Typography paragraph variant="h6" component="p">
              FrontEnd
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>
                  React - достаточно легок в изучении и обладает простым и
                  понятным синтаксисом, а установка пакета react-create-app
                  позволяет приступить к разработке не тратя время на настройку
                  webpack и других вспомогательных пакетов;
                </li>
                <li>
                  Redux - управление состоянием приложения, эта технология
                  обладает множеством плюсов, из которых: легкий общий доступ к
                  состоянию, изоляция управления состоянием, отладка с помощью
                  путешествия во времени. Из минусов – необходимость написания
                  большого объема кода для создания reducers, action creators,
                  actions;
                </li>
                <li>
                  Redux Thunk - выполнение асинхронных действий. Данная
                  middleware позволяет диспатчить несколько экшенов подряд, что
                  очень удобно в работе с API;
                </li>
                <li>
                  Material UI и Ant-Design - отличные библиотеки для создания
                  модальных окон, таблиц с данными, форм и кнопок. Использование
                  данных библиотек значительно сокращает время на разработку
                  указанных элементов дизайна. Также отличительной особенностью
                  Material UI является то, что элементы этой библиотеки имеют
                  поддержку TypeScript;
                </li>
                <li>React-router-dom - реализация роутинга и редиректов;</li>
                <li>
                  React-transition-group - инструмент для анимации плавных
                  появлений и закрытий окон;
                </li>
                <li>
                  Canvas - основной инструмент для реализации игрового
                  функционала.
                </li>
              </ul>
            </Typography>
            <Typography paragraph variant="h6" component="p">
              Общие инструменты / библиотеки / фреймворки:
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>
                  TypeScript - один из самых важных инструментов при создании
                  приложения. На начальном этапе создания приложения, могло
                  показаться, что этот инструмент избыточен, но со временем мы
                  поняли как сильно он помогает в процессе разработки,
                  предотвращает появление ошибок и улучшает качество кода;
                </li>
                <li>
                  Eslint (air-bnb config) - отличный инструмент который приводит
                  код к более-менее единому стилю и помогает избежать глупых
                  ошибок;
                </li>
                <li>
                  Prettier - инструмент который позволяет не думать о
                  форматировании, а сосредоточиться на структуре и логике своего
                  кода.
                </li>
              </ul>
            </Typography>
            <Typography paragraph variant="h6" component="p">
              Самые сложные решенные технические проблемы
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ul>
                <li>
                  Верификация e-mail - была решена при помощи библиотеки
                  nodemailer которая отправляет пользователю письмо с
                  инструкциями;
                </li>
                <li>
                  Защита роутов - была решена при помощи библиотек jsonwebtoken
                  и passport js. Как и было описано выше у библиотеки passport
                  js не самая удачная документация это вызвало определенные
                  трудности на пути решения проблемы;
                </li>
                <li>
                  Реализация сохранений и загрузки игры - была решена при помощи
                  слаженных действий команды.
                </li>
              </ul>
            </Typography>
          </section>
          <section className={classes.aboutSection}>
            <div className="main-title text-right">Ход разработки</div>
            <Typography
              className={classes.textLeftPadding}
              paragraph
              variant="body1"
              component="p"
            >
              Как уже было сказано ранее. Наша команда одновременно вела работу
              в трех направлениях, ниже приведен вклад каждого участника команды
              в разработку приложения:
            </Typography>
            <Typography paragraph variant="body1" component="p">
              <ol>
                <li>
                  BackEnd. Ответственный:{' '}
                  <a
                    href="https://github.com/vladimirm85"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Мажирин Владимир
                  </a>
                </li>
                <li>
                  FrontEnd. Ответственный:{' '}
                  <a
                    href="https://github.com/inspector-code"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Цыбулько Артем
                  </a>
                </li>
                <li>
                  Canvas. Ответственный:{' '}
                  <a
                    href="https://github.com/onc157"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Кулев Александр
                  </a>
                </li>
              </ol>
            </Typography>
            <Typography paragraph variant="h6" component="p">
              Скриншоты с историей коммитов
            </Typography>
            <Carousel autoplay>
              <div>
                <img src={git1} alt="git_img" />
              </div>
              <div>
                <img src={git2} alt="git_img" />
              </div>
              <div>
                <img src={git3} alt="git_img" />
              </div>
              <div>
                <img src={git4} alt="git_img" />
              </div>
              <div>
                <img src={git5} alt="git_img" />
              </div>
              <div>
                <img src={git6} alt="git_img" />
              </div>
              <div>
                <img src={git7} alt="git_img" />
              </div>
              <div>
                <img src={git8} alt="git_img" />
              </div>
              <div>
                <img src={git9} alt="git_img" />
              </div>
            </Carousel>
          </section>
        </div>
      </div>
    </main>
  );
};

const AboutW = unmountCanvas(About);

export default AboutW;
