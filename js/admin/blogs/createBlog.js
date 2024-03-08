import { regExPatterns } from "../../utils.js";
import { createABlog } from "../../api/index.js";

const createBlogForm = document.querySelector(".createBlog");
const blogTitle = document.querySelector("#blogTitle");
const blogContent = document.querySelector(".editorContent");
const form = document.querySelector("form");
const imageInput = document.querySelector(".imageInput");
const fileInput = document.querySelector("#fileInput");
const loader = document.querySelector(".loader");
const submitButton = document.querySelector(".button");

let imageUrl = "";

imageInput.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    imageInput.style.backgroundImage = `url(${reader.result})`;
    imageUrl = reader.result;
  };

  reader.readAsDataURL(file);
});

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

createBlogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  form.classList.add("submitted");
  const allInputs = form.querySelectorAll(".input-text");
  const allValid = Array.from(allInputs).every((input) =>
    input.classList.contains("correct")
  );

  if (allValid) {
    loader.classList.add("show");
    submitButton.disabled = true;
    
    const formData = new FormData(createBlogForm);
    formData.append("description", JSON.stringify(blogContent.innerHTML));
    formData.append('image', fileInput.files[0]);

    for(let [key, value] of formData) {
     console.log(key, value);
    }
    
    const result = await createABlog(formData);

    if (result.data) {
      loader.classList.remove("show");
      submitButton.disabled = false;
      Toastify({
        text: result.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
      }).showToast();

      fileInput.value = "";
      form.classList.remove("submitted");
      allInputs.forEach((input) => input.classList.remove("correct"));

      imageInput.style.backgroundImage = "url(../../images/image.png)";
      blogTitle.value = "";
      blogContent.innerHTML = "";
      setTimeout(() => {
        window.location.href = "./blogs.html";
      }, 1500);
    } else if (result.error === "jwt expired") {
      submitButton.disabled = false;
      loader.classList.remove("show");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "../login.html";
      Toastify({
        text: "Please login to continue",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true,
      }).showToast();
    } else {
      submitButton.disabled = false;
      loader.classList.remove("show");
      Toastify({
        text: result.error || result.message || "An error occurred",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true,
      }).showToast();
    }
  }
});


