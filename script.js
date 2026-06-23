const htmlEl = document.querySelector("html");
const modeTogglerBtn = document.querySelector(".mode-toggler");
const modeTogglerText = document.querySelector(".mode-state-text");
const formEl = document.querySelector("form");
const inputEl = document.querySelector(".input");
const userDataToFullfill = document.querySelectorAll("[class^='user-git']");
const mainDiv = document.querySelector(".main-div");
const notFoundDiv = document.querySelector(".not-found");
const errorEl = document.querySelector(".error");

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

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const rawData = new FormData(formEl);
  const { "input-name": inputName } = Object.fromEntries(rawData);
  const nameTrim = inputName.trim();

  getData(nameTrim);
});

inputEl.addEventListener("focus", () => {
  formEl.classList.add("focused");
});

inputEl.addEventListener("blur", () => {
  formEl.classList.remove("focused");
});

async function getData(name) {
  const rawData = await fetch(` https://api.github.com/users/${name}`);

  const response = await rawData.json();

  if (!rawData.ok) {
    notFoundDiv.classList.remove("hidden");
    errorEl.classList.remove("hidden");
    mainDiv.classList.add("hidden");
    return;
  }

  const data = [
    response.avatar_url,
    response.name,
    response.login,
    response.created_at,
    response.bio,
    response.public_repos,
    response.followers,
    response.following,
    response.location,
    response.twitter_username,
    response.html_url,
    response.company,
  ];

  updatePageData(data);
  notFoundDiv.classList.add("hidden");
  errorEl.classList.add("hidden");
  mainDiv.classList.remove("hidden");
}

function updatePageData(data) {
  for (let i = 0; i < userDataToFullfill.length; i++) {
    let text;
    if (String(data[i]) === "null" || String(data[i]) === "<empty string>") {
      text = "Not Available";
    } else {
      text = data[i];
    }

    if (i === 0) {
      userDataToFullfill[i].src = `${text}`;
    } else if (i === 2) {
      userDataToFullfill[i].textContent = `@${text}`;
    } else if (i === 3) {
      const date = new Date(text);
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      const formatter = new Intl.DateTimeFormat("en-GB", options);
      userDataToFullfill[i].textContent = `Joined ${formatter.format(date)}`;
    } else if (i === 10) {
      userDataToFullfill[i].href = `${text}`;
    } else {
      userDataToFullfill[i].textContent = `${text}`;
    }
  }
}
