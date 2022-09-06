const button = document.getElementById("btn");
const audioElement = document.getElementById("audio");

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
  let joke = "";
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
  } catch (e) {
    console.error("God, no, no, nooooo!", e.message);
  }
};

// Event Listeners
audioElement.addEventListener("ended", toggleButton);
button.addEventListener("click", getJoke);
