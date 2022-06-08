const t0 = performance.now();
console.log("TTS Script connected");
let synth = window.speechSynthesis
var msg = new SpeechSynthesisUtterance("hello");
var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
let patientText = patientName.outerText.toString();
const question = document.querySelectorAll(".question");
let domArray = [];
let result = []
let voices = [];
let boundary = document.querySelector(".next");
let nextButton = document.querySelector(".proxyNext");
let newQuestion = document.querySelector(".newQuestion");
console.log(question)

// For Highlight 
let wordIndex = 0;
let globalWords = [];
let pageText = $('body').text().trim().replace(/\n/g, '')
console.log(pageText)

// Highlight pt 2 
const highlightBackground = sample => `<span style="background-color:yellow;">${sample}</span>`
const highlight = (text, from, to) => {
  let replacement = highlightBackground(text.slice(from, to))
  return text.substring(0, from) + replacement + text.substring(to)
}


window.speechSynthesis.addEventListener('voiceschanged', function () {
  voices = window.speechSynthesis.getVoices();
  // console.log(voices)
})


// Update speech function to be less specific by 
// Pass through html element to function so that it can read it 
// Also have highlight function so it highlights at same time and same text
let text = document.getElementById("text");
let originalText = text.innerText;

const speakAll = (text) => {
  return new Promise(resolve => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.voice = voices.find(voice => voice.lang === 'en-US')
    speech.rate = .75
    window.speechSynthesis.speak(speech) 
speech.addEventListener('end', () => {
      console.log('stopped speaking')
      // window.speechSynthesis.pause()
      resolve()
    });
    speech.addEventListener('boundary', (e) => {
      let words = e.target.text.substr(e.charIndex).match(/^.+?\b/)[0]
      console.log(words)
  });

    speech.addEventListener('boundary', (event) => {
      const { charIndex, charLength } = event
      text.innerHTML = highlight(originalText, charIndex, charIndex + charLength)

    });

  });
}

const playSpeech = async () => {
  speakAll(pageText)
  
}

playButton.addEventListener("click", function (event) {
  event.preventDefault();
   playSpeech();
   console.log(text)
})



newQuestion.addEventListener("click", function (event) {
  window.speechSynthesis.resume()
  event.preventDefault();
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
  synth.cancel()
});



const t1 = performance.now();

console.log(`Call to finish script took ${t1 - t0} milliseconds.`);

console.log(JSON.stringify(window.performance.memory, ['totalJSHeapSize', 'usedJSHeapSize', 'jsHeapSizeLimit']));

 