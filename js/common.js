$(document).ready(function () {
  const navigation = document.getElementById("navigation");

  if (navigation) {
    const navBar = document.createElement("nav");
    navBar.classList.add("navbar");

    navBar.innerHTML = `
      <div class="brand">Bookstore.</div>
      <button class="toggle-btn" id="toggleBtn" data-bs-toggle="collapse"
        data-bs-target="#navLinks" aria-controls="navLinks" aria-expanded="false" aria-label="Toggle navigation">
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
        <li id="cart">
          <a href="cart.html"
            ><i class="fa-solid fa-cart-shopping"></i
            ><span class="navText">Cart</span></a
          >
        </li>
        <li id="login">
          <a href="login.html" title="Login">
            <i class="fa-solid fa-right-to-bracket"></i
            ><span class="navText">LogIn</span>
          </a>
        </li>
        <li id="profile">
          <a href="profile.html">
            <img src="images/default-profile-pic.jpg" class="profilePic"/>
            <span class="navText">Profile</span>
          </a>
        </li>
      </ul>
  `;

    navigation.appendChild(navBar);
  }

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    $("#login").hide();
    $("#profile").show();
    $("#cart").show();
  } else {
    $("#login").show();
    $("#profile").hide();
    $("#cart").hide();
  }
});
