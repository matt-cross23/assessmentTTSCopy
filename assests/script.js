const t0 = performance.now();
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
let globalWords = [];
let boundary = document.querySelector(".next");
let nextButton = document.querySelector(".proxyNext");
let newQuestion = document.querySelector(".newQuestion");
let startHighlight = document.querySelector('#startAssessment')
console.log(question)



function highlightContent(){

// First let's get all text nodes in the page.
const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const allTextNodes = [];
console.log(treeWalker)
let currentNode = treeWalker.nextNode();
while (currentNode) {
  // There may also be hidden text nodes in the page
  // like text inside a <script> tag. So ignore those.
  if (getComputedStyle(currentNode.parentNode).display !== 'none') {
    allTextNodes.push(currentNode);
  }
  currentNode = treeWalker.nextNode();
}
console.log(allTextNodes)

// Then, loop through them, every time splitting them into
// individual words, and creating a list of words per node.
const allWords = [];
for (const textNode of allTextNodes) {
  for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
    allWords.push({
      word: word[0],
      parentNode: textNode,
      offset: word.index
    });
  }
}

// Finally, loop through the words and highlight them one by
// one by creating a Range and Selection object.
let index = 0;
const range = new Range();



setInterval(() => {
  if (index >= allWords.length) {
    index = 0;
  }
  const {word, parentNode, offset} = allWords[index];
  // parentNode, offset original range
  console.log(parentNode);
  range.setStart(parentNode, offset);
  range.setEnd(parentNode, offset + word.length);
  document.getSelection().removeAllRanges();
  document.getSelection().addRange(range);
  index++;
}, 325);
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
      let e = document.getElementByClass('mark')
    })
    speech.addEventListener('end', () => {
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
  ])
}

playButton.addEventListener("click", function (event) {
  playSpeech();
   highlightContent();
  event.preventDefault();
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

// async function run() {
//   const result = await performance.measureUserAgentSpecificMemory();
//   console.log(result);
// }
// run();