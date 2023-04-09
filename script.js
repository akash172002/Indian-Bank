"use strict";

const buttonScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const model = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

const openModal = function () {
  model.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  model.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !model.classList.contains("hidden")) {
    closeModal();
  }
});

//Button scrolling
buttonScrollTo.addEventListener("click", function (e) {
  const s1cords = section1.getBoundingClientRect();
  section1.scrollIntoView({
    behavior: "smooth",
  });
});
////////////////////////////////////////////////////
//Page Navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const link = e.target.getAttribute("href");
    document.querySelector(link).scrollIntoView({
      behavior: "smooth",
    });
  }
});

//Tab component

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  if (!clicked) {
    return;
  }
  if (clicked) {
    //Remove active classes
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    //Active Tab
    clicked.classList.add("operations__tab--active");

    //Activate content Area
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

//Menu Fade Animation
const handelHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logoName = link.closest(".nav").querySelector(".logo__name");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
    logoName.style.opacity = this;
  }
};
//Passing 'argument in event Handelers'
nav.addEventListener("mouseover", handelHover.bind(0.5));

nav.addEventListener("mouseout", handelHover.bind(1));

//sticky Navigation
const header = document.querySelector(".header");
const navHieght = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHieght}px`,
});
headerObserver.observe(header);

//Reveal Section
const allSection = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//Lazy Image loading
const imgTargets = document.querySelectorAll("img[data-src]");
const loading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //replace scr to data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove("lazy-img");
  entry.target.addEventListener("load", function () {
    observer.unobserve(entry.target);
  });
};

const imageObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: "-200px",
});
imgTargets.forEach((img) => imageObserver.observe(img));

//Slider Component
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;
  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const gotToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //to go to next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    gotToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    gotToSlide(currentSlide);
    activateDot(currentSlide);
  };
  const intit = function () {
    gotToSlide(0);
    createDots();
    activateDot(0);
  };
  intit();
  //Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.querySelector("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      gotToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
const date = new Date().getFullYear();
document.querySelector(".date").textContent = date;
