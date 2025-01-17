import {
  getAllBlogs, validateToken,
} from '../../api/index.js';

import { getLikes, getComments } from '../../index.js';
import { formatedDate } from '../../utils.js';
import removeBlog from './deleteBlog.js';

const blogList = document.getElementById('blogs');

const userContainer = document.querySelector('#currentUser');


export const showBlogs = (blogs, likesMap, commentsMap) => {
  let blogsHTML = '';
  blogs.forEach((blog) => {
    blog.description = JSON.parse(blog.description) || blog.description ;
    let ratingsHTML = '';

    const generateStars = (rating) => {
      const fullStars = Math.floor(rating);

      for (let i = 0; i < 5; i += 1) {
        if (i < fullStars) {
          ratingsHTML += '<i class="fa fa-star"></i>';
        } else {
          ratingsHTML += '<i class="fa-regular fa-star"></i>';
        }
      }
    };

    const truncateDescription = (description, maxLength) => {
      if (!description) return '';
      const words = description.split(' ');
      if (words.length > maxLength) {
        return `${words.slice(0, maxLength).join(' ')}...`;
      }
      return description;
    };

    generateStars(4.4);

    const truncatedDescription = truncateDescription(blog.description, 40) || '';

    const likes = likesMap[blog._id] || 0;
    const comments = commentsMap[blog._id] || 0;

    blogsHTML += `
      <article class="blog" key=${blog._id} data-aos="zoom-in-up">
        <div class="blog-image">
          <img src="${blog.image}" alt="${blog.title}">
        </div>
        <div class="blog-details">
          <h3 class="blog-title">${blog.title}</h3>
          <div class="summary">
            <p class="date">${formatedDate(blog.createdAt)}</p>
            <article class="blog-description text-small">${truncatedDescription}</article>
            <span class="readMore">Edit blog </span>
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
        <span class="remove removeBlogs">
        <span class="bar"></span>
        <span class="bar"></span>
      </span>
      </article>`;
  });
  blogList.innerHTML = blogsHTML;

  const Allblogs = document.querySelectorAll('.blog-details');
  if (Allblogs) {
    Allblogs.forEach((blog) => {
      blog.addEventListener('click', (e) => {
        const id = e.target.closest('.blog').getAttribute('key');
        const urlToOpen = `./updateBlog.html?id=${id}`;
        // window.open(urlToOpen, '_blank');
        window.location.href = urlToOpen;
      });
    });
  }

  document.querySelectorAll('.removeBlogs').forEach((removeButton) => {
    removeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const blogId = e.target.closest('.blog').getAttribute('key');

      removeBlog(blogId, blogs, showBlogs, likesMap, commentsMap);
    });
  });
};

export const getBlogsData = async () => {
  const blogs = await getAllBlogs();

  const likesMap = {};
  const commentsMap = {};

  const blogIds = blogs.data.map((blog) => blog._id);
  const likesPromises = blogIds.map((id) => getLikes(id));
  const commentsPromises = blogIds.map((id) => getComments(id));

  const likesResults = await Promise.all(likesPromises);
  const commentsResults = await Promise.all(commentsPromises);

  blogs.data.forEach((blog, index) => {
    likesMap[blog._id] = likesResults[index].data;
    commentsMap[blog._id] = commentsResults[index].data.length;
  });
  
  if (blogs) {
    showBlogs(blogs.data, likesMap, commentsMap);
  }
};

window.onload = async () => {
  document.getElementById('preLoader').style.display = 'none';
  const token = JSON.parse(localStorage.getItem('token')) || '';
  if (token) {
    const validated = await validateToken();
    if (validated.data.role !== 'admin') {
      window.location.href = '../../index.html';
    } else {
      const user = {
        userName: validated.data.userName,
        email: validated.data.email,
      };
      userContainer.innerHTML = 'Logout';
      localStorage.setItem('user', JSON.stringify(user));

      await getBlogsData();
    }
  } else {
    window.location.href = '../../index.html';
  }
};
