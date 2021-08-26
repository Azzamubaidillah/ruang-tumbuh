const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Apa kamu suka bersosialisasi?',
        choice1: 'saya ingin menghindar',
        choice2: 'saya senang sendiri',
        choice3: 'ya saya senang keluar',
        choice4: 'ya jika dengan orang yang saya kenal',
        answer: 2,
    },
    {
        question:"Apa peran kamu dalam keluarga?",
        choice1: "si pendiam",
        choice2: "orang yang sensibel",
        choice3: "bahagia / tukang sosial",
        choice4: "tidak punya peran",
        answer: 1,
    },
    {
        question: "Mana yang paling sesuai menurut kamu?",
        choice1: "hidup adalah perjuangan dan setelah berjuang lebih banyak bertahan hidup, akhirnya mati",
        choice2: "masa masa sulit mengungkapkan siapa teman sejati",
        choice3: "kekhawatiran lebih produktif dari kunyahan permen karet",
        choice4: "selalu melihat sisi terang dalam kehidupan",
        answer: 3,
    },
    {
        question: "Bagaimana kamu menghabiskan waktu luang?",
        choice1: "mendengarkan musik",
        choice2: "bertemu teman dan saudara ",
        choice3: "memikirkan sesuatu",
        choice4: "saya senang menonton film horror",
        answer: 1,
    }, 
    {
        question: "Apakah kamu dikontrol oleh emosi mu?",
        choice1: "ya, bisa dibilang seperti itu",
        choice2: "saya tidak terlalu punya emosi",
        choice3: "sering, setiap saat",
        choice4: "tidak seperti itu",
        answer: 3,
    }, 
    {
        question: "Apa kamu berpikir kamu punya masalah kesehatan mental?",
        choice1: "saya merasa akhir akhir ini selalu bersedih",
        choice2: "saya khawatir bahwa saya terlalu cemas",
        choice3: "saya rasa saya anti sosial",
        choice4: "saya rasa tidak",
        answer: 3,
    }, 
    {
        question: "Bagaimana orang lain mendeskripsikan kamu?",
        choice1: "bahagia",
        choice2: "tidak bahagia",
        choice3: "canggung bersosialisasi",
        choice4: "dingin",
        answer: 3,
    }, 
    {
        question: "Pilih salah satu harapan dibawah ini",
        choice1: "lebih menjadi diri sendiri ",
        choice2: "selalu bahagia seperti ini",
        choice3: "dapat berhenti khawatir",
        choice4: "tidak merasa puas",
        answer: 3,
    }, 
    {
        question: "Apa kamu mencintai kehidupanmu?",
        choice1: "tidak terlalu",
        choice2: "ya, saya mencintai hidup saya ",
        choice3: "ya, tapi saya berharap lebih mudah dari ini ",
        choice4: "saya sedang mencoba untuk mencintai kehidupan saya",
        answer: 3,
    }, 
    {
        question: "Mana yang paling sesuai menurut kamu?",
        choice1: "hidup adalah perjuangan dan setelah berjuang lebih banyak bertahan hidup, akhirnya mati ",
        choice2: "masa masa sulit mengungkapkan siapa teman sejati",
        choice3: "kekhawatiran lebih produktif dari kunyahan permen karet",
        choice4: "selalu melihat sisi terang dalam kehidupan",
        answer: 3,
    }
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../test_kesepian/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 0)
    })
})

incrementScore = num => {
    score +=num
}

startGame()