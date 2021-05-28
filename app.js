import { questions } from "./ques.js"

const startBtn = document.querySelector(".start-btn")
const startInfoBtn = document.querySelector(".info-start")
const quitBtns = document.querySelectorAll(".quit")
const nextBtn = document.querySelector(".next")
const infos = document.querySelector(".infos")
const quizBox = document.querySelector(".quiz-box")
const ques = document.querySelector(".ques")
const options = document.querySelectorAll(".option")
const ques_no = document.querySelector(".total-ques span p")
const finishBox = document.querySelector(".finish-box")
const timeLeft = document.querySelector(".time")
const timeLine = document.querySelector(".time-line")

let index = 0
let timePerQues = 15
startBtn.addEventListener("click", () => {
  infos.classList.add("active")
})
quitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    finishBox.classList.remove("active")
    infos.classList.remove("active")
  })
})

startInfoBtn.addEventListener("click", () => {
  infos.classList.remove("active")
  quizBox.classList.add("active")
  nextQues(index)
  index++
})

nextBtn.addEventListener("click", () => {
  if (index === questions.length - 1) {
    nextBtn.textContent = "Finish Quiz"
    nextQues(index)
    index++
  } else if (index === questions.length) {
    document.querySelector(".score").textContent = score
    finishBox.classList.add("active")
    quizBox.classList.remove("active")
    clearInterval(counter)
    clearInterval(counterLine)
    nextBtn.textContent = "Next Ques"
    index = 0
    score = 0
  } else {
    nextQues(index)
    index++
  }
})

let correctAns = "op1"
let correct = `<i class="far fa-check-circle correct"></i>`
let wrong = `<i class="far fa-times-circle wrong"></i>`

let score = 0

function nextQues(index) {
  clearInterval(counter)
  clearInterval(counterLine)
  startTimer(timePerQues)
  startTimerLine(timePerQues)
  document.querySelector(".options").classList.remove("removePointerEvents")
  if (index >= questions.length) return
  ques.textContent = questions[index].ques
  for (let i = 0; i < options.length; i++) {
    options[i].textContent = questions[index].options["op" + (i + 1)]
  }
  ques_no.textContent = index + 1
  correctAns = questions[index].correct_option
}

let userSelectedAns

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    clearInterval(counter)
    clearInterval(counterLine)
    userSelectedAns = e.target.classList[1]
    if (correctAns === userSelectedAns) {
      console.log("yo win")
      score++
      option.innerHTML += correct
    } else {
      document.querySelector("." + correctAns).innerHTML += correct
      option.innerHTML += wrong
    }
    document.querySelector(".options").classList.add("removePointerEvents")
  })
})
let counter = 0
function startTimer(time) {
  counter = setInterval(timer, 1000)
  timeLeft.textContent = time + "s"
  function timer() {
    time--
    if (time >= 0 && time <= 9) {
      timeLeft.textContent = "0" + time + "s"
    } else if (time > 9) {
      timeLeft.textContent = time + "s"
    } else {
      nextBtn.click()
    }
  }
}
let counterLine
function startTimerLine(time) {
  let linePercent = 100
  counterLine = setInterval(lineTimer, (time / 100) * 1000)

  function lineTimer() {
    linePercent -= 1
    timeLine.style.width = linePercent + "%"
  }
}
