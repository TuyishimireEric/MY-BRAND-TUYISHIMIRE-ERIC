export const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let ratingsHTML = "";
  
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        ratingsHTML += `<img src="./images/fullStar.svg" alt="star" class="star">`;
      } else {
        ratingsHTML += `<img src="./images/emptyStar.svg" alt="star" class="star">`;
      }
    }
    return ratingsHTML;
  };