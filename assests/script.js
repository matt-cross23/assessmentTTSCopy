console.log("TTS Script connected");
var synth = window.speechSynthesis;
console.log(synth);
var msg = new SpeechSynthesisUtterance("hello");
var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
let patientText = patientName.outerText.toString();
const question = document.querySelectorAll(".question");
let result = [];
let voices = [];
let boundary = document.querySelector(".next");
let paragraphs = document.querySelectorAll("p");
let nextButton = document.querySelector(".proxyNext");
let newQuestion = document.querySelector(".newQuestion");
console.log(question)


window.speechSynthesis.addEventListener('voiceschanged', function(){
  voices = window.speechSynthesis.getVoices();
  console.log(voices)
})
function highlightContent() {
  let highlightArray = [];
  for (let i = 0; i < paragraphs.length; i++) {
    highlightArray.push(paragraphs[i].innerHTML);
    for (let j = 0; j < highlightArray.length; j++) {
      paragraphs[i].classList.add("mark");
    }
  }
}



console.log(paragraphs);

// Update speech function to be less specific by 
// Pass through html element to function so that it can read it 
// Also have highlight function so it highlights at same time and same text

const speakAll = (text) => {
  return new Promise(resolve => {
  const speech = new SpeechSynthesisUtterance(text)
  speech.voice = voices.find(voice => voice.lang === 'en-US')
  speech.rate = 9
  window.speechSynthesis.speak(speech)
  speech.addEventListener('start', ()=> {
    console.log('start speaking')
  });

  speech.addEventListener('end', ()=> {
    console.log('stopped speaking')
    window.speechSynthesis.pause()
    resolve()
  });
});
};

const playSpeech = async () => {
  speakAll(question[0].textContent)
 await Promise.all([
   speakAll(question[1].textContent),
   speakAll(question[2].textContent),
   speakAll(question[3].textContent),
   speakAll(question[4].textContent),
   speakAll(question[5].textContent),
   speakAll(question[6].textContent),
   speakAll(question[7].textContent),
   speakAll(question[8].textContent),
   speakAll(question[9].textContent),
   speakAll(question[10].textContent),
   speakAll(question[11].textContent),
   speakAll(question[12].textContent),
   speakAll(question[13].textContent),
   speakAll(question[14].textContent),
   speakAll(question[15].textContent),
   speakAll(question[16].textContent),
   speakAll(question[17].textContent),
   speakAll(question[18].textContent),
   speakAll(question[19].textContent),

])}
playButton.addEventListener("click", function (event) {
  playSpeech()
  highlightContent()
  event.preventDefault();
  })

newQuestion.addEventListener("click", function (event) {
window.speechSynthesis.resume()
  event.preventDefault();
});

// nextButton.addEventListener('touchstart', function(event){
//   event.preventDefault;
//   synth.speak(utterQueue);
//   window.alert('touch event works');
// });



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


