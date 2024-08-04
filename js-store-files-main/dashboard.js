import authHandler from "./utils/authorizition.js";
import { setCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpRequest.js";

const mainContent = document.getElementById("container");
const logOutButton = document.getElementById("logout");

const renderUsers = (users) => {
  mainContent.innerHTML = "";

  users.forEach((user) => {
    const jsx = `
    <div id="card"> 
      <h3>${user.id}</h3>
      <div>
        <p><i class="fa-solid fa-user"></i>Name:</p>
        <span>${user.name.firstname} ${user.name.lastname}</span>
      </div>
      <div>
        <p><i class="fa-solid fa-paperclip"></i>Username:</p>
        <span>${user.username}</span>
      </div>
      <div>
        <p><i class="fa-solid fa-envelope"></i>Email:</p>
        <span>${user.email}}</span>
      </div>
      <div class="utf">
        <p><i class="fa-solid fa-phone"></i>Phone:</p>
        <span>${user.phone}</span>
      </div>
      <div class="utf">
        <p><i class="fa-solid fa-location-dot"></i>Address:</p>
        <span>${user.address.city} - ${user.address.street}</span>
      </div>
    </div>
    `;

    mainContent.innerHTML += jsx;
  });
};

const init = async () => {
  authHandler();
  const users = await getData("users");
  renderUsers(users);
};

const deleteCookieHandler = () => {
  document.cookie = "token=;max-age=0;path=/"
  location.assign("index.html");
};

document.addEventListener("DOMContentLoaded", init);
logOutButton.addEventListener("click", deleteCookieHandler);
