const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");

const currentUrl = new URL(window.location.href);
const searchParams = new URLSearchParams(currentUrl.search);
const blogId = searchParams.get('id');


const allBlogs = JSON.parse(localStorage.getItem("blogs")) || {};
const selectedBlog = allBlogs.find(blog=>blog.id == blogId)
if(selectedBlog == -1) window.location.href = "../index.html";

humberger.addEventListener("click", () => {
    console.log("clicked");
    extraMenu.classList.toggle("active");
    navigation.classList.toggle("active");
  });
  
  extraMenu.addEventListener("click", ()=>{
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
            <p class="text">${selectedBlog.description}</p>
        </div>
        <div class="comments">
            <div class="sticker">
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
                            <p class="text-small">${comment.comment}</p>
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
