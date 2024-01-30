const imageInput = document.querySelector(".imageInput");
const blogTitle = document.querySelector("#blogTitle");
const editorIframe = document.querySelector(".rte-editable");

const selectedBlog = JSON.parse(localStorage.getItem("selectedBlog")) || {};

if (selectedBlog) {
  imageInput.innerHTML = `
        <img src="../../${selectedBlog.image}" alt="${selectedBlog.title}" class="mainImage"/>
    `;
  blogTitle.value = `${selectedBlog.title}`;

  const editorDocument =
    editorIframe.contentDocument || editorIframe.contentWindow.document;
    editorDocument.body.innerHTML = `<p>${selectedBlog.description}</p>`;
}
