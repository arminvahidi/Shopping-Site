import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpRequest.js";
import modalHandler from "./utils/modal.js";
import shortenText from "./utils/stringFunc.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("input");
const listItem = document.querySelectorAll("li");

let allProducts = null;
let search = "";
let category = "all";

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    // console.log(product);
    const jsx = `
    <div id="product">
      <div id="info">
      <span id="left">${
        product.rating.count
      } <i class="fa-solid fa-person"></i></span>
      <span id="right">${
        product.rating.rate
      } <i class="fa-solid fa-star"></i></span>
      </div>
      <img src="${product.image}"/>
      <span>${shortenText(product.title)}</span>
      <div id="final">
        <p>${product.price} $</p>
        <button>Buy <i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>
    `;
    mainContent.innerHTML += jsx;
  });
};

const init = async () => {
  const cookie = getCookie();

  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  showProducts(allProducts);
};

const filterProducts = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });
  showProducts(filteredProducts);
};

const searchHandler = () => {
  search = searchInput.value.trim().toLowerCase();

  filterProducts();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();

  listItem.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });

  filterProducts();
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
listItem.forEach((li) => li.addEventListener("click", filterHandler));
