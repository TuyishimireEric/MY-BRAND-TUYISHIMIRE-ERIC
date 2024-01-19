import { experience } from "./data/experience.js";
import { projects } from "./data/projects.js";
import { blogs } from "./data/blogs.js";

const experienceList = document.getElementById("experiences");
const projectList = document.getElementById("projects");
const blogList = document.getElementById("blogs");
const more = document.querySelector(".more");
const blogContainer = document.querySelector(".blog-container");
const arrow1 = document.querySelector(".more .arrow1");
const arrow2 = document.querySelector(".more .arrow2");
const searchText = document.getElementById("searchText");
const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");

let experienceHTML = "";
let projectsHTML = "";
let blogsLength = blogs.length;

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

const getBlogs = (filteredBlogs) => {
  let blogsHTML = "";
  filteredBlogs.forEach((blog) => {
    let ratingsHTML = "";

    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;

      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          ratingsHTML += `<img src="./images/fullStar.svg" alt="star" class="star">`;
        } else {
          ratingsHTML += `<img src="./images/emptyStar.svg" alt="star" class="star">`;
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
      truncateDescription(blog.description, 80) || "";

    blogsHTML += `
    <div class="blog">
      <div class="blog-details">
        <div>
          <div class="blog-head">
            <h3 class="blog-title">${blog.title}</h3>
            <span class="likes">
            <p>${blog.likes}</p>
              <img src="./images/heart.png" alt="heart" class="heart">
              <p>${blog.likes} comments</p>
            </span>
          </div>
          <div class="ratings">
            ${ratingsHTML}
          </div>
          <p class="date">${blog.date}</p>
          <p class="blog-description text-small">${truncatedDescription}</p>
        </div>
        <a href="#" target="_blank" class="button">More</a>
      </div>
      <div class="blog-image">
        <img src="${blog.image}" alt="${blog.title}">
      </div>
    </div>`;
  });
  blogList.innerHTML = blogsHTML;

  if (filteredBlogs.length <= 2) {
    more.style.display = "none";
  } else {
    more.style.display = "block";
  }
};

projectList.innerHTML = projectsHTML + projectsHTML;
experienceList.innerHTML = experienceHTML;

const project = document.querySelector(".project");

project.addEventListener("mouseover", () => {
  project.classList.add("hover");
});

project.addEventListener("mouseout", () => {
  project.classList.remove("hover");
});

more.addEventListener("click", () => {
  if (blogContainer.scrollTop >= (blogsLength - 2) * 400) {
    blogContainer.scrollTop = 0;
  } else {
    blogContainer.scrollTop += 400;
  }
});

blogContainer.addEventListener("scroll", () => {
  if (blogContainer.scrollTop >= (blogsLength - 2) * 400) {
    arrow1.style.transform = "rotate(45deg)";
    arrow2.style.transform = "rotate(-45deg)";
  } else {
    arrow1.style.transform = "rotate(-45deg)";
    arrow2.style.transform = "rotate(45deg)";
  }
});

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

humberger.addEventListener("click", () => {
  extraMenu.classList.toggle("active");
  navigation.classList.toggle("active");
});

extraMenu.addEventListener("click", ()=>{
  extraMenu.classList.remove("active");
  navigation.classList.remove("active");
});
getBlogs(blogs);
