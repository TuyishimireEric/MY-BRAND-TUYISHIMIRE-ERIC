import { regExPatterns } from "../../utils.js";
import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
const createBlogForm = document.querySelector(".createBlog");
const blogTitle = document.querySelector("#blogTitle");
const blogContent = document.querySelector(".editorContent");
const form = document.querySelector("form");

export const checkInput = (regEx, input) => {
  const nearestCorrectIcon = input.closest(".input-text");

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

if (blogTitle) {
  blogTitle.addEventListener("input", (e) => {
    checkInput(regExPatterns.blogTitle, e.target);
  });
}

if (blogContent) {
  blogContent.addEventListener("input", (e) => {
    checkInput(regExPatterns.blogContent, e.target);
  });
}

createBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  form.classList.add("submitted");
  const allInputs = form.querySelectorAll(".input-text");
  const allValid = Array.from(allInputs).every((input) =>
    input.classList.contains("correct")
  );

  if (allValid) {
    form.classList.remove("submitted");
    allInputs.forEach((input) => input.classList.remove("correct"));

    const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const uniqueId = uuidv4();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const newBlog = {
      id: uniqueId,
      title: blogTitle.value,
      date: formattedDate,
      image: "./images/nextJS.png",
      createBy: "Eric Tuyishimire",
      rating: 0,
      likes: 0,
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
