const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}
// varible for counting the times
var count=0;




// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += '<div>That is not a valid number</div>';
    return;
  }

  // Check in range

  if (num > 100 || num < 1) {
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    count++;
    document.getElementById("count").innerHTML ="Attempts = "+count;


  }

  // Check number
  else if(num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>

    `;
  } else if (num > randomNum) {
    count++;
    msgEl.innerHTML += '<div>GO LOWER</div>';
    document.getElementById("count").innerHTML ="Attempts = "+count;
    if(count>5){
      document.getElementById("hintP").innerHTML ="Hint:Try To find Mid value every time(use binary Search approch) "
    }

  } else {
    count++;
    msgEl.innerHTML += '<div>GO HIGHER</div>';
    document.getElementById("count").innerHTML ="Attempts = "+count;
    if(count>5){
      document.getElementById("hintP").innerHTML ="Hint: Try To find Mid value every time(use binary Search approch) "
    }

  }

}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak);

// End SR service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }


});
