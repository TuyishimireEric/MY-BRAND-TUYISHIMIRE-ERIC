import { regExPatterns } from "../utils.js";
import { formatedDate } from "../utils.js";
import {
  getABlog,
  getBlogLikes,
  getBlogComments,
  addBlogComment,
} from "../api/index.js";

const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");
const loader = document.querySelector(".loader");

let blogId = "";
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

const showBlog = (blog) => {
  blogContainer.innerHTML = `
    <div class="blogDetails" data-aos="zoom-out">
        <img src="${blog.image}" alt="${blog.title}" class="mainImage"/>
        <div class="comment_head">
            <img src="../images/myProfile.png" alt="user" class="profilePicture"/>
            <div class="comment_details">
                <h3 class="userName">Eric Tuyishimire</h3>
                <p class="date">11/Jan/2023</p>
            </div>
        </div>
        <div class="blogDetails_content">
            <h1 class="title">${blog.title}</h1>
            <article class="text">${blog.description}</article>
        </div>
    </div>
    `;

  generateStars(4.4);
  addRatings.innerHTML = `
  <div class="ratings">
  ${ratingsHTML}
  </div>
  `;
};

const like = document.querySelector("#likeButton");
const liked = document.querySelector("#liked");
const commented = document.querySelector(".blogComments");
const leaveAComment = document.querySelector("#leaveAComment");
const messageInput = document.querySelector("#messageInput");
const emailInput = document.querySelector("#emailInput");
const fullNameInput = document.querySelector("#fullNameInput");
const form = document.querySelector("form");

const showLikes = (likes) => {
  liked.innerHTML = `${likes}
  `;
};

const showComments = (comments) => {
  let commentsHTML = "";

  commentsHTML += `${comments
    .map((comment) => {
      return `
            <div class="comment" data-aos="fade-up"  data-aos-duration="1000">
                <div class="comment_head">
                    <img src="../images/user.png" alt="user" class="profilePicture"/>
                    <div class="comment_details">
                        <h3 class="userName">${comment.commentedBy}</h3>
                        <p class="date">${formatedDate(comment.updatedAt)}</p>
                    </div>
                </div>
                <p class="text-small">${comment.description}</p>
            </div>
        `;
    })
    .join("")}`;
  commented.innerHTML = commentsHTML;
};

like.addEventListener("click", async(e)=>{
  e.preventDefault();
  const liked = await likeABlog(blogId);
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

if (fullNameInput) {
  fullNameInput.addEventListener("input", (e) => {
    checkInput(regExPatterns.fullName, e.target);
  });
}

if (emailInput) {
  emailInput.addEventListener("input", (e) => {
    checkInput(regExPatterns.email, e.target);
  });
}

if (messageInput) {
  messageInput.addEventListener("input", (e) => {
    checkInput(regExPatterns.blogContent, e.target);
  });
}


leaveAComment.addEventListener("submit", async (e) => {
  e.preventDefault();
  form.classList.add("submitted");
  const allInputs = form.querySelectorAll(".input-text");
  const allValid = Array.from(allInputs).every((input) =>
    input.classList.contains("correct")
  );

  if (allValid) {
    loader.classList.add("show");
    form.classList.remove("submitted");

    const formData = {
      commentedBy: fullNameInput.value,
      description: messageInput.value,
    };

    const result = await addBlogComment(blogId, formData);
    if (result.data) {
      loader.classList.remove("show");
      Toastify({
        text: result.message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true,
    }).showToast();
    loader.classList.remove("show");
      const comments = await getBlogComments(blogId);
      if (comments.data) showComments(comments.data);
      messageInput.value = "";
      emailInput.value = "";
      fullNameInput.value = "";
      form.classList.remove("submitted");
      allInputs.forEach((input) => {
        input.classList.remove("correct");
      });
    } else {
      Toastify({
        text: result.message || result.error,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true,
      }).showToast();
    }
  } else {
    return;
  }
});


window.onload = async () => {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  blogId = searchParams.get("id");

  const selectedBlog = await getABlog(blogId);

  if (selectedBlog.data) {
    showBlog(selectedBlog.data);
  } else {
    window.location.href = "../index.html";
  }

  const likes = await getBlogLikes(blogId);

  if (likes.data) showLikes(likes.data);

  const comments = await getBlogComments(blogId);

  if (comments.data) showComments(comments.data);
};
