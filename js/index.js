import { experience } from "./data/experience.js";
import { projects } from "./data/projects.js";

const experienceList = document.getElementById("experiences");
const projectList = document.getElementById("projects");

let experienceHTML = "";
let projectsHTML = "";

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

projectList.innerHTML = projectsHTML + projectsHTML;
experienceList.innerHTML = experienceHTML;

const project = document.querySelector(".project");

project.addEventListener("mouseover", () => {
  project.classList.add("hover");
});

project.addEventListener("mouseout", () => {
  project.classList.remove("hover");
});