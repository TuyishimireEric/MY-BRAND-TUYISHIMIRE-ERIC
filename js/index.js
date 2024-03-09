import { experience } from "./data/experience.js";
import { projects } from "./data/projects.js";
import {
  getAllBlogs,
  getBlogLikes,
  getBlogComments,
  addQuery,
  validateToken,
} from "./api/index.js";
import { formatedDate } from "./utils.js";

const currentUrl = window.location.href;
const experienceList = document.getElementById("experiences");
const projectList = document.getElementById("projects");
const blogList = document.getElementById("blogs");
const blogContainer = document.querySelector(".blog-container");
const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");
const userContainer = document.querySelector("#currentUser");
const emailInput = document.querySelector("#emailInput");
const navLinks = document.querySelectorAll(".link");
const sections = document.querySelectorAll("section");
const form = document.querySelector("#queryForm");
const loader = document.querySelector(".loader");
const fullNameInput = document.querySelector("#fullNameInput");
const messageInput = document.querySelector("#messageInput");
const userIcon = document.querySelector("#user");
const changeMode = document.querySelector("#changeMode");

let experienceHTML = "";
let projectsHTML = "";

userIcon.addEventListener("click", (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  if (user) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "./index.html";
  } else {
    window.location.href = "./pages/login.html";
  }
});

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
        <img src="${project.image}" alt="${project.name}" onerror="this.onerror=null; this.src='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';">
      </div>
      <h3 class="proj-name">
        ${project.name}
      </h3>
      <a href="${project.link}" target="_blank" class="proj-link">
        <img src="./images/link.png" alt="arrow" class="arrow" onerror="this.onerror=null; this.src='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';">
      </a>
    </div>`;
});

const getBlogs = (blogs, likesMap, commentsMap) => {
  let blogsHTML = "";
  blogs.map((blog) => {
    blog.description = JSON.parse(blog.description) || blog.description;
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

    const truncateDescription = (description, maxLength) => {
      if (!description) return "";
      const words = description.split(" ");
      if (words.length > maxLength) {
        return words.slice(0, maxLength).join(" ") + "...";
      }
      return description;
    };

    generateStars(4.4);

    const truncatedDescription =
      truncateDescription(blog.description, 40) || "";

    const likes = likesMap[blog._id] || 0;
    const comments = commentsMap[blog._id] || 0;

    blogsHTML += `
      <article class="blog" key=${blog._id} data-aos="zoom-in-up">
        <div class="blog-image">
          <img src="${blog.image}" alt="${blog.title}" onerror="this.onerror=null; this.src='https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png';">
        </div>
        <div class="blog-details">
          <h3 class="blog-title">${blog.title}</h3>
          <div class="summary">
            <p class="date">${formatedDate(blog.createdAt)}</p>
            <article class="blog-description text-small">${truncatedDescription}</article>
            <span class="readMore">read more </span>
          </div>
          <div class="reviews flex">
            <span>${ratingsHTML}</span>
            <span class="likes flex">
              <p>${likes}
              <i class="fa fa-heart"></i>
              </p>
              <p>${comments}
                <i class="fa fa-comment"></i>
              </p>
            </span>
          </div>
        </div>
      </article>`;
  });
  blogList.innerHTML = blogsHTML;

  const Allblogs = document.querySelectorAll(".blog-details");
  if (Allblogs) {
    Allblogs.forEach((blog) => {
      blog.addEventListener("click", (e) => {
        const id = e.target.closest(".blog").getAttribute("key");
        const urlToOpen = `./pages/blogDetails.html?id=${id}`
        // window.open(urlToOpen, '_blank');
        window.location.href = urlToOpen;
      });
    });
  }
};

if (projectList) {
  projectList.innerHTML = projectsHTML + projectsHTML;

  let isHovered = false;

  const scrollProject = () => {
    if (!isHovered) {
      projectList.scrollLeft += 300;
      if (
        projectList.scrollLeft + projectList.clientWidth >=
        projectList.scrollWidth
      ) {
        projectList.scrollLeft = 0;
      }
    }
  };
  projectList.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  projectList.addEventListener("mouseleave", () => {
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

humberger.addEventListener("click", () => {
  extraMenu.classList.toggle("active");
  navigation.classList.toggle("active");
});

extraMenu.addEventListener("click", () => {
  extraMenu.classList.remove("active");
  navigation.classList.remove("active");
});

// ------------------- NavLinks selection ----------------- //

if (currentUrl.includes("index")) {
  const getLikes = async (blogId) => {
    const likes = await getBlogLikes(blogId);
    return likes || 0;
  };

  const getComments = async (blogId) => {
    const comments = await getBlogComments(blogId);
    return comments || [];
  };


  window.onload = async () => {
    const token = JSON.parse(localStorage.getItem("token")) || "";
    if (token) {
      const validated = await validateToken();
      if (!validated.data) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } else {
        const user = {
          userName: validated.data.userName,
          email: validated.data.email,
        };
        userContainer.innerHTML = "Logout";
        emailInput.value = user.email;
        const email = document.querySelector("#email");
        email.classList.add("correct");
        email.style.display = "none";
        localStorage.setItem("user", JSON.stringify(user));
        if(validated.data.role == "admin"){
          changeMode.innerHTML = `<a href="./pages/admin/dashboard.html" target="_blank">Dashboard</a>`;
        }
      }
    }

    const blogs = await getAllBlogs();
    const likesMap = {};
    const commentsMap = {};
    for (const blog of blogs.data) {
      const likes = await getLikes(blog._id);
      const comments = await getComments(blog._id);
      likesMap[blog._id] = likes.data;
      commentsMap[blog._id] = comments.data.length;
    }

    if (blogs) {
      getBlogs(blogs.data, likesMap, commentsMap);
    }
  };

  window.onscroll = () => {
    sections.forEach((sect) => {
      let top = window.scrollY;
      let offset = sect.offsetTop;
      let height = sect.offsetHeight;
      let id = sect.getAttribute("id");
      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });
        const linkWithTextContent = Array.from(navLinks).find(
          (link) => link.textContent.toLowerCase() === id.toLowerCase()
        );
        if (linkWithTextContent) {
          linkWithTextContent.classList.add("active");
        }
      }
    });
  };
}

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    form.classList.add("submitted");
    const allInputs = form.querySelectorAll(".input-text");
    const allValid = Array.from(allInputs).every((input) =>
      input.classList.contains("correct")
    );
  
    if (allValid) {
      loader.classList.add("show");
      form.classList.remove("submitted");
  
      const formData = {
        name: fullNameInput.value,
        email: emailInput.value,
        description: messageInput.value,
      };
  
      const result = await addQuery(formData);
      if (!result.error) {
        Toastify({
          text: "Message sent successfully!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          stopOnFocus: true,
        }).showToast();
  
        loader.classList.remove("show");
        messageInput.value = "";
        fullNameInput.value = "";
        emailInput.value = ""; 
        form.classList.remove("submitted");
        allInputs.forEach((input) => {
          input.classList.remove("correct");
  
          const user = JSON.parse(localStorage.getItem("user")) || "";
          if (user) {
            userContainer.innerHTML = user.userName;
            emailInput.value = user.email;
            const email = document.querySelector("#email");
            email.classList.add("correct");
            email.style.display = "none";
          }
        });
      } else {
        loader.classList.remove("show");
        Toastify({
          text: result.message || result.error,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
          stopOnFocus: true,
        }).showToast();
      }
    } else {
      return;
    }
  });
}

