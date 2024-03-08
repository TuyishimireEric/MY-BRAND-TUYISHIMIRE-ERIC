import { getQueries } from "../api/index.js";
import { formatedDate } from "../utils.js";

const queryContainer = document.querySelector(".queries-container");
const queriesCounter = document.querySelector("#queriesCounter");

export const showQueries = (queries) => {
  let queriesHTML = "";
  queries.forEach((query) => {
    queriesHTML += `
    <div class="querry" > 
            <div class="querry-header flex" >
                <div class="querry-header-left">
                    <img src="../../images/user.png" alt="user" />
                    <div class="querry-header-left-info">
                        <h5>${query.name}</h5>
                        <span>
                            ${query.email}
                        </span>
                    </div> 
                </div>
                <div class="querry-header-right">
                    <span>${formatedDate(query.createdAt)}</span>
                </div> 
            </div> 
            <p class="text-small
            ">
                ${query.description}
            </p>
        </div>
        `;
  });
  queryContainer.innerHTML = queriesHTML;
  queriesCounter.innerHTML = queries.length;
};
