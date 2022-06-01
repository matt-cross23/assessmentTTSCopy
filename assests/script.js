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
let pageText = $('body').text()

// 
for(let i = 0; i < question.length; i++){
result.push(question[i].textContent)

}
console.log(result)


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
    speech.rate = 1.5
    window.speechSynthesis.speak(speech)
    // if(speechSynthesis.speak){
    // Add notification if api is already speaking
    // });    
//     speech.addEventListener('boundary', (event) => {
//       // First let's get all text nodes in the page.
// const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, function(node) {
//   return (node.innerText !== ' ') ?
//   NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
// } );
// console.log(treeWalker)
// const allTextNodes = [];
// let currentNode = treeWalker.nextNode();
// while (currentNode) {
//   // There may also be hidden text nodes in the page
//   // like text inside a <script> tag. So ignore those.
//   if (getComputedStyle(currentNode.parentNode).display !== 'none') {
//     allTextNodes.push(currentNode);
//   }
//   currentNode = treeWalker.nextNode();
// }

// // Then, loop through them, every time splitting them into
// // individual words, and creating a list of words per node.
// const allWords = [];
// for (const textNode of allTextNodes) {
//   for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
//     allWords.push({
//       word: word[0],
//       parentNode: textNode,
//       offset: word.index
//     });
//   }
// }
// console.log(allWords);

// // Finally, loop through the words and highlight them one by
// // one by creating a Range and Selection object.
// let index = 0;
// const range = new Range();
// setInterval(() => {
//   if (index >= allWords.length) {
//     index = 0;
//   }
//   const {word, parentNode, offset} = allWords[index];
//   console.log('the word is ' + word)
//   console.log(parentNode) 
//   console.log(offset)
//   range.setStart(parentNode, offset);
//   range.setEnd(parentNode, offset + word.length);
//   document.getSelection().addRange(range);
  
//   index++;
//   console.log(event.charIndex)
// }, 500);
  // });

    speech.addEventListener('end', () => {
      console.log('stopped speaking')
      // window.speechSynthesis.pause()
      resolve()
    });
    speech.addEventListener('onboundary',(event) => {
      let e = question;
      let word = getWordAt(e.value, event.charIndex);
          question.innerHTML = word

    })
  });
};

const playSpeech = async () => {
  speakAll(pageText)
  
}

playButton.addEventListener("click", function (event) {
  event.preventDefault();
   playSpeech();
   let text = pageText.split(' ');
   globalWords = text
   console.log(globalWords)


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

const t1 = performance.now();

console.log(`Call to finish script took ${t1 - t0} milliseconds.`);

console.log(JSON.stringify(window.performance.memory, ['totalJSHeapSize', 'usedJSHeapSize', 'jsHeapSizeLimit']));
