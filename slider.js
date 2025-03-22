let currentIndex = 1;
let slides = document.querySelectorAll(".slide");

function updateSlides() {
    slides.forEach((slide) => {
        slide.classList.remove("left", "center", "right");
    });
    slides[(currentIndex + 2) % 3].classList.add("left");
    slides[currentIndex].classList.add("center");
    slides[(currentIndex + 1) % 3].classList.add("right");
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % 3;
    updateSlides();
}

function prevSlide() {
    currentIndex = (currentIndex + 2) % 3;
    updateSlides();
}
