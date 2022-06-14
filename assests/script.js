const t0 = performance.now();
console.log("TTS Script connected");
let synth = window.speechSynthesis
var msg = new SpeechSynthesisUtterance("hello");
var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
const question = document.querySelectorAll(".question");
let result = []
let voices = [];
let boundary = document.querySelector(".next");
// console.log(question)
// const question1 = document.querySelector('question');
// const questionText = question1.textContent;

// For Highlight 
let wordIndex = 0;
let globalWords = [];
let pageText = $('body').text().trim().replace(/\n/g, '')
// console.log(pageText)


window.speechSynthesis.addEventListener('voiceschanged', function () {
  voices = window.speechSynthesis.getVoices();
  // console.log(voices)
})

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

    // Find the spoken word  


    speech.addEventListener('boundary', (event) => {
      const { charIndex, charLength } = event;
      text.innerHTML = highlight(originalText, charIndex, charIndex + charLength)

    });

  });
}



for(let i = 0; i < question.length; i++){
  result.push(question[i].innerText)}


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


// Start of new code
const btn = document.getElementById("play");

const highlight = (text, from, to) => {
  let replacement = highlightBackground(text.slice(from, to));
  return text.substring(0, from) + replacement + text.substring(to);
};
const highlightBackground = (sample) =>
  `<span class='highlighted'style="background-color:red;">${sample}</span>`;

btn &&
  btn.addEventListener("click", (event) => {
    event.preventDefault()
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error("no tts");
      return;
    }
    let text = document.getElementById("text");
    console.log(text)
    let originalText = text.innerText;
    console.log(originalText)
    let utterance = new SpeechSynthesisUtterance(originalText);
    utterance.addEventListener("boundary", (event) => {
      const { charIndex, charLength } = event;
      text.innerHTML = highlight(
        originalText,
        charIndex,
        charIndex + charLength
      );
    });
    synth.speak(utterance);
  });
//  Keep track of each div and tag .text function to get the text 

const questionButton = $('#questionButton')[0];
$('#questionButton').on('click',function(event){
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  const pTag = $('#paragraph1');
  console.log(pTag)
  let pTagText = pTag.text();
  let originalText = pTagText
  let utterance = new SpeechSynthesisUtterance(originalText);
    // Line that is changing html into just text
  utterance.addEventListener('end', (event) => {
    window.alert('done')
  })
  utterance.addEventListener("boundary", (event) => {
    const { charIndex, charLength } = event;
    text.innerHTML += highlight(
      originalText,
      charIndex,
      charIndex + charLength
    );
  console.log('Highlighting this word ' + event.charIndex);
      console.log(text)
  });
 
  synth.speak(utterance);
});

// Read and highlight individually question and once done reading alert 
