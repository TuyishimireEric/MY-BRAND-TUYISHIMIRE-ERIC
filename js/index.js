import { experience } from './data/experience.js';

const experienceList = document.getElementById('experiences');

let html = '';

experience.forEach(experience => {
  html += `
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

console.log(html);
experienceList.innerHTML = html;
