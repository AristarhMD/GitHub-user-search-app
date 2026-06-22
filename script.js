const htmlEl = document.querySelector("html");
const modeTogglerBtn = document.querySelector(".mode-toggler");
const modeTogglerText = document.querySelector(".mode-state-text");
const formEl = document.querySelector("form");
const userDataToFullfill = document.querySelectorAll("[class^='user-git']");

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

async function getData(name) {
  const rawData = await fetch(` https://api.github.com/users/${name}`);

  const response = await rawData.json();
  console.log(response);
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
    response.blog,
    response.company,
  ];

  updatePageData(data);
}

function updatePageData(data) {
  console.log(userDataToFullfill);
  for (let i = 0; i < userDataToFullfill.length; i++) {
    let text;
    console.log(i, data[i]);
    if (!data[i]) {
      text = "Not Available";
    } else {
      text = data[i];
    }

    if (i === 0 || i === 10) {
      userDataToFullfill[i].href = `${text}`;
    } else {
      userDataToFullfill[i].textContent = `${text}`;
    }
  }
}
