import { v4 as uuidv4 } from "uuid";
const createBlogForm = document.querySelector(".createBlog") as HTMLFormElement;
const blogTitle = document.querySelector("#blogTitle") as HTMLFormElement;
const blogContent = document.querySelector(".editorContent") as HTMLFormElement;
const form = document.querySelector("form") as HTMLFormElement;
const imageInput = document.querySelector(".imageInput") as HTMLFormElement;
const fileInput = document.querySelector("#fileInput") as HTMLFormElement;
let imageUrl: string | ArrayBuffer | null = "";

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
  

export interface LikesInterface {
    userId: string;
}

export interface CommentsInterface {
    userId: string;
    description: string;
    rating: number;
}

export interface BlogInterface {
    id: string;
    title: string;
    date: string;
    image: string;
    createBy: string;
    rating: number;
    likes: LikesInterface[];
    comments: CommentsInterface[],
    description: string,
}

imageInput.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
  const reader = new FileReader();
    if(file){
        reader.onloadend = () => {
          imageInput.style.backgroundImage = `url(${reader.result})`;
          imageUrl = reader.result;
        };
      
        reader.readAsDataURL(file);
    }
});

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

if (blogTitle) {
  blogTitle.addEventListener("input", (e) => {
    const inputElement = e.target as HTMLInputElement;
    checkInput(regExPatterns.blogTitle, inputElement);
  });
}

if (blogContent) {
  blogContent.addEventListener("input", (e) => {
    const inputElement = e.target as HTMLInputElement;
    checkInput(regExPatterns.blogContent, inputElement);
  });
}

createBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();
  form.classList.add("submitted");
  const allInputs = form.querySelectorAll(".input-text");
  const allValid = Array.prototype.slice
    .call(allInputs)
    .every((input: Element) => input.classList.contains("correct"));

  if (allValid) {
    form.classList.remove("submitted");
    allInputs.forEach((input) => input.classList.remove("correct"));

    const allBlogs: BlogInterface[] = JSON.parse(localStorage.getItem("blogs") || "[]");
    const uniqueId: string = uuidv4();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;

    const newBlog: BlogInterface = {
      id: uniqueId,
      title: blogTitle.value,
      date: formattedDate,
      image: imageUrl as string,
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
