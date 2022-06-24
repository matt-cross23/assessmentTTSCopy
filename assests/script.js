// Read block container should have all Readable content inside
// Button should be inside of the container but outside of read-block
// Read block should not have nested HTML elements
// Blocks should only have text and containers have all of the reading blocks within them
// Play button for each question 
// Play pause cancel on every question 
// drop down of voices and sliding scale for rate globally for Demo 
// Read and highlight individually question and once done reading alert const t0 = performance.now();
console.log("TTS Script connected");
let synth = window.speechSynthesis
var voices = synth.getVoices();
let result = [];
window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  console.log(voices)
};

// Pause
$("[pause]").on("click", () => {
  window.speechSynthesis.pause();
});
// Resume
$("[resume]").on("click", () => {
  window.speechSynthesis.resume();
});

// Cancel
$("[cancelVoice]").on("click", () => {
  synth.cancel()
});

const t1 = performance.now();

// Start of new code
const btn = document.getElementById("play");
// Highlights text function 
const highlight = (text, from, to) => {
  let replacement = highlightBackground(text.slice(from, to));
  return text.substring(0, from) + replacement + text.substring(to);
};
const highlightBackground = (sample) =>
  `<span class='highlighted'style="background-color:red;">${sample}</span>`;

// Instead of #play, change to play attribute
$('[play]').on('click', function (event) {
  event.preventDefault();
  let $readBlock = $(this).closest('[read-block-container]').find('[read-block]');
  console.log($readBlock)
  $readBlock.each(function (index) {
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
