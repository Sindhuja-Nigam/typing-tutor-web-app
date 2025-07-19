const typingText = document.querySelector(".typing-text p"),
  inpField = document.querySelector(".input-field"),
  mistakeTag = document.querySelector(".mistake span b"),
  timeTag = document.querySelector(".time span b"),
  wpmTag = document.querySelector(".wpm span b"),
  cpmTag = document.querySelector(".cpm span b");

let timer,
  maxTime = 60,
  timeLeft = maxTime,
  charIndex = 0,
  mistakes = 0,
  isTyping = false;

function loadParagraph() {
  const randIndex = Math.floor(Math.random() * typingParagraphs.length);
  typingText.innerHTML = "";
  typingParagraphs[randIndex].split("").forEach((char) => {
    const span = `<span>${char}</span>`;
    typingText.innerHTML += span;
  });
  typingText.querySelector("span").classList.add("active");
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
  const characters = typingText.querySelectorAll("span");
  const typedChar = inpField.value[charIndex];

  if (!isTyping) {
    timer = setInterval(initTimer, 1000);
    isTyping = true;
  }

  if (charIndex < characters.length - 1 && timeLeft > 0) {
    if (typedChar == null) {
      return;
    }

    if (characters[charIndex].innerText === typedChar) {
      characters[charIndex].classList.add("correct");
    } else {
      mistakes++;
      characters[charIndex].classList.add("incorrect");
    }
    characters[charIndex].classList.remove("active");
    charIndex++;
    characters[charIndex].classList.add("active");

    mistakeTag.innerText = mistakes;
    updateWPM_CPM();
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
    updateWPM_CPM();
  } else {
    clearInterval(timer);
    inpField.value = "";
  }
}

function updateWPM_CPM() {
  const timeSpent = maxTime - timeLeft;
  const wpm = Math.round(((charIndex - mistakes) / 5) / (timeSpent / 60));
  const cpm = Math.round((charIndex - mistakes) / (timeSpent / 60));

  wpmTag.innerText = wpm > 0 ? wpm : 0;
  cpmTag.innerText = cpm > 0 ? cpm : 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
