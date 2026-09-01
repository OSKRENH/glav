"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Menu,
  MoveUpRight,
  Phone,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const projects = [
  {
    id: "01",
    slug: "shagal",
    name: "Шагал",
    line: "Бизнес-квартал у реки",
    place: "Технопарк · 11 минут",
    note: "Даниловский район",
    price: 17.4,
    priceLabel: "от 17,4 млн ₽",
    delivery: "Сдано и IV кв. 2026",
    image: "/images/project-shagal-hero.webp",
    rooms: ["studio", "1", "2", "3", "4"],
  },
  {
    id: "02",
    slug: "voxhall",
    name: "Воксхолл",
    line: "Квартиры на Садовом",
    place: "Павелецкая · 5 минут",
    note: "Замоскворечье",
    price: 23.2,
    priceLabel: "от 23,2 млн ₽",
    delivery: "Сдан",
    image: "/images/project-voxhall-hero.webp",
    rooms: ["studio", "1", "2", "3"],
  },
  {
    id: "03",
    slug: "nagatino",
    name: "Нагатино Ай-Лэнд",
    line: "Квартиры с видом на реку",
    place: "Технопарк · 8 минут",
    note: "Нагатино",
    price: 17,
    priceLabel: "от 17 млн ₽",
    delivery: "Сдано и 2027",
    image: "/images/project-nagatino-hero.webp",
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

function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`neo-header ${overlay ? "neo-header--overlay" : ""}`}>
      <Link href="/" className="neo-logo" aria-label="Эталон — на главную">
        <Image src="/brand/etalon.svg" alt="Эталон" width={140} height={24} priority />
      </Link>
      <span className="neo-header-index">Москва · 55°45′ с. ш.</span>
      <nav className="neo-nav" aria-label="Главная навигация">
        <a href="#projects">Проекты</a>
        <a href="#buy">Покупка</a>
        <a href="#company">Компания</a>
      </nav>
      <a className="neo-phone" href="tel:+74953854663">+7 495 385-46-63</a>
      <button className="neo-city" type="button">Москва <ChevronDown /></button>
      <button className="neo-menu" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <div className="neo-mobile-nav">
          <a href="#projects" onClick={() => setOpen(false)}>Проекты</a>
          <a href="#buy" onClick={() => setOpen(false)}>Способы покупки</a>
          <a href="#company" onClick={() => setOpen(false)}>О компании</a>
          <a href="tel:+74953854663">+7 495 385-46-63</a>
        </div>
      )}
    </header>
  );
}

function HomeFinder() {
  const [room, setRoom] = useState("all");
  const [budget, setBudget] = useState([35]);
  const count = useMemo(
    () => projects.filter((project) => project.price <= budget[0] && (room === "all" || project.rooms.includes(room))).length,
    [room, budget],
  );
  return (
    <div className="pulse-finder">
      <div className="pulse-title"><span>Найти свой адрес</span><strong>0{count || 0}</strong></div>
      <div className="pulse-control">
        <span>Комнатность</span>
        <ToggleGroup type="single" value={room} onValueChange={(value) => value && setRoom(value)} className="neo-toggle" aria-label="Количество комнат">
          {Object.entries(roomLabels).map(([value, label]) => <ToggleGroupItem value={value} key={value}>{label}</ToggleGroupItem>)}
        </ToggleGroup>
      </div>
      <div className="pulse-control pulse-control--range">
        <div><span>Бюджет до</span><strong>{budget[0]} млн ₽</strong></div>
        <Slider value={budget} onValueChange={setBudget} min={15} max={80} step={1} aria-label="Максимальный бюджет" />
      </div>
      <a href="#projects" className="pulse-go" aria-label="Показать подходящие проекты"><ArrowDownRight /></a>
    </div>
  );
}

function ProjectNavigator() {
  const [liked, setLiked] = useState<string[]>([]);
  const toggleLike = (slug: string) => setLiked((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]);
  return (
    <div className="project-gallery" aria-label="Проекты Группы Эталон">
      {projects.map((project, index) => {
        const href = project.slug === "shagal" ? "/projects/shagal" : "#callback";
        return (
          <article className={`project-poster project-poster--${index + 1}`} key={project.slug}>
            <Link href={href} className="project-poster-image">
              <Image src={project.image} alt={`Архитектура проекта ${project.name}`} fill sizes="(max-width: 820px) 100vw, 34vw" />
              <span>{project.id} / 03</span>
            </Link>
            <button className={`poster-like ${liked.includes(project.slug) ? "is-liked" : ""}`} type="button" onClick={() => toggleLike(project.slug)} aria-label={`${liked.includes(project.slug) ? "Убрать" : "Добавить"} ${project.name} ${liked.includes(project.slug) ? "из" : "в"} избранного`}><Heart fill={liked.includes(project.slug) ? "currentColor" : "none"} /></button>
            <Link href={href} className="project-poster-copy">
              <div><p>{project.note}</p><h3>{project.name}</h3></div>
              <div className="poster-facts"><span><MapPin />{project.place}</span><span><Clock3 />{project.delivery}</span></div>
              <div className="poster-bottom"><span>{project.line}</span><strong>{project.priceLabel}</strong><MoveUpRight /></div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function Footer() {
  return (
    <footer className="neo-footer">
      <div className="footer-logo"><Image src="/brand/group-etalon.svg" alt="Группа Эталон" width={180} height={48} /><span>Проектируем близость</span></div>
      <div className="footer-nav"><div><span>Выбрать</span><a href="#projects">Проекты</a><a href="#projects">Квартиры</a><a href="#buy">Способы покупки</a></div><div><span>Узнать</span><a href="#company">О компании</a><a href="#company">Новости</a><a href="#company">Контакты</a></div></div>
      <a className="footer-call" href="tel:+74953854663">+7 495 385-46-63 <ArrowRight /></a>
      <div className="footer-legal"><span>© 2026 Группа «Эталон»</span><span>Не является публичной офертой</span><a href="#privacy">Конфиденциальность</a></div>
    </footer>
  );
}

export function HomeExperience() {
  return (
    <main className="neo-site">
      <section className="atlas-hero">
        <Header />
        <div className="atlas-edition"><span>Новая Москва</span><b>01—24</b></div>
        <div className="atlas-title">
          <p>Девелоперская группа<br />с 39-летней историей</p>
          <h1><span>ЖИТЬ</span><span>БЛИЖЕ</span></h1>
          <div className="atlas-thesis"><i /> <p>К реке, парку, работе,<br />людям и своим планам.</p></div>
        </div>
        <Link href="/projects/shagal" className="atlas-window">
          <Image src="/images/project-shagal-hero.webp" alt="Жилой квартал Шагал" fill priority sizes="(max-width: 800px) 92vw, 46vw" />
          <div className="window-label"><span>Сейчас в фокусе</span><strong>Шагал</strong><small>Квартал у Москвы-реки</small></div>
          <MoveUpRight />
        </Link>
        <div className="atlas-age"><strong>39</strong><span>лет<br />в городе</span></div>
        <div className="atlas-finder"><HomeFinder /></div>
      </section>

      <section className="index-projects" id="projects">
        <div className="index-heading"><span>01</span><div><p>Проекты</p><h2>Три разных<br />способа жить<br />в Москве.</h2></div><p>Выберите проект как маршрут: по району, времени до метро и тому, что хочется видеть из окна.</p></div>
        <ProjectNavigator />
      </section>

      <section className="distance-manifesto" id="company">
        <div className="manifesto-label"><span>02</span><p>Наш принцип</p></div>
        <h2>ДОМ — ЭТО<br />НЕ МЕТРЫ.<br /><em>ЭТО РАССТОЯНИЕ</em><br />ДО ВАЖНОГО.</h2>
        <div className="manifesto-stats"><div><strong>9,8</strong><span>млн м²<br />создано</span></div><div><strong>380</strong><span>тысяч<br />жителей</span></div><div><strong>8</strong><span>регионов<br />присутствия</span></div></div>
      </section>

      <section className="route-buy" id="buy">
        <div className="route-heading"><span>03</span><div><p>Покупка</p><h2>Один адрес.<br />Несколько маршрутов.</h2></div></div>
        <div className="route-list">
          <a href="#callback"><span>01</span><h3>Ипотека</h3><p>Сравнить платёж и предложения банков</p><ArrowRight /></a>
          <a href="#callback"><span>02</span><h3>Рассрочка</h3><p>Разложить стоимость на удобный график</p><ArrowRight /></a>
          <a href="#callback"><span>03</span><h3>Обмен</h3><p>Зачесть стоимость вашей квартиры</p><ArrowRight /></a>
          <a href="#callback"><span>04</span><h3>Онлайн</h3><p>Выбрать и забронировать без визита</p><ArrowRight /></a>
        </div>
      </section>

      <section className="city-proof">
        <div className="proof-mark"><Image src="/brand/symbol-etalon.svg" alt="" width={52} height={58} /><span>Эталон / 1987—2026</span></div>
        <p>Мы соединяем жильё, общественные пространства и сервисы в среду, где город не заканчивается у двери квартиры.</p>
        <a href="#company">Как мы проектируем <ArrowRight /></a>
      </section>

      <section className="neo-callback" id="callback">
        <div><span>04 / Разговор</span><h2>Какой город<br />нужен вам?</h2></div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label><span>Имя</span><input type="text" placeholder="Иван" /></label>
          <label><span>Телефон</span><input type="tel" placeholder="+7 999 000-00-00" /></label>
          <Button type="submit">Обсудить выбор <ArrowRight /></Button>
          <small>Оставляя контакты, вы соглашаетесь с обработкой персональных данных.</small>
        </form>
      </section>
      <Footer />
    </main>
  );
}

const flats = [
  { rooms: "studio", title: "Студии", area: "23—31 м²", price: "от 17,4 млн ₽", count: 34 },
  { rooms: "1", title: "Одна спальня", area: "35—52 м²", price: "от 24,8 млн ₽", count: 86 },
  { rooms: "2", title: "Две спальни", area: "48—79 м²", price: "от 26,5 млн ₽", count: 112 },
  { rooms: "3", title: "Три спальни", area: "66—118 м²", price: "от 41,2 млн ₽", count: 73 },
];

function MortgageCalculator() {
  const [cost, setCost] = useState([25]);
  const [payment, setPayment] = useState([6]);
  const [years, setYears] = useState([20]);
  const principal = Math.max(cost[0] - payment[0], 1) * 1_000_000;
  const monthlyRate = 0.06 / 12;
  const months = years[0] * 12;
  const monthly = Math.round((principal * monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1));
  return (
    <div className="line-calculator">
      <div className="line-fields">
        <div><div><span>Стоимость</span><strong>{cost[0]} млн ₽</strong></div><Slider min={18} max={80} value={cost} onValueChange={setCost} /></div>
        <div><div><span>Первый взнос</span><strong>{payment[0]} млн ₽</strong></div><Slider min={4} max={30} value={payment} onValueChange={setPayment} /></div>
        <div><div><span>Срок</span><strong>{years[0]} лет</strong></div><Slider min={5} max={30} value={years} onValueChange={setYears} /></div>
      </div>
      <div className="line-result"><span>Примерный платёж</span><strong>{new Intl.NumberFormat("ru-RU").format(monthly)} ₽</strong><p>Информационный расчёт при ставке 6%. Финальные условия определяет банк.</p><Button>Получить предложения <ArrowRight /></Button></div>
    </div>
  );
}

export function ProjectExperience() {
  const [room, setRoom] = useState("all");
  const visibleFlats = room === "all" ? flats : flats.filter((flat) => flat.rooms === room);
  return (
    <main className="project-concept">
      <section className="project-cover">
        <Header />
        <div className="cover-orange"><span>Проект / 01</span><h1>ША<br />ГАЛ</h1><p>Бизнес-квартал у реки.<br />Город внутри города.</p></div>
        <div className="cover-image"><Image src="/images/project-shagal-hero.webp" alt="Жилой квартал Шагал" fill priority sizes="(max-width: 800px) 100vw, 58vw" /><span>55.7008° N<br />37.6387° E</span></div>
        <div className="cover-data"><div><span>Метро</span><strong>Технопарк · 11 мин</strong></div><div><span>Готовность</span><strong>Сдано и IV кв. 2026</strong></div><div><span>Квартиры</span><strong>от 17,4 млн ₽</strong></div><a href="#flats">Выбрать <ArrowDownRight /></a></div>
      </section>

      <nav className="project-line-nav"><Link href="/"><ArrowLeft /> Все проекты</Link><div><a href="#idea">Идея</a><a href="#flats">Квартиры</a><a href="#life">Среда</a><a href="#progress">Стройка</a></div><Button asChild><a href="#flats">Выбрать квартиру</a></Button></nav>

      <section className="project-idea" id="idea">
        <div className="idea-caption"><span>01 / Идея</span><p>Один из крупнейших жилых кварталов Европы, созданный по принципу пятнадцатиминутного города.</p></div>
        <h2>УТРО — У РЕКИ.<br />ДЕНЬ — В ГОРОДЕ.<br /><em>ВЕЧЕР — ДОМА.</em></h2>
        <div className="idea-route"><span>Дом</span><i /><span>Парк</span><i /><span>Школа</span><i /><span>Набережная</span><b>15 минут</b></div>
        <div className="idea-numbers"><div><strong>109</strong><span>гектаров</span></div><div><strong>4,6</strong><span>км набережной</span></div><div><strong>6</strong><span>га парка</span></div></div>
      </section>

      <section className="project-visual-story" aria-label="Архитектура и среда проекта Шагал">
        <div className="visual-story-head"><span>Шагал / В деталях</span><h2>Не обещание.<br />Конкретное место.</h2><p>Архитектура, набережная, дворы и лобби — реальные визуализации с официальной страницы проекта.</p></div>
        <figure className="visual-frame visual-frame--architecture"><div><Image src="/images/shagal-architecture.webp" alt="Архитектура квартала Шагал" fill sizes="(max-width: 820px) 100vw, 64vw" /></div><figcaption><span>01</span><strong>Архитектура</strong><p>Разные масштабы домов складываются в цельный городской квартал.</p></figcaption></figure>
        <figure className="visual-frame visual-frame--embankment"><div><Image src="/images/shagal-embankment.webp" alt="Набережная квартала Шагал" fill sizes="(max-width: 820px) 100vw, 36vw" /></div><figcaption><span>02</span><strong>Набережная</strong><p>4,6 километра маршрутов вдоль воды.</p></figcaption></figure>
        <figure className="visual-frame visual-frame--lobby"><div><Image src="/images/shagal-lobby.webp" alt="Лобби квартала Шагал" fill sizes="(max-width: 820px) 100vw, 36vw" /></div><figcaption><span>03</span><strong>Urban-лобби</strong><p>Место для встреч, работы и короткой паузы.</p></figcaption></figure>
        <figure className="visual-frame visual-frame--landscape"><div><Image src="/images/shagal-landscape.webp" alt="Благоустройство квартала Шагал" fill sizes="(max-width: 820px) 100vw, 64vw" /></div><figcaption><span>04</span><strong>Благоустройство</strong><p>Дворы, улицы и первый этаж работают как единая среда.</p></figcaption></figure>
      </section>

      <section className="apartment-index" id="flats">
        <div className="apartment-head"><span>02 / Квартиры</span><h2>Найти своё<br />пространство</h2><p>Сначала — понятный диапазон. Затем планировка, этаж и вид.</p></div>
        <div className="apartment-toolbar"><span>Комнаты</span><ToggleGroup type="single" value={room} onValueChange={(value) => value && setRoom(value)} className="project-toggle">{Object.entries(roomLabels).slice(0, 5).map(([value, label]) => <ToggleGroupItem value={value} key={value}>{label}</ToggleGroupItem>)}</ToggleGroup><strong>{visibleFlats.reduce((sum, flat) => sum + flat.count, 0)} вариантов</strong></div>
        <div className="apartment-rows">{visibleFlats.map((flat, index) => <a href="#contact" key={flat.rooms}><span>0{index + 1}</span><h3>{flat.title}</h3><p>{flat.area}</p><strong>{flat.price}</strong><ArrowRight /></a>)}</div>
      </section>

      <section className="life-lines" id="life">
        <div className="life-title"><span>03 / Среда</span><h2>Всё нужное<br />уже по пути.</h2></div>
        <div className="life-row life-row--blue"><span>01</span><h3>Набережная</h3><p>Прогулки, спорт, встречи и тихое утро у воды.</p><Plus /></div>
        <div className="life-row"><span>02</span><h3>Парк</h3><p>Шесть гектаров зелени в центре квартала.</p><Plus /></div>
        <div className="life-row life-row--orange"><span>03</span><h3>Каждый день</h3><p>Школы, клиника, кафе и сервисы в короткой прогулке.</p><Plus /></div>
      </section>

      <section className="build-line" id="progress">
        <div className="build-copy"><span>04 / Строительство</span><h2>ВИДНО,<br />КАК РАСТЁТ.</h2><p>Камеры, документы и ежемесячные отчёты собраны в одном месте.</p><Button variant="outline">Открыть камеры <MoveUpRight /></Button></div>
        <div className="build-media"><figure className="build-photo"><Image src="/images/shagal-construction.webp" alt="Строительство квартала Шагал в августе 2026 года" fill sizes="(max-width: 820px) 100vw, 38vw" /><figcaption>Фото со стройки · 18 августа 2026</figcaption></figure><div className="build-progress"><strong>78<small>%</small></strong><div className="build-bar"><i /></div><div><span><Check />Корпус</span><span><Check />Фасад</span><span className="current"><Clock3 />Инженерия</span><span>Отделка</span></div><p>Обновлено в августе 2026</p></div></div>
      </section>

      <section className="project-mortgage" id="buy"><div className="mortgage-title"><span>05 / Ипотека</span><h2>ПЛАТЁЖ<br />БЕЗ СЮРПРИЗОВ.</h2></div><MortgageCalculator /></section>
      <section className="project-contact" id="contact"><div><span>06 / Встреча</span><h2>Увидеть<br />«Шагал».</h2><p>Набережная Марка Шагала, 8</p></div><div><a href="tel:+74953854663"><Phone />+7 495 385-46-63</a><Button>Записаться <ArrowRight /></Button></div></section>
      <Footer />
    </main>
  );
}
