const t0 = performance.now();
console.log("TTS Script connected");
let synth = window.speechSynthesis
var msg = new SpeechSynthesisUtterance("hello");
var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
let patientText = patientName.outerText.toString();
const question = document.querySelectorAll(".question");
let result = [];
let voices = [];
let boundary = document.querySelector(".next");
let nextButton = document.querySelector(".proxyNext");
let newQuestion = document.querySelector(".newQuestion");
console.log(question)
// For Highlight 
let wordIndex = 0;
let globalWords = [];
let pageText = $('body').text()
console.log(pageText)

// Get all 

function getWordAt(str, pos) {
  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;

  // Search for the word's beginning and end.
  var left = str.slice(0, pos + 1).search(/\S+$/),
      right = str.slice(pos).search(/\s/);

  // The last word in the string is a special case.
  if (right < 0) {
      return str.slice(left);
  }
  // Return the word, using the located bounds to extract it from the string.
  return str.slice(left, right + pos);
}


window.speechSynthesis.addEventListener('voiceschanged', function () {
  voices = window.speechSynthesis.getVoices();
  console.log(voices)
})



// Update speech function to be less specific by 
// Pass through html element to function so that it can read it 
// Also have highlight function so it highlights at same time and same text

const speakAll = (text) => {
  return new Promise(resolve => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.voice = voices.find(voice => voice.lang === 'en-US')
    speech.rate = 1.25
    window.speechSynthesis.speak(speech)
    // if(speechSynthesis.speak){
    // Add notification if api is already speaking
    // });    
    speech.addEventListener('boundary', (event) => {
     console.log("Character index is " + event.charIndex, "Name of boundary is " + event.name, "Elapsed time " + event.elapsedTime)
   var e = pageText
    var word = getWordAt(e.value,event.charIndex);
    // Show Speaking word : x
    document.getElementById("word").innerHTML = word;
    //Increase index of span to highlight
    console.info(globalWords[wordIndex]);

    try{
        document.getElementById("word_span_"+wordIndex).style.color = "blue";
    }catch(e){}

    wordIndex++;
    
});

    speech.addEventListener('end', () => {
      console.log('stopped speaking')
      // window.speechSynthesis.pause()
      resolve()
    });
  });
};

const playSpeech = async () => {
  speakAll(pageText)
  
}

playButton.addEventListener("click", function (event) {
  playSpeech();
  event.preventDefault();
  let text = pageText;
  let words = text.split(' ');
  spokenTextArray = words;
  console.log(spokenTextArray)
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

