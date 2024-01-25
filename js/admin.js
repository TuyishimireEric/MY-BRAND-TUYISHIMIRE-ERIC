import { sideNavigation } from "./data/sideNavigation.js";

const sideNav = document.querySelector(".sideNav");
const sideNavSwitch = document.querySelector(".sideNavSwitch");
const dashboard = document.querySelector(".dashboard");

sideNavSwitch.addEventListener('click', function() {
    sideNavSwitch.classList.toggle('closed');
    sideNav.classList.toggle('closed');
    dashboard.classList.toggle('wide');
});

let sideNavHtml = "";

sideNavigation.forEach((item) => {
    sideNavHtml += `
        <li class="navList">
            <a href="${item.path}" class="navLink">
                <img src="${item.icon}" class="navIcon"/>
                <span class="navName">${item.name}</span>
            </a>
            <a href="#" class="subNavBtn">
                <img src="../../images/right.png" class="subNavIcon"/>
            </a>
        </li>
    `;
}
);

const change = `
    <a href="../../index.html" class="change">
        <img src="../../images/views.png" class="navIcon"/>
        <span class="navName">Change mode</span>
    </a>
`
sideNav.innerHTML = sideNavHtml+change;

function updateNavListState() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 1080) {
        sideNav.classList.add('closed');
        dashboard.classList.add('wide');
        sideNavSwitch.style.display = 'none'; 
    } else {
        sideNav.classList.remove('closed');
        dashboard.classList.remove('wide');
        sideNavSwitch.style.display = 'block'; 
    }
}

updateNavListState();

window.addEventListener('resize', updateNavListState);