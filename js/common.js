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