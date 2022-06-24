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
// Highlights text function 
const highlight = (text, from, to) => {
  let replacement = highlightBackground(text.slice(from, to));
  return text.substring(0, from) + replacement + text.substring(to);
};
const highlightBackground = (sample) =>
  `<span class='highlighted'style="background-color:red;">${sample}</span>`;

// Highlights one 
const questionButton = $('#questionButton')[0];
$('#questionButton').on('click',function(event){
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  let $pTag = $('#paragraph1');
  let $answers = $('.answers')[0];
  console.log($answers)
  console.log($answers.innerText)
  console.log($pTag.text())
  let originalText = $pTag.text() 
  // + $answers.innerText; 
  let utterance = new SpeechSynthesisUtterance(originalText);
    // Line that is changing html into just text
  utterance.addEventListener('end', (event) => {
    console.log($answers)

})
  utterance.addEventListener("boundary", (event) => { 
    const { charIndex, charLength } = event;
    //document.body.querySelector('#paragraph1').innerHTML =
    $pTag.html( highlight(
      originalText,
      charIndex,
      charIndex + charLength
    ));
  });
  utterance.voice = voices[1]
  synth.speak(utterance);
  
});

// Instead of #play, change to play attribute
$('[play]').on('click', function(event){
  event.preventDefault();
  let $readBlock = $(this).closest('[read-block-container]').find('[read-block]');
  console.log($readBlock)
 $readBlock.each(function(index){
  // console.log( index + ": " + $( this ).text());
  // Do we need to index the read blocks?
  let readblockElement = $(this);
  let readBlockText = readblockElement.text();
  console.log(readBlockText)
  let originalText = readBlockText;
  let utterance = new SpeechSynthesisUtterance(originalText);
  utterance.addEventListener("boundary", (event) => { 
    const { charIndex, charLength } = event;
    //document.body.querySelector('#paragraph1').innerHTML =
    readblockElement.html(highlight(
      originalText,
      charIndex,
      charIndex + charLength
    ));
  });
  utterance.addEventListener("end", (event) => {
    readblockElement.html(readBlockText)
  })
  // utterance.voice = 1
  utterance.voice = voices[0]
  synth.speak(utterance);
});
 })
// Read block container should have all Readable content inside
// Button should be inside of the container but putside of read-block
// Read block should not have nested HTML elements
// Blocks should only have text and containers have all of the reading blocks within them
// Play button for each question 
// Play pause cancel on every question 
// drop down of voices and sliding scale for rate globally for Demo 
// Read and highlight individually question and once done reading alert 
$('.proxyNext').on('click', function(event) {
  event.preventDefault();
  let $readBlock = $('.speechwrapper').closest('[read-block-container]').find('[read-block]');
  console.log($readBlock);
$( "<button type='button' class = 'readQuestion'>Press to Read Question </button>" ).appendTo($readBlock);
$('.readQuestion').on('click', function(event) {
})
})