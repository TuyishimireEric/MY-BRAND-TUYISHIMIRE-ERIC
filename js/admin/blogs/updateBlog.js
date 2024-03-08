import { regExPatterns, formatedDate } from "../../utils.js";
import { updateABlog,getABlog, getBlogLikes, getBlogComments} from "../../api/index.js";
import { hideComment } from "./hideComment.js";

const createBlogForm = document.querySelector(".createBlog");
const blogTitle = document.querySelector("#blogTitle");
const blogContent = document.querySelector(".editorContent");
const form = document.querySelector("form");
const imageInput = document.querySelector(".imageInput");
const fileInput = document.querySelector("#fileInput");
const loader = document.querySelector(".loader");
const submitButton = document.querySelector(".button");
const liked = document.querySelector("#liked");
const commented = document.querySelector(".blogComments");


let imageUrl = "";
let blogId = "";


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

// if (blogTitle) {
//   blogTitle.addEventListener("input", (e) => {
//     checkInput(regExPatterns.blogTitle, e.target);
//   });
// }

// if (blogContent) {
//   blogContent.addEventListener("input", (e) => {
//     checkInput(regExPatterns.blogContent, e.target);
//   });
// }

const showLikes = (likes) => {
  liked.innerHTML = `${likes}
  `;
};

export const showComments = (comments) => {
  let commentsHTML = "";


  commentsHTML += `${comments
    .map((comment) => {
      return `
            <div class="comment" data-aos="fade-up"  data-aos-duration="1000">
                <div class="comment_head">
                    <img src="../../images/user.png" alt="user" class="profilePicture"/>
                    <div class="comment_details">
                        <h3 class="userName">${comment.commentedBy}</h3>
                        <p class="date">${formatedDate(comment.updatedAt)}</p>
                    </div>
                </div>
                <i id="hideComment" key=${comment._id} class="fa-solid fa-eye-slash">
                <span class="loader"></span></i>
                <p class="text-small">${comment.description}</p>
            </div>
        `;
    })
    .join("")}`;
  commented.innerHTML = commentsHTML;

  document.querySelectorAll("#hideComment").forEach((removeButton) => {
    removeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const commentId = e.target.getAttribute("key");

      hideComment(commentId, comments, blogId);
    });
  });
};

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
    
    const formData = new FormData();
    formData.append("title", blogTitle.value);
    formData.append("description", JSON.stringify(blogContent.innerHTML));
    formData.append('image', fileInput.files[0] || imageUrl);

    const result = await updateABlog(formData, blogId);

    if (result.message === "Blog updated successfully") {
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

window.onload = async () => {
  const currentUrl = new URL(window.location.href);
  const searchParams = new URLSearchParams(currentUrl.search);
  blogId = searchParams.get("id");

  const selectedBlog = await getABlog(blogId);

  if (selectedBlog.data) {
    blogTitle.value = selectedBlog.data.title;
    blogContent.innerHTML = JSON.parse(selectedBlog.data.description) || selectedBlog.data.description;
    imageInput.style.backgroundImage = `url(${selectedBlog.data.image})`;
    imageUrl = selectedBlog.data.image;

    // const response = await fetch(imageUrl);
    // if (!response.ok) {
    //     throw new Error('Failed to fetch the image');
    // }
    // const blob = await response.blob();
    // const file = new File([blob], "blogImage", { type: blob.type });
    // fileInput.files[0] = file;

    blogTitle.closest(".input-text").classList.add("correct");

  } else {
    window.location.href = "./dashboard.html";
  }

  const likes = await getBlogLikes(blogId);
  if (likes.data) showLikes(likes.data);
  const comments = await getBlogComments(blogId);
  if (comments.data) showComments(comments.data);
};