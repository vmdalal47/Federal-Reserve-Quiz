const questions_container = document.getElementById("questions-container");
const buttons_container = document.getElementById("buttons-container");
const easy_mode_button = document.getElementById("easy_mode");
const hard_mode_button = document.getElementById("hard_mode");
const body_element = document.body;

const questions_and_answers = {
    question_one: {
        question: "The FOMC has how many members?",
        correct_answer: "12",
        answer_choices: ["11", "12", "13", "14"]
    },
    question_two: {
        question: "What is the name of the Chair of the Board of Governors?",
        correct_answer: "Jerome Powell",
        answer_choices: ["Jerome Powell", "Janet Yellen", "Ben Bernanke", "Alan Greenspan"]
    },
    question_three: {
        question: "How many Reserve Banks are there?",
        correct_answer: "12",
        answer_choices: ["9", "10", "11", "12"]
    },
    question_four: {
        question: "The Board of Governors has how many members?",
        correct_answer: "7",
        answer_choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    }, 
    question_five: {
        question: "Which of the Governors is the Vice Chair for Supervision?",
        correct_answer: "Michael Barr",
        answer_choices: ["Michelle Bowman", "Jerome Powell", "Michael Barr", "Lisa Cook"]
    },
    question_six: {
        question: "Who is the President of the Federal Reserve Bank of New York?",
        correct_answer: "John Williams",
        answer_choices: ["Neel Kashkari", "John Williams", "Susan Collins", "Mary Daly"]
    }
}

const check_answers_easy = function() {
    const answer_choices_container = document.getElementsByClassName("answer_choices_container");
    const questions_to_iterate_through = Object.keys(questions_and_answers);
    for (let i = 0; i < answer_choices_container.length; i++) {
        const answer_choices_container_within_loop = answer_choices_container[i];
        const answer_choices = answer_choices_container[i].querySelectorAll("input[type='radio']");
        const correct_answer = questions_and_answers[questions_to_iterate_through[i]].correct_answer;
        for (let j = 0; j < answer_choices.length; j++) {
            const answer_choice = answer_choices[j];
            if (answer_choice.checked) {
                if (answer_choice.classList.contains("correct_answer")) {
                    let celebration = document.createElement("p");
                    celebration.innerHTML = "Correct!";
                    celebration.style.color = "green";
                    questions_container.insertBefore(celebration, answer_choices_container_within_loop.nextSibling);
                } else {
                    let sad_message = document.createElement("p");
                    sad_message.innerHTML = "Sorry, that is not correct. The correct answer is " + correct_answer + ".";
                    sad_message.style.color = "red";
                    questions_container.insertBefore(sad_message, answer_choices_container_within_loop.nextSibling);
                }
            }
        }
    }
}

const generate_submit_button = function() {
    
    if (!document.contains(document.getElementById("submit_button"))) {
        const submit_button = document.createElement("input");
        submit_button.type = "submit";
        submit_button.id = "submit_button";
        buttons_container.appendChild(submit_button);
    } 

    buttons_container.removeChild(easy_mode_button);
    buttons_container.removeChild(hard_mode_button);
    
}

const generate_questions_easy_mode = function() {
    while (questions_container.lastChild) {
        questions_container.removeChild(questions_container.lastChild);
    }

    let question_number = 1;
    
    for (let question_answer in questions_and_answers) {

        let question = questions_and_answers[question_answer]['question'];
        let correct_answer = questions_and_answers[question_answer]['correct_answer'];
        
        let new_question = document.createElement("p");
        new_question.innerHTML = question;
        new_question.classList = "question";
        questions_container.appendChild(new_question);
    
        let answer_choices = questions_and_answers[question_answer]['answer_choices'];

        let answer_choices_container = document.createElement("div");
        answer_choices_container.classList = "answer_choices_container";

        for (let i = 0; i < answer_choices.length; i++) {
            let new_answer_choice = document.createElement("input");
            new_answer_choice.type = "radio";
            
            answer_choice_name = "question_" + question_number;
            new_answer_choice.name = answer_choice_name;
            
            let new_answer_choice_label = document.createElement("label");
            new_answer_choice_label.innerHTML = answer_choices[i];

            if (answer_choices[i] === correct_answer) {
                new_answer_choice.classList = "correct_answer";
            }
            
            answer_choices_container.appendChild(new_answer_choice);
            answer_choices_container.appendChild(new_answer_choice_label);
        }

        question_number++;

        questions_container.appendChild(answer_choices_container);
        
    }

    generate_submit_button();
    submit_button.addEventListener("click", check_answers_easy);
}

const check_answers_hard = function() {
    const question_responses = document.querySelectorAll("input[type='text']");
    const questions_to_iterate_through = Object.keys(questions_and_answers);
    for (let i = 0; i < question_responses.length; i++) {
        let question_response_field = question_responses[i];
        let question_response = question_response_field.value;
        let correct_answer = questions_and_answers[questions_to_iterate_through[i]].correct_answer;
        if (question_response == correct_answer) {
            let celebration = document.createElement("p");
            celebration.innerHTML = "Correct!";
            celebration.style.color = "green";
            questions_container.insertBefore(celebration, question_response_field.nextSibling);
        } else {
            let sad_message = document.createElement("p");
            sad_message.innerHTML = "Sorry, that is not correct. The correct answer is " + correct_answer + ".";
            sad_message.style.color = "red";
            questions_container.insertBefore(sad_message, question_response_field.nextSibling);
        }
    }
}

const generate_questions_hard_mode = function() {
    while (questions_container.lastChild) {
        questions_container.removeChild(questions_container.lastChild);
    }

    const instructions_div = document.createElement("div");
    const instructions_paragraph = document.createElement("p");
    instructions_paragraph.innerHTML = "For questions that ask for numbers, type digits rather than spelling out numbers (8, not eight). ";
    const instructions_paragraph2 = document.createElement("p");
    instructions_paragraph2.innerHTML = "Also, for names, type the first and last name separated by one space with no middle name or middle initial (John Doe).";
    instructions_div.appendChild(instructions_paragraph);
    instructions_div.appendChild(instructions_paragraph2);
    body_element.insertBefore(instructions_div, questions_container.parentNode);
    
    for (let question_answer in questions_and_answers) {
        let question = questions_and_answers[question_answer]['question'];
        
        const new_question = document.createElement("p");
        new_question.innerHTML = question;
        new_question.classList = "question";
        questions_container.appendChild(new_question);
    
        const new_input = document.createElement("input");
        new_input.type = "text";
        questions_container.appendChild(new_input);
    }

    generate_submit_button();
    submit_button.addEventListener("click", check_answers_hard);
}

easy_mode_button.addEventListener("click", generate_questions_easy_mode);

hard_mode_button.addEventListener("click", generate_questions_hard_mode);