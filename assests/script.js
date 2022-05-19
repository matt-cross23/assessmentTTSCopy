console.log("TTS Script connected");
var synth = window.speechSynthesis;
console.log(synth)
var msg = new SpeechSynthesisUtterance('hello')

var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
let patientText = patientName.outerText.toString();
const question = document.querySelectorAll(".question");
let result = [];
let boundary = document.querySelector(".next");
let paragraphs = document.querySelectorAll("p");
let nextButton = document.querySelector(".proxyNext");


window.speechSynthesis.speak(msg)

console.log(paragraphs);

function speak() {
    if (synth.speaking) {
        console.error("speechSynthesis.speaking");
        return;
      }
      if (patientText.value !== "") {
        var utterThis = new SpeechSynthesisUtterance('Test');
        // var utterQueue = new SpeechSynthesisUtterance(question[1].textContent);
        console.log(utterThis);
        // console.log(utterQueue)
        utterThis.onstart = function (event) {
          let pending = synth.pending;
          console.log("The Queue is " + pending);
        };
    }
    utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend " + event.elapsedTime);
        if ((pending = true)) {
          synth.pause();
        }
      };
      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };
    } 
    window.speechSynthesis.speak(msg)

    playButton.addEventListener("click", function (event) {
      console.log("speaking text");
      synth.speak(msg)
      event.preventDefault();
    });