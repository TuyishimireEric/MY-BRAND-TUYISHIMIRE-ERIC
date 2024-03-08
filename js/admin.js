import { sideNavigation } from "./data/sideNavigation.js";
import { validateToken, getQueries } from "./api/index.js";
import { showQueries } from "./admin/queries.js"

const sideNav = document.querySelector(".sideNav");
const sideNavSwitch = document.querySelector(".sideNavSwitch");
const dashboard = document.querySelector(".dashboard");
const queriesContainer = document.querySelector(".queries-container");
const userContainer = document.querySelector("#currentUser");

userContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  if (user) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "../../index.html";
  }
});

sideNavSwitch.addEventListener("click", function () {
  sideNavSwitch.classList.toggle("closed");
  sideNav.classList.toggle("closed");
  dashboard.classList.toggle("wide");
  queriesContainer.classList.toggle("wide");
});

let sideNavHtml = "";

const currentPath = window.location.pathname.toLowerCase();

sideNavigation.forEach((item) => {
  sideNavHtml += `
        <li class="${
          currentPath.includes(item.name.toLocaleLowerCase())
            ? "navList current"
            : "navList"
        }">
            <a href="${item.path}" class="navLink">
                <img src="${item.icon}" class="navIcon" onerror="this.onerror=null; this.src='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';"/>
                <span class="navName">${item.name}</span>
            </a>
            <a href="#" class="subNavBtn">
                <img src="../../images/right.png" class="subNavIcon" onerror="this.onerror=null; this.src='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';"/>
            </a>
        </li>
    `;
});

const change = `
    <a href="../../index.html" class="change">
        <img src="../../images/views.png" class="navIcon" onerror="this.onerror=null; this.src='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';"/>
        <span class="navName">Change mode</span>
    </a>
`;
sideNav.innerHTML = sideNavHtml + change;

function updateNavListState() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 1080) {
    sideNav.classList.add("closed");
    dashboard.classList.add("wide");
    sideNavSwitch.style.display = "none";
  } else {
    sideNav.classList.remove("closed");
    dashboard.classList.remove("wide");
    sideNavSwitch.style.display = "block";
  }
}

updateNavListState();

window.addEventListener("resize", updateNavListState);

window.onload = async () => {
  document.getElementById("preLoader").style.display = "none";
  const token = JSON.parse(localStorage.getItem("token") || "") || "";
  if (token) {
    const validated = await validateToken();
    if (validated.data.role != "admin") {
      window.location.href = "../../index.html";
      return;
    } else {
      const user = {
        userName: validated.data.userName,
        email: validated.data.email,
      };
      userContainer.innerHTML = "Logout";
      localStorage.setItem("user", JSON.stringify(user));

      const currentUrl = window.location.href;
      if (currentUrl.includes("queries")) {
        const queries = await getQueries();

        if (queries.data) {
          showQueries(queries.data);
        }
      }

    }
  } else {
    window.location.href = "../../index.html";
    return;
  }
};
