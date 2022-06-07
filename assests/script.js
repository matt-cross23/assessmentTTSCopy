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
    speech.rate = .75
    window.speechSynthesis.speak(speech) 
   /* speech.addEventListener('boundary', (event) => {
      // First let's get all text nodes in the page.
const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, function(node) {
  return (node.innerText !== ' ') ?
  NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
});
// console.log(treeWalker)
const allTextNodes = [];
let currentNode = treeWalker.nextNode();
while (currentNode) {
  // There may also be hidden text nodes in the page
  // like text inside a <script> tag. So ignore those.
  if (getComputedStyle(currentNode.parentNode).display !== 'none') {
    allTextNodes.push(currentNode);
  }
  currentNode = treeWalker.nextNode();
}

// Then, loop through them, every time splitting them into
// individual words, and creating a list of words per node.
const allWords = [];
for (const textNode of allTextNodes) {
  for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
    allWords.push({
      word: word[0],
      parentNode: textNode,
      offset: word.index,
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
  
  range.setStart(parentNode, offset);
  range.setEnd(parentNode, offset + word.length);
  
  document.getSelection().addRange(range);
  index++;
  console.log(word)

}, 475);
});
*/

speech.addEventListener('end', () => {
      console.log('stopped speaking')
      // window.speechSynthesis.pause()
      resolve()
    });
    speech.addEventListener('boundary', (e) => {
      let words = e.target.text.substr(e.charIndex).match(/^.+?\b/)[0]
      console.log(words)
  });


  });
}

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



const t1 = performance.now();

console.log(`Call to finish script took ${t1 - t0} milliseconds.`);

console.log(JSON.stringify(window.performance.memory, ['totalJSHeapSize', 'usedJSHeapSize', 'jsHeapSizeLimit']));

   //   const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, function(node) {
    //     return (node.nodeValue.includes("\n    ")) ?
    //     NodeFilter.FILTER_REJECT: NodeFilter.FILTER_ACCEPT;
    //   });
    //   // console.log(treeWalker)
    //   const allTextNodes = [];
    //   let currentNode = treeWalker.nextNode();
    //   while (currentNode) {
    //     // There may also be hidden text nodes in the page
    //     // like text inside a <script> tag. So ignore those.
    //     if (getComputedStyle(currentNode.parentNode).display !== 'none') {
    //       allTextNodes.push(currentNode);
    //     }
    //     currentNode = treeWalker.nextNode();
    //   }
    // let textNodeHTML = allTextNodes[1].parentElement
    // console.log(allTextNodes[1].parentElement.outerHTML)
    // textNodeHTML.classList.add('mark');

    // setTimeout(() => {
    // textNodeHTML.classList.remove('mark')
    // },100)  