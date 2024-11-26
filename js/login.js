$(document).ready(function () {
  // On register button click event
  $("#login").click(function () {
    // Clear previous error messages
    $(".error").text("");

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

    $.getJSON("data/users.json", function (users) {
      // Check if the user exists in the list
      const user = users.find((user) => user.username === username);

      if (!user) {
        $("#error").text("Username doesn't exist.");
        return false;
      } else if (password !== user.password) {
        $("#error").text("Password is incorrect.");
        return false;
      } else {
        window.location.href = "index.html";
        return false;
      }
    }).fail(function () {
      $("#error").text("Failed to load user data.");
      return false;
    });
    return false;
  });
});
