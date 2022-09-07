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
  const html = `${joke}`;
  jokeText.innerHTML = joke;
}

// Event Listeners
audioElement.addEventListener("ended", toggleButton);
button.addEventListener("click", getJoke);

// Dark/light mode implementation
let darkMode = false;
const toggleSwitch = document.querySelector("input[type='checkbox']");
const body = document.querySelector("body");
const mainContainer = document.querySelector(".main_container");

// Switch Theme Dynamically

const switchTheme = function (e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  // e.preventDefault();
  // darkMode = e.target.checked ? true : false;
  // console.log(`darkMode is ${darkMode}`);
  // body.classList.toggle("dark_bgk");
  // mainContainer.classList.toggle("dark_mode_container");
  // console.log("changed");
  // console.log(`darkMode is ${darkMode}`);
};

// Event Listeners
toggleSwitch.addEventListener("change", switchTheme);
