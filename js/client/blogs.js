const allBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

const blogList = document.getElementById("blogs");
const more = document.querySelector(".more");
const blogContainer = document.querySelector(".blog-container");
const searchText = document.getElementById("searchText");

let blogsLength = allBlogs.length;

const getBlogs = (filteredBlogs) => {
  let blogsHTML = "";
  filteredBlogs.forEach((blog) => {
    let ratingsHTML = "";

    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          if (currentUrl.includes("admin")) {
            ratingsHTML += `<img src="../../images/fullStar.svg" alt="star" class="star">`;
          } else {
            ratingsHTML += `<img src="./images/fullStar.svg" alt="star" class="star">`;
          }
        } else {
          if (currentUrl.includes("admin")) {
            ratingsHTML += `<img src="../../images/emptyStar.svg" alt="star" class="star">`;
          } else {
            ratingsHTML += `<img src="./images/emptyStar.svg" alt="star" class="star">`;
          }
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
      <div class="blog" key=${blog.id}>
        <div class="blog-details">
          <div>
            <div class="blog-head">
              <h3 class="blog-title">${blog.title}</h3>
              <span class="likes">
                <p>${blog.likes}</p>
                ${
                  currentUrl.includes("admin")
                    ? `<img src="../../images/heart.png" alt="heart" class="heart">`
                    : `<img src="./images/heart.png" alt="heart" class="heart">`
                }
                <p>${blog.comments.length} comments</p>
              </span>
            </div>
            <div class="ratings">
              ${ratingsHTML}
            </div>
            <p class="date">${blog.date}</p>
            <article class="blog-description text-small">${truncatedDescription}</article>
          </div>
          <a href="#" target="_blank" class="button">${currentUrl.includes("admin") ? "Edit": "More"}</a>
        </div>
        <div class="blog-image">
          <img src="${blog.image}" alt="${blog.title}">
        </div>
        ${
          currentUrl.includes("admin")
            ? `
              <span class="remove removeBlogs">
                <span class="bar"></span>
                <span class="bar"></span>
              </span>
            `
            : ``
        }
      </div>`;
  });
  blogList.innerHTML = blogsHTML;

  if (filteredBlogs.length <= 2) {
    more.style.display = "none";
  } else {
    more.style.display = "block";
  }
};

if(more){
  more.addEventListener("click", () => {
    if (blogContainer.scrollTop >= (blogsLength - 2) * 400) {
      blogContainer.scrollTop = 0;
    } else {
      blogContainer.scrollTop += 400;
    }
  });
}

if (blogContainer) {
  blogContainer.addEventListener("scroll", () => {
    if (blogContainer.scrollTop >= (blogsLength - 2) * 400) {
      arrow1.style.transform = "rotate(45deg)";
      arrow2.style.transform = "rotate(-45deg)";
    } else {
      arrow1.style.transform = "rotate(-45deg)";
      arrow2.style.transform = "rotate(45deg)";
    }
  });

  getBlogs(allBlogs);
}

if(searchText){
  searchText.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBlogs = blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.description.toLowerCase().includes(searchTerm)
      );
    });
  
    blogList.innerHTML = "";
    if (filteredBlogs.length > 0) {
      blogsLength = filteredBlogs;
      getBlogs(filteredBlogs);
    } else {
      blogList.innerHTML = "<p>No matching blogs found.</p>";
      more.style.display = "none";
    }
  });  
}

humberger.addEventListener("click", () => {
  extraMenu.classList.toggle("active");
  navigation.classList.toggle("active");
});

extraMenu.addEventListener("click", () => {
  extraMenu.classList.remove("active");
  navigation.classList.remove("active");
});

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


const navLinks = document.querySelectorAll('.link');
const sections = document.querySelectorAll('section');

window.onscroll = () => {
  sections.forEach(sect => {
    let top = window.scrollY;
    let offset = sect.offsetTop;
    let height = sect.offsetHeight;
    let id = sect.getAttribute("id");
    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove("active");
      });
      const linkWithTextContent = Array.from(navLinks).find(link => link.textContent.toLowerCase() === id.toLowerCase());
      if (linkWithTextContent) {
        linkWithTextContent.classList.add("active");
      }
    }
  });
};

