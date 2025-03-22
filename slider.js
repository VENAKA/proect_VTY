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
let yarBtn = document.getElementById('1')
let tarBtn = document.getElementById('2')
let venBtn = document.getElementById('3')

yarBtn.addEventListener('click', function(){
    window.location.href = './YARIK/yarik.html'
})

tarBtn.addEventListener('click', function(){
    window.location.href = './TARAS/taras.html'
})

venBtn.addEventListener('click', function(){
    window.location.href = './VENAKA/venaka.html'
})
