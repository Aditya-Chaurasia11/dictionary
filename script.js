const mic = document.getElementById("mic");
const speech = document.getElementById("speechToText");
const submit = document.querySelector("form");
const container = document.getElementById("content");
mic.addEventListener("click", function record() {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.onresult = function (event) {
    speech.value = event.results[0][0].transcript;
  };
  recognition.start();
});
submit.addEventListener("submit", function (event) {
  event.preventDefault();
  getMeaning(speech.value);
//   console.log(speech.value);
});
const getMeaning = async (word) => {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const ans = await response.json();
    return addhtml(ans);
  } catch (error) {
    content.innerHTML = `<h2> No data found</h2>`;
    return;
  }
};

const addhtml = (data) => {
  if (data.cod == "404") {
    content.innerHTML = `<h2> No data found</h2>`;
    return;
  }
  content.innerHTML = `${data[0].meanings[0].definitions[0].definition}`;
};

