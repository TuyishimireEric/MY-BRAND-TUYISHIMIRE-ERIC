const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

const blogList = document.getElementById("blogs");
const more = document.querySelector(".more");
const blogContainer = document.querySelector(".blog-container");

let blogsLength = allBlogs.length;

const currentUrl = window.location.href;

const getBlogs = (filteredBlogs) => {
  let blogsHTML = "";
  filteredBlogs.forEach((blog) => {
    let ratingsHTML = "";

    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            ratingsHTML += `<img src="../../images/fullStar.svg" alt="star" class="star">`;
        } else {
            ratingsHTML += `<img src="../../images/emptyStar.svg" alt="star" class="star">`;
        }
      }
    };

    generateStars(blog.rating);
    const truncateDescription = (description, maxLength) => {
      if (!description) return "";
      const words = description.split(" ");
      if (words.length > maxLength) {
        return words.slice(0, maxLength).join(" ") + "...";
      }
      return description;
    };

    const truncatedDescription =
      truncateDescription(JSON.parse(blog.description), 40) || "";

    blogsHTML += `
    <article class="blog" key=${blog.id}>
    <div class="blog-image">
      <img src="../../${blog.image}" alt="${blog.title}">
    </div>
    <div class="blog-details">
      <h3 class="blog-title">${blog.title}</h3>
      <div class="summary">
        <p class="date">${blog.date}</p>
        <article class="blog-description text-small">${truncatedDescription}</article>
        <span class="readMore">read more </span>
      </div>
      <div class="reviews flex">
        <span>${ratingsHTML}</span>
        <span class="likes flex">
          <p>${blog.likes}
          <i class="fa fa-heart"></i>
          </p>
          <p>${blog.comments.length} 
            <i class="fa fa-comment"></i>
          </p>
        </span>
      </div>
    </div>
    <span class="remove removeBlogs">
      <span class="bar"></span>
      <span class="bar"></span>
    </span>

  </article>`;
  });
  blogList.innerHTML = blogsHTML;
};

if (blogContainer) {
  getBlogs(allBlogs);
}


const Allblogs = document.querySelectorAll(".blog-details");
if(allBlogs){
  Allblogs.forEach((blog) => {
    blog.addEventListener("click", (e) => {
      const id = e.target.closest(".blog").getAttribute("key");
      const urlToOpen = currentUrl.includes("admin")? `./updateBlog.html?id=${id}`:`./pages/blogDetails.html?id=${id}`;
      // window.open(urlToOpen, '_blank');
      window.location.href = urlToOpen;
    });
  });

}

export default getBlogs;