const typingText = document.querySelector(".typing-text p"),
      inpField = document.querySelector(".wrapper .input-field"),
      timeTag = document.querySelector(".time span b"),
      mistakeTag = document.querySelector(".mistake span"),
      wpmTag = document.querySelector(".wpm span"),
      cpmTag = document.querySelector(".cpm span"),
      tryAgainbtn = document.querySelector("button");

let timer, maxTime = 60, timeLeft = maxTime, charIndex = 0, mistakes = 0, isTyping = false;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if (charIndex < characters.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            charIndex--;
            if (characters[charIndex] && characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            if (characters[charIndex]) {
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex] && characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                if (characters[charIndex]) {
                    characters[charIndex].classList.add("incorrect");
                }
            }
            charIndex++;
        }

        characters.forEach(span => {
            span.classList.remove("active");
        });
        if (characters[charIndex]) {
            characters[charIndex].classList.add("active");
        }

        if (charIndex >= characters.length) {
            clearInterval(timer);
            document.getElementById('message').textContent = "You've completed in time!";
            inpField.value = ""; 
            return;
        }

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        mistakeTag.innerText = mistakes;
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        inpField.value = "";
        clearInterval(timer);
        if (charIndex < characters.length) {
            document.getElementById('message').textContent = "Time is over! Try Again";
        }
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
        document.getElementById('message').textContent = "Time is over! Try Again";
        inpField.value = "";
    }
}

function resetSet() {
    randomParagraph();
    inpField.value = ""; 
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    document.getElementById('message').textContent = "";
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainbtn.addEventListener("click", resetSet);
