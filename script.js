const button = document.getElementById("btn");
const audioElement = document.getElementById("audio");
const jokeText = document.querySelector(".jokeText");
let joke = "";

// Disable enable button
const toggleButton = function () {
  button.disabled = !button.disabled;
};

// Pass joke to VoiceRSS
function tellMe(joke) {
  console.log(joke);
  VoiceRSS.speech({
    key: "bf948319168047ff9b61fcf71ee6735d",
    src: `${joke}`,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Joke API
const getJoke = async function () {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;
    // console.log(`This is the joke: "${joke}"`);
    tellMe(joke);
    // Disable button
    toggleButton();
    displayJokeText();
  } catch (e) {
    console.error("God, no, no, nooooo!", e.message);
  }
};

function displayJokeText() {
  jokeText.innerHTML = joke;
}

// Event Listeners
audioElement.addEventListener("ended", toggleButton);
button.addEventListener("click", getJoke);

// Dark/light mode implementation
const toggleSwitch = document.querySelector("input[type='checkbox']");
const body = document.querySelector("body");
const mainContainer = document.querySelector(".main_container");
const toggleIcon = document.querySelector("#toggle_icon");

// Switch Theme Dynamically

const darkMode = function () {
  console.log(toggleIcon.children);
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  // toggleIcon.children[1].classList.add("fa-moon");
};
const lightMode = function () {
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  // toggleIcon.children[1].classList.add("fa-sun");
};

const switchTheme = function (e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    darkMode();
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    lightMode();
  }
};

// Event Listeners
toggleSwitch.addEventListener("change", switchTheme);

// Local Storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}
