// Read block container should have all Readable content inside
// Button should be inside of the container but outside of read-block
// Read block should not have nested HTML elements
// Blocks should only have text and containers have all of the reading blocks within them
// Play button for each question 
// Play pause cancel on every question 
// drop down of voices and sliding scale for rate globally for Demo 
// Read and highlight individually question and once done reading alert const t0 = performance.now();
console.log("TTS Script connected");
let result = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  console.log(voices)
};
// For rate and pitch
var synth = window.speechSynthesis;

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var voiceSelect = document.querySelector("select");

var pitch = document.querySelector("#pitch");
var pitchValue = document.querySelector(".pitch-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector(".rate-value");

var voices = [];

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
    const aname = a.name.toUpperCase(),
      bname = b.name.toUpperCase();
    if (aname < bname) return -1;
    else if (aname === bname) return 0;
    else return +1;
  });
  var selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";
  for (let i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

document.querySelector('#play').addEventListener('click', function speak() {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
    var utterThis = new SpeechSynthesisUtterance('Hello World, This is a text to speech script. Thank you for your time');
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
})

inputForm.onsubmit = function (event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
};

pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
  rateValue.textContent = rate.value;
};

voiceSelect.onchange = function () {
  speak();
};


// Pause
$("[pause]").on("click", () => {
  window.speechSynthesis.pause();
});
// Resume
$("[resume]").on("click", () => {
  window.speechSynthesis.resume();
});

// Cancel
$("[cancelVoice]").on("click", () => {
  synth.cancel()
});

const t1 = performance.now();

// Start of new code
const btn = document.getElementById("play");
// Highlights text function 
const highlight = (text, from, to) => {
  let replacement = highlightBackground(text.slice(from, to));
  return text.substring(0, from) + replacement + text.substring(to);
};
const highlightBackground = (sample) =>
  `<span class='highlighted'style="background-color:yellow;">${sample}</span>`;

// Instead of #play, change to play attribute
$('[play]').on('click', function (event) {
  event.preventDefault();
  let $readBlock = $(this).closest('[read-block-container]').find('[read-block]');
  console.log($readBlock)
  $readBlock.each(function (index) {
    // console.log( index + ": " + $( this ).text());
    // Do we need to index the read blocks?
    let readblockElement = $(this);
    let readBlockText = readblockElement.text();
    console.log(readBlockText)
    let originalText = readBlockText;
    let utterance = new SpeechSynthesisUtterance(originalText);
    utterance.addEventListener("boundary", (event) => {
      const { charIndex, charLength } = event;
      //document.body.querySelector('#paragraph1').innerHTML =
      readblockElement.html(highlight(
        originalText,
        charIndex,
        charIndex + charLength
      ));
    });
    utterance.addEventListener("end", (event) => {
      readblockElement.html(readBlockText)
    })
    // utterance.voice = 1
    utterance.voice = voices[0]
    synth.speak(utterance);
  });
})