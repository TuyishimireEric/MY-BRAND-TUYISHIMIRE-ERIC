import { v4 as uuidv4 } from 'https://cdn.skypack.dev/uuid';
import { regExPatterns } from "../utils.js";
const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");

const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get("id");

const getBlogsData = ()=>{
  return JSON.parse(localStorage.getItem("blogs")) || {};
}

const allBlogs = getBlogsData();

const selectedBlog = allBlogs.find((blog) => blog.id == blogId);
if (selectedBlog == -1) window.location.href = "../index.html";

humberger.addEventListener("click", () => {
  extraMenu.classList.toggle("active");
  navigation.classList.toggle("active");
});

extraMenu.addEventListener("click", () => {
  extraMenu.classList.remove("active");
  navigation.classList.remove("active");
});

const addRatings = document.querySelector(".addRatings");

const blogContainer = document.getElementById("Blogs");

let ratingsHTML = "";

const generateStars = (rating) => {
  ratingsHTML = "";
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      ratingsHTML += `<img src="../images/fullStar.svg" alt="star" class="star">`;
    } else {
      ratingsHTML += `<img src="../images/emptyStar.svg" alt="star" class="star">`;
    }
  }
};

blogContainer.innerHTML = `
    <div class="blogDetails">
        <img src="../${selectedBlog.image}" alt="${
  selectedBlog.title
}" class="mainImage"/>
        <div class="comment_head">
            <img src="../images/myProfile.png" alt="user" class="profilePicture"/>
            <div class="comment_details">
                <h3 class="userName">Eric Tuyishimire</h3>
                <p class="date">11/Jan/2023</p>
            </div>
        </div>
        <div class="blogDetails_content">
            <h1 class="title">${selectedBlog.title}</h1>
            <article class="text">${JSON.parse(
              selectedBlog.description
            )}</article>
        </div>
        <div class="comments">
            <div class="sticker" id="likeButton">
                <img src="../images/heart.png" alt="heart" />
                <span>${selectedBlog.likes} Likes</span>
            </div>
            
            <div>
                <h2 class="title">${
                  selectedBlog.comments.length
                } Comments <span>( )</span</h2>
            </div>
            <div class="blogComments">
                ${selectedBlog.comments
                  .map((comment) => {
                    generateStars(comment.rating);
                    return `
                        <div class="comment">
                            <div class="comment_head">
                                <img src="../images/user.png" alt="user" class="profilePicture"/>
                                <div class="comment_details">
                                    <h3 class="userName">${comment.name}</h3>
                                    <p class="date">${comment.date}</p>
                                </div>
                            </div>
                            <div class="ratings">
                            ${ratingsHTML}
                            </div>
                            <p class="text-small">${comment.description}</p>
                        </div>
                   `;
                  })
                  .join("")}
            </div>
        </div>
    </div>
    `;

generateStars(0);
addRatings.innerHTML = `
  <div class="ratings">
  ${ratingsHTML}
  </div>
  `;


const like = document.querySelector("#likeButton");
const leaveAComment = document.querySelector("#leaveAComment");
const messageInput = document.querySelector("#messageInput");
const emailInput = document.querySelector("#emailInput");
const fullNameInput = document.querySelector("#fullNameInput");
const form = document.querySelector("form");

like.addEventListener("click", (e)=>{
  e.preventDefault();
  selectedBlog.likes += 1;
  localStorage.setItem("blogs", JSON.stringify(allBlogs));
  location.reload();
})

export const checkInput = (regEx, input) => {
  const nearestCorrectIcon = input.closest(".input-text");

  if (regEx.test(input.value) && input.value.trim() !== "") {
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

if(fullNameInput){
  fullNameInput.addEventListener("input", (e) => {
    checkInput(regExPatterns.fullName, e.target);
  });
}

if(emailInput){
  emailInput.addEventListener("input", (e) => {
    checkInput(regExPatterns.email, e.target);
  });
}

if (messageInput) {
  messageInput.addEventListener("input", (e) => {
    checkInput(regExPatterns.message, e.target);
  });
}

leaveAComment.addEventListener("submit", (e)=>{
  e.preventDefault();
  form.classList.add("submitted");
  const allInputs = form.querySelectorAll(".input-text");
  const allValid = Array.from(allInputs).every((input) =>
    input.classList.contains("correct")
  );

  if (allValid) {
    form.classList.remove("submitted");
    const uniqueId = uuidv4();
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    const comment = {
      id: uniqueId,
      date: formattedDate,
      name: fullNameInput.value,
      email: emailInput.value,
      description: messageInput.value
    }
    
    const allBlogs = getBlogsData();
    const selectedBlog = allBlogs.find((blog) => blog.id == blogId);
    selectedBlog.comments.push(comment);
    localStorage.setItem("blogs", JSON.stringify(allBlogs));

    location.reload();

  }else{
    return
  }
})