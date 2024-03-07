const form = document.querySelector("form") as HTMLFormElement;
const fullName = document.querySelector("#fullNameInput") as HTMLInputElement;
const email = document.querySelector("#emailInput") as HTMLInputElement;
const message = document.querySelector("#messageInput") as HTMLTextAreaElement;
const password = document.querySelector("#passwordInput") as HTMLInputElement;
const confirmPassword = document.querySelector(
  "#confirmPassword"
) as HTMLInputElement;
const blogTitle = document.querySelector("#blogTitle") as HTMLInputElement;
const blogContent = document.querySelector(
  ".editorContent"
) as HTMLTextAreaElement;

interface RegExPatterns {
  email: RegExp;
  fullName: RegExp;
  message: RegExp;
  password: RegExp;
  blogTitle: RegExp;
  blogContent: RegExp;
}

const regExPatterns: RegExPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  fullName: /^[a-zA-Z\s]{3,30}$/,
  message: /^.{3,500}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
  blogTitle: /^.{3,100}$/,
  blogContent: /^.{3,10000}$/
};

const checkInput = (regEx: RegExp, input: HTMLInputElement | null) => {
  if (!input) return;
  const nearestCorrectIcon = input.closest(".input-text");
  if (!nearestCorrectIcon) return;

  if (regEx.test(input.value) && input.value !== "") {
    nearestCorrectIcon.classList.add("correct");
    nearestCorrectIcon.classList.remove("notCorrect");
  } else if (!regEx.test(input.value) && input.value.length > 0) {
    nearestCorrectIcon.classList.add("notCorrect");
    nearestCorrectIcon.classList.remove("correct");
  } else {
    nearestCorrectIcon.classList.remove("correct");
    nearestCorrectIcon.classList.remove("notCorrect");
  }
};

const checkConfirmPassword = (
  regEx: RegExp,
  input: HTMLInputElement,
  password: string
) => {
  const nearestCorrectIcon = input.closest(".input-text");
  if (!nearestCorrectIcon) return;
  if (regEx.test(input.value.trim()) && input.value == password) {
    nearestCorrectIcon.classList.add("correct");
    nearestCorrectIcon.classList.remove("notCorrect");
  } else if (input.value != password && input.value.length > 0) {
    nearestCorrectIcon.classList.add("notCorrect");
    nearestCorrectIcon.classList.remove("correct");
  } else {
    nearestCorrectIcon.classList.remove("correct");
    nearestCorrectIcon.classList.remove("notCorrect");
  }
};

if (fullName) {
  fullName.addEventListener("input", (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    checkInput(regExPatterns.fullName, inputElement);
  });
}

if (email) {
  email.addEventListener("input", (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    checkInput(regExPatterns.email, inputElement);
  });
}

if (message) {
  message.addEventListener("input", (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    checkInput(regExPatterns.message, inputElement);
  });
}

if (password) {
  password.addEventListener("input", (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    checkInput(regExPatterns.password, inputElement);
  });
}

if (confirmPassword) {
  confirmPassword.addEventListener("input", (e: Event) => {
    const inputElement = e.target as HTMLInputElement;
    checkConfirmPassword(regExPatterns.password, inputElement, password.value);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.add("submitted");
  const allInputs = form.querySelectorAll(".input-text");
  const allValid = Array.prototype.slice
    .call(allInputs)
    .every((input: Element) => input.classList.contains("correct"));

  if (allValid) {
    form.classList.remove("submitted");
    allInputs.forEach((input) => input.classList.remove("correct"));
  } else {
    return;
  }
});
