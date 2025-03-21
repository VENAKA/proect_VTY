document.addEventListener("DOMContentLoaded", function () {
    function updateClock() {
        let now = new Date();
        let hrs = now.getHours().toString().padStart(2, '0');
        let mins = now.getMinutes().toString().padStart(2, '0');
        let secs = now.getSeconds().toString().padStart(2, '0');
        document.getElementById("real-time-clock").textContent = hrs + ":" + mins + ":" + secs;
    }
    setInterval(updateClock, 1000);
    updateClock();

    let timeSpent = localStorage.getItem("timeSpent") ? parseInt(localStorage.getItem("timeSpent")) : 0;
    let startTime = Date.now();

    function updateTimeSpent() {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        let totalTime = timeSpent + elapsedTime;
        let hrs = Math.floor(totalTime / 3600);
        let mins = Math.floor((totalTime % 3600) / 60);
        let secs = totalTime % 60;
        document.getElementById("time-spent").textContent = hrs + "h " + mins + "m " + secs + "s";
    }
    setInterval(updateTimeSpent, 1000);
    updateTimeSpent();

    window.addEventListener("beforeunload", function () {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        localStorage.setItem("timeSpent", timeSpent + elapsedTime);
    });

    let button = document.querySelector(".button");
    let container = document.querySelector(".timer-container");

    button.addEventListener("click", function () {
        container.classList.toggle("flipped");
    });
});
