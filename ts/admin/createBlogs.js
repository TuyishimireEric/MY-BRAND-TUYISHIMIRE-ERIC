"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var createBlogForm = document.querySelector(".createBlog");
var blogTitle = document.querySelector("#blogTitle");
var blogContent = document.querySelector(".editorContent");
var form = document.querySelector("form");
var imageInput = document.querySelector(".imageInput");
var fileInput = document.querySelector("#fileInput");
var imageUrl = "";
var regExPatterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    fullName: /^[a-zA-Z\s]{3,30}$/,
    message: /^.{3,500}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/,
    blogTitle: /^.{3,100}$/,
    blogContent: /^.{3,10000}$/
};
imageInput.addEventListener("click", function () {
    fileInput.click();
});
fileInput.addEventListener("change", function (e) {
    var _a;
    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    var reader = new FileReader();
    if (file) {
        reader.onloadend = function () {
            imageInput.style.backgroundImage = "url(".concat(reader.result, ")");
            imageUrl = reader.result;
        };
        reader.readAsDataURL(file);
    }
});
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
if (blogTitle) {
    blogTitle.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkInput(regExPatterns.blogTitle, inputElement);
    });
}
if (blogContent) {
    blogContent.addEventListener("input", function (e) {
        var inputElement = e.target;
        checkInput(regExPatterns.blogContent, inputElement);
    });
}
createBlogForm.addEventListener("submit", function (e) {
    e.preventDefault();
    form.classList.add("submitted");
    var allInputs = form.querySelectorAll(".input-text");
    var allValid = Array.prototype.slice
        .call(allInputs)
        .every(function (input) { return input.classList.contains("correct"); });
    if (allValid) {
        form.classList.remove("submitted");
        allInputs.forEach(function (input) { return input.classList.remove("correct"); });
        var allBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        var uniqueId = (0, uuid_1.v4)();
        var currentDate = new Date();
        var formattedDate = "".concat(currentDate.getFullYear(), "-").concat(currentDate.getMonth() + 1, "-").concat(currentDate.getDate());
        var newBlog = {
            id: uniqueId,
            title: blogTitle.value,
            date: formattedDate,
            image: imageUrl,
            createBy: "Eric Tuyishimire",
            rating: 0,
            likes: [],
            comments: [],
            description: JSON.stringify(blogContent.innerHTML),
        };
        allBlogs.push(newBlog);
        localStorage.setItem("blogs", JSON.stringify(allBlogs));
        blogTitle.value = "";
        blogContent.innerHTML = "";
        window.location.href = "./blogs.html";
    }
});
