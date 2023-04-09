import './css/style.css'
import './css/query.css'

// inputs
let inpDay = document.querySelector('#day')
let inpMonth = document.querySelector('#month')
let inpYear = document.querySelector('#year')
// button
let btn = document.querySelector('.calc')

let allInps = document.querySelectorAll('.inp input')
let allLabels = document.querySelectorAll('.inp label')
let allErrors = document.querySelectorAll('.inp .required')

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

btn.onclick = ageCalculate

function ageCalculate() {
    let today = new Date(); // today date
    let inputDate = new Date(inpYear.value, inpMonth.value - 1, inpDay.value) // put all inputs in one date

    // current date vars
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    // error empty field
    const fields = ["day", "month", "year"];

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        const input = document.querySelector(`#${field}`);
        const required = document.querySelector(`#${field} ~ .required`);

        if (input.value === "") {
            required.innerHTML = "This field is required";
            allInps[i].style.borderColor = 'hsl(0, 100%, 67%)'
            allLabels[i].style.color = 'hsl(0, 100%, 67%)'
            return;
        } else {
            required.innerHTML = "";
            allInps[i].style.borderColor = 'hsl(0, 0%, 86%)'
            allLabels[i].style.color = 'hsl(0, 1%, 44%)'
        }
    }

    // error invalid 
    let twoRegex = /^\d{1,2}$/
    let yearRegex = /\d{4}/

    if (!twoRegex.test(inpDay.value) || !twoRegex.test(inpMonth.value) || +inpDay.value > 31 || +inpMonth.value > 12) {
        if (!twoRegex.test(inpDay.value) || +inpDay.value > 31) {
            displayError(0, "Must be valid day")
        } else {
            displayError(1, "Must be valid month")
        }
        return;
    }

    if (!yearRegex.test(inpYear.value) || +inpYear.value > currentYear) {
        displayError(2, "Must be valid year")
        return;
    }

    // birth vars
    let birthMonth, birthDate, birthYear;
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    }

    // check leap year
    leapChecker(currentYear);

    birthYear = currentYear - birthDetails.year;

    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    }
    else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    }
    else {
        birthMonth--;
        let days = months[currentMonth - 2];
        birthDate = days + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }
    displayResult(birthDate, birthMonth, birthYear);
}

function displayError(i, massege) {
    allErrors[i].innerHTML = massege;
    allInps[i].style.borderColor = 'hsl(0, 100%, 67%)'
    allLabels[i].style.color = 'hsl(0, 100%, 67%)'
}

function displayResult(bDate, bMonth, bYear) {
    document.querySelector(".year").textContent = bYear;
    document.querySelector(".month").textContent = bMonth;
    document.querySelector(".day").textContent = bDate;

    console.log(bDate, bMonth, bYear);
}

function leapChecker(year) {
    if (year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)) {
        months[1] = 29;
    }
    else {
        months[1] = 28;
    }
}