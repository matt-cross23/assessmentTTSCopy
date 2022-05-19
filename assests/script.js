console.log("TTS Script connected");
var synth = window.speechSynthesis;
console.log(synth);
var msg = new SpeechSynthesisUtterance("hello");
var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
let patientText = patientName.outerText.toString();
const question = document.querySelectorAll(".question");
let result = [];
let boundary = document.querySelector(".next");
let paragraphs = document.querySelectorAll("p");
let nextButton = document.querySelector(".proxyNext");
let newQuestion = document.querySelector(".newQuestion");

const questionObject = {
  utterance1: new SpeechSynthesisUtterance(question[0].textContent),
  utterance2: new SpeechSynthesisUtterance(question[1].textContent),
  utterance3: new SpeechSynthesisUtterance(question[2].textContent),
  utterance3: new SpeechSynthesisUtterance(question[3].textContent),
  utterance4: new SpeechSynthesisUtterance(question[4].textContent),
  utterance5: new SpeechSynthesisUtterance(question[5].textContent),
  utterance6: new SpeechSynthesisUtterance(question[6].textContent),
  utterance7: new SpeechSynthesisUtterance(question[7].textContent),
  utterance8: new SpeechSynthesisUtterance(question[8].textContent),
  utterance9: new SpeechSynthesisUtterance(question[9].textContent),
  utterance10: new SpeechSynthesisUtterance(question[10].textContent),
  utterance11: new SpeechSynthesisUtterance(question[11].textContent),
  utterance12: new SpeechSynthesisUtterance(question[12].textContent),
  utterance13: new SpeechSynthesisUtterance(question[13].textContent),
  utterance14: new SpeechSynthesisUtterance(question[14].textContent),
  utterance15: new SpeechSynthesisUtterance(question[15].textContent),
  utterance16: new SpeechSynthesisUtterance(question[16].textContent),
  utterance17: new SpeechSynthesisUtterance(question[17].textContent),
  utterance18: new SpeechSynthesisUtterance(question[18].textContent),
  utterance19: new SpeechSynthesisUtterance(question[19].textContent),
  utterance20: new SpeechSynthesisUtterance(question[20].textContent),
  utterParagraph: new SpeechSynthesisUtterance(paragraphs[20].textContent),
  utterParagraph2: new SpeechSynthesisUtterance(paragraphs[21].textContent),
  utterParagraph3: new SpeechSynthesisUtterance(paragraphs[22].textContent),
};
console.log(questionObject);

var utterThis = new SpeechSynthesisUtterance(question[0].textContent);
var utterQueue = new SpeechSynthesisUtterance(question[1].textContent);
utterQueue.rate = 5
utterThis.rate = 5

console.log(paragraphs);

function speak() {
  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }
  utterThis.onstart = function (event) {
    console.log(
      "We have started uttering this speech: " + event.utterance.text
    );
  };

  if (utterThis.value !== "") {
    console.log(utterThis);
    console.log(utterQueue)
    utterThis.onstart = function (event) {
      let pending = synth.pending;
      console.log("The Queue is " + pending);
    };
  }
  utterThis.onend = function (event) {
    console.log("SpeechSynthesisUtterance.onend" + event.elapsedTime);
  };
  utterThis.onerror = function (event) {
    console.error("SpeechSynthesisUtterance.onerror");
  };
}
speak();

playButton.addEventListener("click", function (event) {
  event.preventDefault();
  synth.speak(utterThis);
  console.log(utterThis);
});

newQuestion.addEventListener("click", function (event) {
  event.preventDefault();
  synth.speak(utterQueue);
});

nextButton.addEventListener('touchstart', function(event){
  event.preventDefault;
  synth.speak(utterQueue);
  window.alert('touch event works');
});



// Pause
document.querySelector("#pause").addEventListener("click", () => {
  window.speechSynthesis.pause();
});
// Resume
document.querySelector("#resume").addEventListener("click", () => {
  window.speechSynthesis.resume();
});

// Cancel
document.querySelector("#cancelVoice").addEventListener("click", () => {
  window.speechSynthesis.cancel();
});
