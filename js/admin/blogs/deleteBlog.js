import { deleteABlog } from '../../api/index.js';

const modal = document.querySelector('#modal');
const no = document.querySelector('#cancel');
const yes = document.querySelector('#delete');
const loader = document.querySelector('.loader');

const removeBlog = async (blogId, blogs, showBlogs, likesMap, commentsMap) => {
  modal.classList.add('active');

  modal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('active');
    loader.classList.remove('show');
  });

  no.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('active');
    loader.classList.remove('show');
  });

  yes.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    loader.classList.add('show');
    yes.disabled = true;
    const deleted = await deleteABlog(blogId);
    if (!deleted.error) {
      // eslint-disable-next-line no-undef
      Toastify({
        text: deleted.message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #00b09b, #96c93d)',
        stopOnFocus: true,
      }).showToast();
      modal.classList.remove('active');
      loader.classList.remove('show');
      yes.disabled = false;

      const updateBlog = blogs.filter((blog) => blog._id !== blogId);
      showBlogs(updateBlog, likesMap, commentsMap);
    } else if (deleted.error === 'jwt expired') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '../login.html';
      // eslint-disable-next-line no-undef
      Toastify({
        text: 'Please login to continue',
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true,
      }).showToast();
    } else {
      // eslint-disable-next-line no-undef
      Toastify({
        text: deleted.error || deleted.message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
        stopOnFocus: true,
      }).showToast();
      modal.classList.remove('active');
      loader.classList.remove('show');
      yes.disabled = false;
    }
  });
};

export default removeBlog;