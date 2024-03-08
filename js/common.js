const humberger = document.getElementById("humberger");
const extraMenu = document.querySelector(".extra-menu");
const navigation = document.querySelector(".navigation");

humberger.addEventListener("click", () => {
    extraMenu.classList.toggle("active");
    navigation.classList.toggle("active");
  });
  
  extraMenu.addEventListener("click", ()=>{
    extraMenu.classList.remove("active");
    navigation.classList.remove("active");
  });

  export const LoaderComponent = () => {
    return `
    <div class="over full"></div>
        <div class="over" id="loading">
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>
        </div>
    `;
  }