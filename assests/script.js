const t0 = performance.now();
console.log("TTS Script connected");
let synth = window.speechSynthesis
var msg = new SpeechSynthesisUtterance("hello");
var playButton = document.querySelector("#play");
const patientName = document.querySelector(".patientname");
const question = document.querySelectorAll(".question");
var voices = synth.getVoices();
let result = [];
let boundary = document.querySelector(".next");
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  console.log(voices)
};

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

// btn &&
//   btn.addEventListener("click", (event) => {
//     event.preventDefault()
//     const synth = window.speechSynthesis;
//     if (!synth) {
//       console.error("no tts");
//       return;
//     }
//     let text = document.getElementById("text");
//     console.log(text)
//     let originalText = text.innerText;
//     console.log(originalText)
//     let utterance = new SpeechSynthesisUtterance(originalText);
//     utterance.addEventListener("boundary", (event) => {
//       const { charIndex, charLength } = event;
//       text.innerHTML = highlight(
//         originalText,
//         charIndex,
//         charIndex + charLength
//       );
//     });
//     synth.speak(utterance);
//   });
//  Keep track of each div and tag .text function to get the text 

const questionButton = $('#questionButton')[0];
$('#questionButton').on('click',function(event){
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  let pTag = $('#paragraph1');
  console.log(pTag)
  let originalText = pTag.text();  
  let utterance = new SpeechSynthesisUtterance(originalText);
    // Line that is changing html into just text
  utterance.addEventListener('end', (event) => {
    let $answers = $('.answers')[0];
    console.log($answers)
    let answerObject = $('.answersbutton');
    console.log(answerObject)
    window.alert('done')
  })
  utterance.addEventListener("boundary", (event) => { 
    const { charIndex, charLength } = event;
    //document.body.querySelector('#paragraph1').innerHTML =
    pTag.html( highlight(
      originalText,
      charIndex,
      charIndex + charLength
    ));
  });

  synth.speak(utterance);
 
});


$('#play').on('click', function(event){
  event.preventDefault();
  let $readBlock = $('.proxyNext').closest('[read-block-container]').find('[read-block]');
  console.log($readBlock)
  let readBlocks = $(this).closest('[read-block-container]').find('[read-block]');
  console.log(readBlocks)
 $readBlock.each(function(index){
  // console.log( index + ": " + $( this ).text());
  // Do we need to index the read blocks?
  let readBlockText = $( this ).text();
  console.log(readBlockText)
  let originalText = readBlockText;
  let utterance = new SpeechSynthesisUtterance(originalText);
  utterance.addEventListener("boundary", (event) => { 
    const { charIndex, charLength } = event;
    //document.body.querySelector('#paragraph1').innerHTML =
    $readBlock.html(highlight(
      originalText,
      charIndex,
      charIndex + charLength
    ));
  });
  // utterance.voice = 1
  utterance.voice = voices[0]
  synth.speak(utterance);
});
 })

// Read and highlight individually question and once done reading alert 
$('.proxyNext').on('click', function(event) {
  event.preventDefault();
  let $readBlock = $('.proxyNext').closest('[read-block-container]').find('[read-block]');
  console.log($readBlock);
$( "<button type='button' readQuestion>Press to Read Question </button>" ).appendTo($readBlock);
})