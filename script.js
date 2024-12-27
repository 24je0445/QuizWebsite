const adminPassword = "admin123"; // Admin password for login
let students = [];
let questions = [];

// Load students and questions from localStorage when the page loads
window.onload = function () {
    loadStudents();
    loadQuestions();
};

// Admin Login
function adminLogin() {
    const passwordInput = document.getElementById('adminPassword').value;
    if (passwordInput === adminPassword) {
        document.querySelector('.admin-login').style.display = 'none';
        document.querySelector('.admin-panel').style.display = 'block';
    } else {
        document.getElementById('adminError').innerText = 'Invalid Password';
    }
}

// Add Student
function addStudent() {
    const studentName = document.getElementById('studentName').value;
    const studentId = document.getElementById('studentId').value;
    const studentPassword = document.getElementById('studentPassword').value;

    if (studentName && studentId && studentPassword) {
        students.push({ name: studentName, id: studentId, password: studentPassword });
        updateStudentList();
        localStorage.setItem('students', JSON.stringify(students));
        document.getElementById('studentManagementForm').reset();
    } else {
        alert('Please fill out all fields to add a student.');
    }
}

// Update Student List
function updateStudentList() {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.innerText = `Name: ${student.name}, ID: ${student.id}`;
        studentList.appendChild(li);
    });
}

// Add Question
function addQuestion() {
    const questionText = document.getElementById('questionText').value;
    const options = document.getElementById('options').value.split(',');
    const correctAnswer = document.getElementById('correctAnswer').value;

    if (questionText && options.length >= 2 && correctAnswer) {
        questions.push({ question: questionText, options, correctAnswer });
        updateQuestionList();
        localStorage.setItem('questions', JSON.stringify(questions));
        document.getElementById('questionForm').reset();
    } else {
        alert('Please fill out all fields and provide at least two options.');
    }
}

// Update Question List
function updateQuestionList() {
    const questionList = document.getElementById('questionList');
    questionList.innerHTML = '';
    questions.forEach((q, index) => {
        const li = document.createElement('li');
        li.innerText = `Q${index + 1}: ${q.question}`;
        questionList.appendChild(li);
    });
}

// Student Login
function studentLogin() {
    const studentId = document.getElementById('studentId').value;
    const studentPassword = document.getElementById('studentPassword').value;

    const student = students.find(s => s.id === studentId && s.password === studentPassword);

    if (student) {
        alert(`Welcome ${student.name}! Starting your quiz.`);
        startQuiz();
    } else {
        document.getElementById('studentError').innerText = 'Invalid User ID or Password';
    }
}

// Start Quiz
function startQuiz() {
    const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
    displayQuiz(shuffledQuestions);
}

// Display Quiz Questions
function displayQuiz(questions) {
    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz-container');

    questions.forEach((q, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionText = document.createElement('h3');
        questionText.innerText = `${index + 1}. ${q.question}`;
        questionElement.appendChild(questionText);

        q.options.forEach(option => {
            const optionElement = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = option;
            optionElement.appendChild(input);
            optionElement.appendChild(document.createTextNode(option));
            questionElement.appendChild(optionElement);
        });

        quizContainer.appendChild(questionElement);
    });

    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit Quiz';
    submitButton.onclick = submitQuiz;
    quizContainer.appendChild(submitButton);

    document.body.appendChild(quizContainer);
}

// Submit Quiz
function submitQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    const allQuestions = quizContainer.querySelectorAll('.question');
    let score = 0;

    allQuestions.forEach((questionElement, index) => {
        const selectedOption = questionElement.querySelector('input[type="radio"]:checked');
        if (selectedOption && selectedOption.value === questions[index].correctAnswer) {
            score++;
        }
    });

    alert(`Quiz Submitted! You scored ${score} out of ${questions.length}`);
}

// Load students from localStorage
function loadStudents() {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
    }
}

// Load questions from localStorage
function loadQuestions() {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
        questions = JSON.parse(storedQuestions);
    }
}
