import { experience } from "./data/experience.js";
import { projects } from "./data/projects.js";

const storedBlogs = localStorage.getItem("blogs");
const allBlogs = storedBlogs ? JSON.parse(storedBlogs) : [];
console.log(allBlogs);

const experienceList = document.getElementById("experiences");
const projectList = document.getElementById("projects");
const blogList = document.getElementById("blogs");
const blogContainer = document.querySelector(".blog-container");
const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");

let experienceHTML = "";
let projectsHTML = "";
let blogsLength = allBlogs.length;

experience.forEach((experience) => {
  experienceHTML += `
    <div class='exp flex'>
      <div class='company'>
        <h3>${experience.company}</h3>
        <p class="date">${experience.date}</p>
        <span class="dot"></span>
      </div>
      <div class='description'>
        <h4>${experience.title}</h4>
        <p class="text-small">${experience.description}</p>
        <a href='${experience.link}' target='_blank' class="button flex">Visit Website</a>
      </div>
    </div>`;
});

projects.forEach((project) => {
  projectsHTML += `
    <div class="project">
      <div class="project-image">
        <img src="${project.image}" alt="${project.name}">
      </div>
      <h3 class="proj-name">
        ${project.name}
      </h3>
      <a href="${project.link}" target="_blank" class="proj-link">
        <img src="./images/link.png" alt="arrow" class="arrow">
      </a>
    </div>`;
});

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
            ratingsHTML += `<i class="fa fa-star"></i>`;
        } else {
            ratingsHTML += `<i class="fa-regular fa-star"></i>`;
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
      <article class="blog" key=${blog.id} data-aos="zoom-in-up">
        <div class="blog-image">
          <img src="${blog.image}" alt="${blog.title}">
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
      </article>`;
  });
  blogList.innerHTML = blogsHTML;

};

if (projectList ) {
  projectList.innerHTML = projectsHTML + projectsHTML;

  let isHovered = false;

  const scrollProject = () => {
    if (!isHovered) {
      projectList.scrollLeft += 300;
      if (projectList.scrollLeft + projectList.clientWidth >= projectList.scrollWidth) {
        projectList.scrollLeft = 0;
      }
    }
  };
  projectList.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  projectList.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  setInterval(scrollProject, 2000);
}

if (experienceList) {
  experienceList.innerHTML = experienceHTML;
}

const project = document.querySelector(".project");

if (project) {
  project.addEventListener("mouseover", () => {
    project.classList.add("hover");
  });

  project.addEventListener("mouseout", () => {
    project.classList.remove("hover");
  });
}

if (blogContainer && allBlogs.length > 0) {
  getBlogs(allBlogs);
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

// ------------------- NavLinks selection ----------------- //

if(currentUrl.includes('index')){

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
}

