$(document).ready(function () {
  // On login button click event
  $("#login").click(function (event) {
    event.preventDefault();
    // Clear previous error messages
    $(".error").text("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const username = $("#username").val();
    const password = $("#password").val();

    // Validate username
    if (username === "") {
      $("#error").text("Please enter your username.");
      return false;
    }

    // Validate password
    if (password === "") {
      $("#error").text("Please enter your password.");
      return false;
    }

    // Check if the user exists in the list
    const user = users.filter((user) => user.username === username)?.[0];

    if (!user) {
      $("#error").text("Username doesn't exist.");
      return false;
    } else if (password !== user.password) {
      $("#error").text("Password is incorrect.");
      return false;
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      window.location.href = "index.html";
      return false;
    }
  });
});
