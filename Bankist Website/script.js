'use strict';

///////////////////////////////////////
// Selecting HTML using JS

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab ');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const navLinks = document.querySelector('.nav__links');

const navbar = document.querySelector('.nav');

const navbarHeight = navbar.getBoundingClientRect().height; // This will help to get the navbar height dynamically
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');

const imgTargets = document.querySelectorAll('img[data-src]'); // selecting element based on their attribute. Here element (img) & attribute (data-src).

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Implementing Button Smooth Scrolling

btnScrollTo.addEventListener('click', function (e) {
  // To get co-ordinates according to the rectangle (as our webpages looks like rectangle) getBoundingClientRect(). And this method is relative to the visible viewport.
  const s1coords = section1.getBoundingClientRect();

  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // current scroll position
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // Now deprecated

  // current window position
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // 1st way: Old way
  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  // 2nd way: Modern way
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation smoothly

/*
// Using Event Delegations
1. Add event listener to common parent element
2. Determine what element originated the event
*/

navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;

  // -> First removing the existing active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
const handlerHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Passing "argument" into handler
navLinks.addEventListener('mouseover', handlerHover.bind(0.5));
navLinks.addEventListener('mouseout', handlerHover.bind(1));

///////////////////////////////////////
// Implementing Sticky Navigation
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: '-90px', // This will help the navbar to appear just when the header have 90px left, therfore -90px.
  rootMargin: `-${navbarHeight}px`, // This will help when we make website responsive for different screen sizes
});
headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionsObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////
//Lazy loading images
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // entry.target.classList.remove('lazy-img'); // -> this will work on devices with highspeed internet but will be problem for low speed internet user.

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '8px',
});
imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlide = slides.length;

  // function to create the dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // function that indicates which slide is active through dots
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  // function to change the slides
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Initial State or Starting Position
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //To go to next slide using right btn click
  const nextSlide = function () {
    if (currSlide === maxSlide - 1) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  btnRight.addEventListener('click', nextSlide);

  //To go to previous slide using left btn click
  const prevSlide = function () {
    if (currSlide === 0) currSlide = maxSlide - 1;
    else currSlide--;
    goToSlide(currSlide);
    activateDot(currSlide);
  };
  btnLeft.addEventListener('click', prevSlide);

  // Handeling keyboard (right & left keys) event for slider
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  //To go to each slide using dots click
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
