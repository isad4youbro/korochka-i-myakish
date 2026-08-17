/**
 * ЛОГИКА САЙТА «КОРОЧКА И МЯКИШ»
 * Ничего в этом файле обычно менять не нужно — тексты и цены находятся
 * в js/data.js. Здесь только то, как это всё превращается в разметку.
 */
(() => {
  "use strict";

  // ----------------------------------------------------------
  // Небольшой набор line-иконок, чтобы не тянуть внешние библиотеки
  // ----------------------------------------------------------
  const ICONS = {
    "cup-to-go":
      '<path d="M6 8h11l-1.1 10.1a2 2 0 0 1-2 1.9H9.1a2 2 0 0 1-2-1.9L6 8Z"/><path d="M6 8 5.2 5.6A1 1 0 0 1 6.1 4h9.8a1 1 0 0 1 .9 1.6L16 8"/><path d="M9 4V2.6c0-.3.3-.6.7-.6h4.6c.4 0 .7.3.7.6V4"/>',
    wc: '<circle cx="8.5" cy="5" r="1.6"/><path d="M8.5 8v13M5 22l2-8h3l2 8M5 11h7"/><circle cx="16.5" cy="5" r="1.6"/><path d="M14.5 22V13M18.5 22V13M13.3 13h6.4l-1-4.6a1 1 0 0 0-1-.8h-2.4a1 1 0 0 0-1 .8L13.3 13Z"/>',
    plug: '<path d="M9 2v6M15 2v6M7 8h10l-.6 5.4A5 5 0 0 1 11.5 18v0A5 5 0 0 1 6.6 13.4L7 8Z"/><path d="M11.5 18v4"/>',
    bag: '<path d="M6 8h12l-1 12.1a2 2 0 0 1-2 1.9H9a2 2 0 0 1-2-1.9L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    tea: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 4.5c0 1-1 1-1 2M11 4.5c0 1-1 1-1 2"/>',
    baby: '<circle cx="12" cy="8" r="3.2"/><path d="M4.5 21c0-4.5 3.4-7 7.5-7s7.5 2.5 7.5 7"/><path d="M9.3 8c0-1 .8-2 1.7-2.6M14.7 8c0-1-.8-2-1.7-2.6"/>',
    dog: '<path d="M5 10c0-2.5 1.5-6 3.5-6 1 0 1.3 1 3.5 1s2.5-1 3.5-1c2 0 3.5 3.5 3.5 6 0 4.5-3 8-7 8s-7-3.5-7-8Z"/><circle cx="9.5" cy="11" r=".8" fill="currentColor" stroke="none"/><circle cx="14.5" cy="11" r=".8" fill="currentColor" stroke="none"/><path d="M11 13.5c.3.4.7.4 1 0"/>',
    wifi: '<path d="M4 9a12 12 0 0 1 16 0"/><path d="M7 12.5a7.5 7.5 0 0 1 10 0"/><path d="M10 16a3.2 3.2 0 0 1 4 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/>',
    parking: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M10 8v8M10 8h2.5a2 2 0 0 1 0 4H10"/>',
    star: '<path d="M12 3.3 14.6 9l6.2.6-4.7 4.1 1.4 6.1L12 16.8 6.5 19.8l1.4-6.1-4.7-4.1L9.4 9 12 3.3Z"/>',
    phone:
      '<path d="M5 4h3.5l1.5 4-2 1.3a11 11 0 0 0 5.7 5.7l1.3-2 4 1.5V18a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 4Z"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/>',
    route: '<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M6 17V13a4 4 0 0 1 4-4h4a4 4 0 0 0 4-4"/>',
    "coffee-cup":
      '<path d="M5 9h11l-.9 9.3A2 2 0 0 1 13.1 20H7.9a2 2 0 0 1-2-1.7L5 9Z"/><path d="M16 10.5h1.6a2.6 2.6 0 1 1 0 5.2H15.4"/><path d="M8 6c0-1 1-1 1-2M12 6c0-1 1-1 1-2"/>',
    bread:
      '<path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5Z"/><path d="M9 8.5c1-1 2-1 3 0M13 8.5c1-1 2-1 3 0"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
  };

  function icon(name, cls = "") {
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${
      ICONS[name] || ""
    }</svg>`;
  }

  function stars(rating, max = 5) {
    let out = "";
    for (let i = 1; i <= max; i++) {
      out += icon("star", i <= Math.round(rating) ? "star--on" : "star--off");
    }
    return `<span class="stars" role="img" aria-label="${rating} из ${max} звёзд">${out}</span>`;
  }

  // ----------------------------------------------------------
  // Хедер: подставляем название/телефон, мобильное меню, тень при скролле
  // ----------------------------------------------------------
  function initHeader() {
    document.querySelectorAll("[data-brand-name]").forEach((el) => (el.textContent = CONFIG.name));
    document.querySelectorAll("[data-phone-display]").forEach((el) => (el.textContent = CONFIG.phoneDisplay));
    document.querySelectorAll("[data-phone-href]").forEach((el) => el.setAttribute("href", CONFIG.phoneHref));

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav-links");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = icon(open ? "close" : "menu");
      });
      nav.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", () => {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.innerHTML = icon("menu");
        })
      );
    }

    const header = document.querySelector(".site-header");
    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  // ----------------------------------------------------------
  // Hero
  // ----------------------------------------------------------
  function initHero() {
    const titleEl = document.querySelector("[data-hero-title]");
    const subEl = document.querySelector("[data-hero-subtitle]");
    if (titleEl) titleEl.textContent = CONFIG.heroTitle;
    if (subEl) subEl.textContent = CONFIG.heroSubtitle;

    const ratingEl = document.querySelector("[data-hero-rating]");
    if (ratingEl) {
      // Внимание: окончание слова "оценки/оценок" здесь зашито под текущее
      // число (33). Если поменяете CONFIG.ratingsCount на другое —
      // проверьте согласование: 1 — оценка, 2–4 — оценки, 5–20 и 0 — оценок.
      ratingEl.innerHTML = `
        ${icon("star", "star--on")}
        <span><strong>${CONFIG.rating}</strong> · ${CONFIG.ratingsCount} оценки на Яндекс Картах</span>
      `;
    }
  }

  // ----------------------------------------------------------
  // Фичи ("О нас")
  // ----------------------------------------------------------
  function renderFeatures() {
    const wrap = document.querySelector("[data-features]");
    if (!wrap) return;
    wrap.innerHTML = CONFIG.features
      .map((f) => `<li class="feature-pill">${icon(f.icon)}<span>${f.label}</span></li>`)
      .join("");
  }

  // ----------------------------------------------------------
  // Каталог
  // ----------------------------------------------------------
  function sizeLabel(s) {
    return s.label ? `${s.label} · ${s.volume}` : s.volume;
  }

  function productCardHTML(p) {
    const hasMultipleSizes = p.sizes.length > 1;
    const firstPrice = p.sizes[0].price;

    const sizesHTML = hasMultipleSizes
      ? `<div class="size-switch" role="group" aria-label="Выбор объёма — ${p.name}">
          ${p.sizes
            .map(
              (s, i) => `
            <button type="button" class="size-switch__btn${i === 0 ? " is-active" : ""}"
              data-price="${s.price}" aria-pressed="${i === 0}" title="${sizeLabel(s)}">
              ${s.volume}
            </button>`
            )
            .join("")}
        </div>`
      : `<p class="product-card__volume">${sizeLabel(p.sizes[0])}</p>`;

    return `
      <article class="product-card" data-category="${p.category}">
        <div class="product-photo">
          <span class="product-photo__fallback">${icon("coffee-cup")}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy"
               onload="this.classList.add('is-loaded'); this.previousElementSibling.style.opacity=0;"
               onerror="this.remove()">
        </div>
        <div class="product-card__body">
          <div class="product-card__top">
            <h3 class="product-card__name">${p.name}</h3>
            <span class="product-card__price" data-price-display>${firstPrice} ₽</span>
          </div>
          <p class="product-card__tagline">${p.tagline}</p>
          ${sizesHTML}
          <p class="product-card__composition"><span>Состав:</span> ${p.composition}</p>
        </div>
      </article>`;
  }

  function renderCatalog() {
    const tabsWrap = document.querySelector("[data-category-tabs]");
    const grid = document.querySelector("[data-product-grid]");
    const emptyState = document.querySelector("[data-catalog-empty]");
    if (!tabsWrap || !grid) return;

    tabsWrap.innerHTML = CATEGORIES.map(
      (c, i) =>
        `<button class="tab${i === 0 ? " is-active" : ""}" type="button" data-cat="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
    ).join("");

    grid.innerHTML = PRODUCTS.map(productCardHTML).join("");

    const cards = Array.from(grid.querySelectorAll(".product-card"));

    // Переключение категории — карточки скрываются классом .is-hidden
    // (а не атрибутом hidden), потому что у .product-card задан свой
    // display:flex, который иначе перебивал бы hidden по специфичности
    // CSS-правил и карточки оставались бы видимыми.
    function applyFilter(catId) {
      let visible = 0;
      cards.forEach((card) => {
        const match = catId === "all" || card.dataset.category === catId;
        card.classList.toggle("is-hidden", !match);
        if (match) visible++;
      });
      if (emptyState) emptyState.hidden = visible !== 0;
    }

    tabsWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab");
      if (!btn) return;
      tabsWrap.querySelectorAll(".tab").forEach((t) => {
        const active = t === btn;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-pressed", String(active));
      });
      applyFilter(btn.dataset.cat);
    });

    // Переключение объёма внутри карточки — обновляет цену наверху карточки
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".size-switch__btn");
      if (!btn) return;
      const card = btn.closest(".product-card");
      if (!card) return;
      card.querySelectorAll(".size-switch__btn").forEach((b) => {
        const active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      const priceEl = card.querySelector("[data-price-display]");
      if (priceEl) priceEl.textContent = `${btn.dataset.price} ₽`;
    });

    applyFilter("all");
  }

  // ----------------------------------------------------------
  // Отзывы
  // ----------------------------------------------------------
  function initials(name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function renderReviews() {
    const grid = document.querySelector("[data-review-grid]");
    if (!grid) return;

    grid.innerHTML = REVIEWS.map(
      (r) => `
      <article class="review-card">
        <div class="review-card__head">
          <span class="review-card__avatar" aria-hidden="true">${initials(r.name)}</span>
          <div>
            <p class="review-card__name">${r.name}</p>
            <p class="review-card__date">${r.date}</p>
          </div>
        </div>
        ${stars(r.rating)}
        <p class="review-card__text">${r.text}</p>
      </article>`
    ).join("");

    document.querySelectorAll("[data-rating-value]").forEach((el) => (el.textContent = CONFIG.rating));
    // Как и в hero-блоке, окончания слов здесь зашиты под текущие числа
    // (25 отзывов, 33 оценки) — при изменении CONFIG проверьте согласование.
    document.querySelectorAll("[data-reviews-count]").forEach(
      (el) => (el.textContent = `${CONFIG.reviewsCount} отзывов · ${CONFIG.ratingsCount} оценки`)
    );
    document.querySelectorAll("[data-yandex-reviews-link]").forEach((el) =>
      el.setAttribute("href", CONFIG.yandexReviewsUrl)
    );

    const summaryStars = document.querySelector("[data-rating-stars]");
    if (summaryStars) summaryStars.innerHTML = stars(CONFIG.rating);
  }

  // ----------------------------------------------------------
  // Карта и контакты
  // ----------------------------------------------------------
  function renderContacts() {
    const map = document.querySelector("[data-map-frame]");
    if (map) map.setAttribute("src", CONFIG.mapEmbedUrl);

    const fullAddress = CONFIG.addressNote ? `${CONFIG.address} — ${CONFIG.addressNote}` : CONFIG.address;
    document.querySelectorAll("[data-address]").forEach((el) => (el.textContent = fullAddress));
    document.querySelectorAll("[data-hours]").forEach((el) => (el.textContent = CONFIG.hours));
    document.querySelectorAll("[data-route-link]").forEach((el) => el.setAttribute("href", CONFIG.yandexRouteUrl));
    document.querySelectorAll("[data-yandex-org-link]").forEach((el) => el.setAttribute("href", CONFIG.yandexOrgUrl));
  }

  // ----------------------------------------------------------
  // Мелочи: год в подвале
  // ----------------------------------------------------------
  function initMisc() {
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initHero();
    renderFeatures();
    renderCatalog();
    renderReviews();
    renderContacts();
    initMisc();
  });
})();