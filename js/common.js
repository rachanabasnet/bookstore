$(document).ready(function () {
  const navigation = document.getElementById("navigation");
  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");

  navBar.innerHTML = `
      <div class="brand">Bookstore.</div>
      <button class="toggle-btn" id="toggleBtn">
        <i class="fa-solid fa-bars"></i>
      </button>
      <ul class="nav-links" id="navLinks">
        <li>
          <a href="index.html"
            ><i class="fa-solid fa-house"></i
            ><span class="navText">Home</span></a
          >
        </li>
        <li>
          <a href="books.html"
            ><i class="fa-solid fa-shop"></i
            ><span class="navText">Shop</span></a
          >
        </li>
        <li>
          <a href="contact.html"
            ><i class="fa-solid fa-address-book"></i
            ><span class="navText">Contact</span></a
          >
        </li>
        <li>
          <a href="cart.html"
            ><i class="fa-solid fa-cart-shopping"></i
            ><span class="navText">Cart</span></a
          >
        </li>
        <li id="login">
          <a href="profile.html">
            <img src="images/default-profile-pic.jpg" class="profilePic"/>
            <span class="navText">Profile</span>
          </a>
        </li>
        <li id="logout">
            <a href="#" id="logoutLink">
                <i class="fa-solid fa-right-from-bracket"></i
                ><span class="navText">Logout</span>
            </a>
        </li>
      </ul>
  `;

  navigation.appendChild(navBar);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    $("#login").hide();
    $("#logout").show();
  } else {
    $("#login").show();
    $("#logout").hide();
  }

  $("#logoutLink").click(function (event) {
    event.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
});
