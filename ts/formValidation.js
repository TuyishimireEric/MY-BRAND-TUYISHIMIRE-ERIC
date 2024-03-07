var regExPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    fullName: /^[a-zA-Z\s]{3,30}$/,
    message: /^.{3,500}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
    blogTitle: /^.{3,100}$/,
    blogContent: /^.{3,10000}$/
};
var form = document.querySelector("form");
var fullName = document.querySelector("#fullNameInput");
var email = document.querySelector("#emailInput");
var message = document.querySelector("#messageInput");
var password = document.querySelector("#passwordInput");
var confirmPassword = document.querySelector("#confirmPassword");
var blogTitle = document.querySelector("#blogTitle");
var blogContent = document.querySelector(".editorContent");
var checkInput = function (regEx, input) {
    if (!input)
        return;
    var nearestCorrectIcon = input.closest(".input-text");
    if (!nearestCorrectIcon)
        return;
    if (regEx.test(input.value) && input.value !== "") {
        nearestCorrectIcon.classList.add("correct");
        nearestCorrectIcon.classList.remove("notCorrect");
    }
    else if (!regEx.test(input.value) && input.value.length > 0) {
        nearestCorrectIcon.classList.add("notCorrect");
        nearestCorrectIcon.classList.remove("correct");
    }
    else {
        nearestCorrectIcon.classList.remove("correct");
        nearestCorrectIcon.classList.remove("notCorrect");
    }
};
var checkConfirmPassword = function (regEx, input, password) {
    var nearestCorrectIcon = input.closest(".input-text");
    if (!nearestCorrectIcon)
        return;
    if (regEx.test(input.value.trim()) && input.value == password) {
        nearestCorrectIcon.classList.add("correct");
        nearestCorrectIcon.classList.remove("notCorrect");
    }
    else if (input.value != password && input.value.length > 0) {
        nearestCorrectIcon.classList.add("notCorrect");
        nearestCorrectIcon.classList.remove("correct");
    }
    else {
        nearestCorrectIcon.classList.remove("correct");
        nearestCorrectIcon.classList.remove("notCorrect");
    }
};
if (fullName) {
    fullName.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkInput(regExPatterns.fullName, inputElement);
    });
}
if (email) {
    email.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkInput(regExPatterns.email, inputElement);
    });
}
if (message) {
    message.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkInput(regExPatterns.message, inputElement);
    });
}
if (password) {
    password.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkInput(regExPatterns.password, inputElement);
    });
}
if (confirmPassword) {
    confirmPassword.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkConfirmPassword(regExPatterns.password, inputElement, password.value);
    });
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.classList.add("submitted");
    var allInputs = form.querySelectorAll(".input-text");
    var allValid = Array.prototype.slice
        .call(allInputs)
        .every(function (input) { return input.classList.contains("correct"); });
    if (allValid) {
        form.classList.remove("submitted");
        allInputs.forEach(function (input) { return input.classList.remove("correct"); });
    }
    else {
        return;
    }
});
