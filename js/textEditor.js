const elements = document.querySelectorAll(".editorBtn");
const editor = document.querySelector('.editorContent');
const colorInput = document.querySelector('.colorInput');
const textEditor = document.querySelector('.textEditor');

elements.forEach(element => {
    element.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
      let command = element.dataset['element'];
      if(element == 'createLink' || element == 'insertImage'){
        let url = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.aplyca.com%2Fen%2Fblog%2Fnextjs-the-future-of-the-web&psig=AOvVaw3HgS_cjt63lz-iDkT4onul&ust=1706950937503000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCRm_WljIQDFQAAAAAdAAAAABAE"
        document.execCommand(command, false, url);
      }else{
          document.execCommand(command, false, null);
      }
    });
  });

colorInput.addEventListener("input", ()=>{
    document.execCommand('forecolor', false, colorInput.value)
})