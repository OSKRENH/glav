"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const projects = [
  {
    slug: "shagal",
    name: "Шагал",
    label: "Бизнес-квартал у реки",
    district: "Даниловский район",
    metro: "Технопарк · 11 мин",
    price: 17.4,
    priceLabel: "от 17,4 млн ₽",
    delivery: "Сдано и IV кв. 2026",
    image: "/images/shagal.webp",
    rooms: ["studio", "1", "2", "3", "4"],
  },
  {
    slug: "voxhall",
    name: "Воксхолл",
    label: "Квартиры на Садовом",
    district: "Замоскворечье",
    metro: "Павелецкая · 5 мин",
    price: 23.2,
    priceLabel: "от 23,2 млн ₽",
    delivery: "Сдан",
    image: "/images/voxhall.webp",
    rooms: ["studio", "1", "2", "3"],
  },
  {
    slug: "nagatino",
    name: "Нагатино Ай-Лэнд",
    label: "Квартиры с видом на Москву-реку",
    district: "Нагатино",
    metro: "Технопарк · 8 мин",
    price: 17.0,
    priceLabel: "от 17 млн ₽",
    delivery: "Сдано и 2027",
    image: "/images/nagatino.webp",
    rooms: ["studio", "1", "2", "3", "4"],
  },
];

const roomLabels: Record<string, string> = {
  all: "Любая",
  studio: "Студия",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4+",
};

function Header({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-header ${light ? "site-header--light" : ""}`}>
      <Link href="/" className="brand-link" aria-label="Эталон — на главную">
        <Image src="/brand/etalon.svg" alt="Эталон" width={140} height={24} priority />
      </Link>
      <nav className="desktop-nav" aria-label="Главная навигация">
        <a href="#projects">Проекты</a>
        <a href="#buy">Как купить</a>
        <a href="#company">О компании</a>
      </nav>
      <div className="header-actions">
        <a className="header-phone" href="tel:+74953854663">+7 495 385-46-63</a>
        <button className="city-button" type="button" aria-label="Выбранный город: Москва">
          Москва <ArrowDown size={14} />
        </button>
        <button className="menu-button" type="button" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          <a href="#projects" onClick={() => setOpen(false)}>Проекты</a>
          <a href="#buy" onClick={() => setOpen(false)}>Как купить</a>
          <a href="#company" onClick={() => setOpen(false)}>О компании</a>
          <a href="tel:+74953854663">+7 495 385-46-63</a>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Image src="/brand/group-etalon.svg" alt="Группа Эталон" width={178} height={48} />
        <p>Создаём городскую среду для жизни, работы и будущего.</p>
        <a className="footer-phone" href="tel:+74953854663">+7 495 385-46-63</a>
      </div>
      <div className="footer-grid">
        <div><span>Недвижимость</span><a href="#projects">Все проекты</a><a href="#projects">Квартиры</a><a href="#projects">Машиноместа</a></div>
        <div><span>Покупателям</span><a href="#buy">Ипотека</a><a href="#buy">Рассрочка</a><a href="#buy">Трейд-ин</a></div>
        <div><span>Компания</span><a href="#company">О группе</a><a href="#company">Новости</a><a href="#company">Контакты</a></div>
        <div className="footer-contact"><span>Напишите нам</span><a href="mailto:info@etalongroup.com">info@etalongroup.com</a><a href="#callback">Заказать звонок</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Группа «Эталон»</span><span>Информация на сайте не является публичной офертой</span><a href="#privacy">Политика конфиденциальности</a></div>
    </footer>
  );
}

function Finder({ compact = false }: { compact?: boolean }) {
  const [room, setRoom] = useState("all");
  const [budget, setBudget] = useState([35]);
  const matches = useMemo(
    () => projects.filter((project) => project.price <= budget[0] && (room === "all" || project.rooms.includes(room))),
    [budget, room],
  );
  return (
    <div className={`finder ${compact ? "finder--compact" : ""}`}>
      <div className="finder-heading">
        <div><SlidersHorizontal size={18} /><span>Подобрать квартиру</span></div>
        <strong>{matches.length ? `${matches.length} проекта` : "Расширьте параметры"}</strong>
      </div>
      <div className="finder-controls">
        <div className="finder-field finder-field--rooms">
          <span>Комнаты</span>
          <ToggleGroup type="single" value={room} onValueChange={(value) => value && setRoom(value)} aria-label="Количество комнат" className="room-toggle">
            {Object.entries(roomLabels).map(([value, label]) => (
              <ToggleGroupItem key={value} value={value} aria-label={label}>{label}</ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="finder-field finder-field--budget">
          <div className="range-label"><span>Бюджет до</span><strong>{budget[0]} млн ₽</strong></div>
          <Slider min={15} max={80} step={1} value={budget} onValueChange={setBudget} aria-label="Максимальный бюджет" />
        </div>
        <Button asChild className="finder-submit"><a href="#projects">Смотреть варианты <ArrowRight /></a></Button>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [liked, setLiked] = useState(false);
  const href = project.slug === "shagal" ? "/projects/shagal" : "#callback";
  return (
    <article className={`project-card project-card--${index + 1}`}>
      <Link href={href} className="project-image-link" aria-label={`Открыть проект ${project.name}`}>
        <Image src={project.image} alt={`Архитектура проекта ${project.name}`} fill sizes="(max-width: 760px) 94vw, 50vw" />
      </Link>
      <button type="button" className={`favorite-button ${liked ? "is-liked" : ""}`} onClick={() => setLiked((value) => !value)} aria-label={liked ? `Убрать ${project.name} из избранного` : `Добавить ${project.name} в избранное`}>
        <Heart fill={liked ? "currentColor" : "none"} />
      </button>
      <div className="project-card-copy">
        <div className="project-card-title"><div><p>{project.label}</p><h3>{project.name}</h3></div><Link href={href} aria-label={`Подробнее о ${project.name}`}><MoveUpRight /></Link></div>
        <div className="project-card-meta"><span><MapPin />{project.metro}</span><span><Clock3 />{project.delivery}</span></div>
        <div className="project-card-price"><strong>{project.priceLabel}</strong><span>{project.district}</span></div>
      </div>
    </article>
  );
}

export function HomeExperience() {
  return (
    <main>
      <section className="home-hero">
        <Header light />
        <Image className="home-hero-image" src="/images/shagal.webp" alt="Жилой квартал Шагал" fill priority sizes="100vw" />
        <div className="home-hero-shade" />
        <div className="home-hero-copy">
          <p className="eyebrow">Группа «Эталон» · с 1987 года</p>
          <h1>Города,<br />в которых<br /><em>хочется жить.</em></h1>
          <Link href="/projects/shagal" className="hero-project-link"><span><b>Шагал</b>Бизнес-квартал у реки</span><ArrowRight /></Link>
        </div>
        <div className="hero-finder"><Finder /></div>
      </section>

      <section className="proof-strip" aria-label="Эталон в цифрах">
        <div><strong>39 лет</strong><span>строим для людей</span></div>
        <div><strong>9,8 млн м²</strong><span>введено в эксплуатацию</span></div>
        <div><strong>380 000</strong><span>жителей в наших домах</span></div>
        <div><strong>8 регионов</strong><span>география проектов</span></div>
      </section>

      <section className="projects-section" id="projects">
        <div className="section-heading">
          <div><p className="eyebrow eyebrow--blue">Проекты в Москве</p><h2>Выбирайте не квартиру.<br />Выбирайте образ жизни.</h2></div>
          <p>Собрали главное на карточке: локацию, срок, стоимость и формат жизни. Без лишних переходов и скрытых цен.</p>
        </div>
        <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
        <div className="all-projects-link"><a href="#projects">Все 24 проекта <ArrowRight /></a></div>
      </section>

      <section className="buy-section" id="buy">
        <div className="buy-intro"><p className="eyebrow">Способы покупки</p><h2>Понятный путь<br />к своему дому.</h2><p>Сравните условия и выберите сценарий без визита в офис. Менеджер поможет только там, где это действительно нужно.</p></div>
        <div className="buy-cards">
          <a href="#callback"><span>01</span><div><h3>Ипотека</h3><p>Рассчитайте платёж и получите персональные предложения банков.</p></div><ArrowRight /></a>
          <a href="#callback"><span>02</span><div><h3>Рассрочка</h3><p>Гибкий график платежей на выбранные квартиры.</p></div><ArrowRight /></a>
          <a href="#callback"><span>03</span><div><h3>Обмен</h3><p>Зачтём стоимость вашей квартиры при покупке новой.</p></div><ArrowRight /></a>
        </div>
      </section>

      <section className="company-section" id="company">
        <div className="company-statement"><Image src="/brand/symbol-etalon.svg" alt="" width={74} height={78} /><h2>Мы не просто строим дома. Мы соединяем архитектуру, сервисы и город в цельную среду.</h2></div>
        <div className="company-grid">
          <article className="company-card company-card--blue"><span>01</span><h3>Полный цикл</h3><p>От идеи и проектирования до управления готовым домом.</p></article>
          <article className="company-card"><span>02</span><h3>Прозрачность</h3><p>Документы, камеры и ход строительства всегда под рукой.</p></article>
          <article className="company-card"><span>03</span><h3>Городская среда</h3><p>Школы, парки, сервисы и рабочие места рядом с домом.</p></article>
        </div>
      </section>

      <section className="callback-section" id="callback">
        <div><p className="eyebrow">Личная консультация</p><h2>Найдём квартиру<br />под ваш сценарий.</h2></div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label><span>Имя</span><input type="text" placeholder="Как к вам обращаться" /></label>
          <label><span>Телефон</span><input type="tel" placeholder="+7 999 000-00-00" /></label>
          <Button type="submit">Перезвоните мне <ArrowRight /></Button>
          <small>Нажимая кнопку, вы соглашаетесь с политикой обработки данных.</small>
        </form>
      </section>
      <Footer />
    </main>
  );
}

const flats = [
  { rooms: "studio", title: "Студии", area: "от 23 м²", price: "от 17,4 млн ₽", count: 34 },
  { rooms: "1", title: "1-комнатные", area: "от 35,9 м²", price: "от 24,8 млн ₽", count: 86 },
  { rooms: "2", title: "2-комнатные", area: "от 48,7 м²", price: "от 26,5 млн ₽", count: 112 },
  { rooms: "3", title: "3-комнатные", area: "от 66,4 м²", price: "от 41,2 млн ₽", count: 73 },
];

function MortgageCalculator() {
  const [cost, setCost] = useState([25]);
  const [payment, setPayment] = useState([6]);
  const [years, setYears] = useState([20]);
  const principal = Math.max(cost[0] - payment[0], 1) * 1_000_000;
  const rate = 0.06 / 12;
  const months = years[0] * 12;
  const monthly = Math.round((principal * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1));
  return (
    <div className="mortgage-calculator">
      <div className="calculator-fields">
        <div><div className="range-label"><span>Стоимость квартиры</span><strong>{cost[0]} млн ₽</strong></div><Slider min={18} max={80} value={cost} onValueChange={setCost} /></div>
        <div><div className="range-label"><span>Первый взнос</span><strong>{payment[0]} млн ₽</strong></div><Slider min={4} max={30} value={payment} onValueChange={setPayment} /></div>
        <div><div className="range-label"><span>Срок</span><strong>{years[0]} лет</strong></div><Slider min={5} max={30} value={years} onValueChange={setYears} /></div>
      </div>
      <div className="calculator-result"><span>Примерный платёж</span><strong>{new Intl.NumberFormat("ru-RU").format(monthly)} ₽</strong><p>Расчёт при ставке 6% носит информационный характер. Финальные условия определяет банк.</p><Button>Получить предложения <ArrowRight /></Button></div>
    </div>
  );
}

export function ProjectExperience() {
  const [room, setRoom] = useState("all");
  const visibleFlats = room === "all" ? flats : flats.filter((flat) => flat.rooms === room);
  return (
    <main className="project-page">
      <section className="project-hero">
        <Header light />
        <Image className="project-hero-image" src="/images/shagal.webp" alt="Жилой квартал Шагал" fill priority sizes="100vw" />
        <div className="project-hero-shade" />
        <div className="project-hero-copy">
          <div className="project-badges"><span>−40% на выбранные квартиры</span><span>Бизнес-класс</span></div>
          <h1>Шагал</h1>
          <p>Бизнес-квартал у реки.<br />Город внутри города.</p>
          <div className="project-hero-meta"><span><MapPin />Технопарк · 11 минут</span><span><Building2 />Сдано и IV кв. 2026</span></div>
        </div>
        <a className="project-main-cta" href="#flats"><span>Квартиры от</span><strong>17,4 млн ₽</strong><ArrowRight /></a>
      </section>

      <nav className="project-subnav" aria-label="Навигация по проекту">
        <span>Шагал</span><div><a href="#about">О проекте</a><a href="#flats">Квартиры</a><a href="#features">Среда</a><a href="#progress">Строительство</a></div><Button asChild size="sm"><a href="#flats">Выбрать квартиру</a></Button>
      </nav>

      <section className="project-about" id="about">
        <p className="eyebrow eyebrow--blue">О проекте</p>
        <div className="project-about-grid"><h2>15 минут<br />до всего важного.</h2><div><p>Один из крупнейших жилых кварталов Европы: парк, набережная, кафе, спорт, детские площадки, школы и поликлиника — всё рядом.</p><p>Разная этажность, дизайнерские лобби, коворкинги и благоустроенные бульвары создают среду, в которой каждый день складывается по-своему.</p></div></div>
        <div className="project-facts"><div><strong>109 га</strong><span>территория квартала</span></div><div><strong>4,6 км</strong><span>набережной</span></div><div><strong>6 га</strong><span>центральный парк</span></div><div><strong>15 мин</strong><span>до Садового кольца</span></div></div>
      </section>

      <section className="flats-section" id="flats">
        <div className="flats-heading"><div><p className="eyebrow">Выбор квартиры</p><h2>Пространство<br />под ваш ритм.</h2></div><p>Сразу показываем диапазон площади, цены и количество доступных вариантов.</p></div>
        <div className="flats-filter"><span>Количество комнат</span><ToggleGroup type="single" value={room} onValueChange={(value) => value && setRoom(value)} className="room-toggle room-toggle--dark">{Object.entries(roomLabels).slice(0, 5).map(([value, label]) => <ToggleGroupItem key={value} value={value}>{label}</ToggleGroupItem>)}</ToggleGroup></div>
        <div className="flat-types">{visibleFlats.map((flat) => <a href="#callback" key={flat.rooms}><div><span>{flat.count} вариантов</span><h3>{flat.title}</h3></div><div><strong>{flat.area}</strong><strong>{flat.price}</strong></div><ArrowRight /></a>)}</div>
      </section>

      <section className="features-section" id="features">
        <div className="features-heading"><p className="eyebrow eyebrow--blue">Среда</p><h2>Квартал, который<br />живёт вместе с вами.</h2></div>
        <div className="feature-bento">
          <article className="feature-card feature-card--river"><span>01</span><div><h3>Набережная</h3><p>Маршрут для прогулок, спорта, встреч и тихого утра у воды.</p></div></article>
          <article className="feature-card feature-card--park"><span>02</span><div><h3>Парк в центре</h3><p>Шесть гектаров зелени соединяют жилые корпуса и общественные пространства.</p></div></article>
          <article className="feature-card feature-card--services"><span>03</span><div><h3>Всё рядом</h3><p>Школы, детские сады, клиника, магазины и кафе — в пределах короткой прогулки.</p></div></article>
        </div>
      </section>

      <section className="progress-section" id="progress">
        <div className="progress-copy"><p className="eyebrow">Ход строительства</p><h2>Открыто показываем,<br />как растёт квартал.</h2><p>Фотоотчёты, документы и камеры собраны в одном месте. Последнее обновление — август 2026.</p><Button variant="outline">Открыть камеры <MoveUpRight /></Button></div>
        <div className="progress-card"><div className="progress-number">78<small>%</small></div><div className="progress-bar"><i /></div><div className="progress-stages"><span><Check />Корпус</span><span><Check />Фасад</span><span className="is-current"><Clock3 />Инженерия</span><span>Отделка</span></div></div>
      </section>

      <section className="mortgage-section" id="buy"><div className="mortgage-heading"><p className="eyebrow eyebrow--blue">Ипотека</p><h2>Оцените платёж<br />за минуту.</h2></div><MortgageCalculator /></section>
      <section className="project-callback" id="callback"><div><p className="eyebrow">Офис продаж</p><h2>Увидеть «Шагал»<br />своими глазами.</h2><p>Набережная Марка Шагала, 8</p></div><div><a href="tel:+74953854663"><Phone />+7 495 385-46-63</a><Button>Записаться на встречу <ChevronRight /></Button></div></section>
      <Footer />
    </main>
  );
}
