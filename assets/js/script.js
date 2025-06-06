'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedPage = this.textContent.trim().toLowerCase();

    for (let j = 0; j < pages.length; j++) {
    const page = pages[j];
    const isStandardPage = ["about", "resume", "portfolio", "reviews", "contact"].includes(clickedPage);
    const isTarget = page.dataset.page.toLowerCase() === clickedPage;

    page.classList.toggle("active", isTarget);
    }

    for (let j = 0; j < navigationLinks.length; j++) {
      const isTarget = navigationLinks[j].textContent.trim().toLowerCase() === clickedPage;
      navigationLinks[j].classList.toggle("active", isTarget);
    }

    if (window.location.search.includes("project=")) {
      history.replaceState(null, "", window.location.pathname);
    }

    window.scrollTo(0, 0);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const project = params.get("project");

  if (project) {
  pages.forEach(p => p.classList.remove("active"));

  const targetPage = Array.from(pages).find(p => p.dataset.page.toLowerCase() === project.toLowerCase());
  if (targetPage) targetPage.classList.add("active");

  navigationLinks.forEach(link => link.classList.remove("active"));

  window.scrollTo(0, 0);
}

});

document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;

    const updateCarousel = () => {
      const width = carousel.offsetWidth;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    window.addEventListener('resize', updateCarousel);

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel();
    });

    updateCarousel();
  });
});

document.body.addEventListener('click', function (event) {
  const clicked = event.target;

  if (clicked.tagName === 'IMG' && (clicked.closest('.image-gallery') || clicked.closest('.carousel-track'))) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');

    if (modal && modalImg) {
      modalImg.src = clicked.src;
      modalImg.alt = clicked.alt || '';
      modal.classList.remove('hidden');
    }
  }

  if (clicked.classList.contains('close-modal')) {
    document.getElementById('image-modal').classList.add('hidden');
  }

  if (clicked.id === 'image-modal') {
    clicked.classList.add('hidden');
  }
});