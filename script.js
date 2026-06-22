const htmlEl = document.querySelector("html");
const modeTogglerBtn = document.querySelector(".mode-toggler");
const modeTogglerText = document.querySelector(".mode-state-text");

modeTogglerBtn.addEventListener("click", toggleMode);

function toggleMode() {
  const moonIcon = document.querySelector(".mode-icon-moon");
  const sunIcon = document.querySelector(".mode-icon-sun");

  htmlEl.classList.toggle("dark");

  moonIcon.classList.toggle("show-img");
  moonIcon.classList.toggle("hide-moon");

  sunIcon.classList.toggle("show-img");
  sunIcon.classList.toggle("hide-sun");

  modeTogglerText.textContent = moonIcon.classList.contains("show-img")
    ? "dark"
    : "light";
}
