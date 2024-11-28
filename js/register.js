$(document).ready(function () {
  // On register button click event
  $("#register").click(function (event) {
    event.preventDefault();
    // Clear previous error messages
    $(".error").text("");
    $("#success").text("");

    let isValid = true;
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const email = $("#email").val();
    const username = $("#username").val();
    const gender = $("input[name='gender']:checked").val();
    const address = $("#address").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Validate First Name
    if (firstName.trim() === "") {
      $("#firstNameError").text("Please enter your First name.");
      isValid = false;
    }

    // Validate Last Name
    if (lastName.trim() === "") {
      $("#lastNameError").text("Please enter your Last name.");
      isValid = false;
    }

    // Validate Email
    if (email.trim() === "") {
      $("#emailError").text("Please enter your Email.");
      isValid = false;
    } else {
      // Validate email using regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        $("#emailError").text("Please enter valid Email.");
      }
    }

    // Validate username
    if (username === "") {
      $("#usernameError").text("Please enter your username.");
      isValid = false;
    } else {
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        $("#usernameError").text("User with username already exists.");
        isValid = false;
      }
    }

    // Validate address
    if (address === "") {
      $("#addressError").text("Please enter your Address.");
      isValid = false;
    }

    // Validate Gender
    if (!gender) {
      $("#genderError").text("Please select your Gender.");
      isValid = false;
    }

    // Validate Password
    if (password.trim() === "") {
      $("#passwordError").text("Please enter your Password.");
      isValid = false;
    } else {
      // Test correct password with regex validation
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

      if (!passwordRegex.test(password)) {
        $("#passwordError").text("Please enter correct Password.");
        isValid = false;
      }
    }

    // Validate Confirm Password
    if (confirmPassword.trim() === "") {
      $("#confirmPasswordError").text("Please confirm your password.");
      isValid = false;
      // Check if the passwords match
    } else if (password !== confirmPassword) {
      $("#confirmPasswordError").text("Passwords do not match.");
      isValid = false;
    }

    // Show success message if all the fields are valid
    if (isValid) {
      const newUser = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        gender: gender,
        password: password,
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      $("#success").text("Registration Complete. Redirecting you to our shop.");

      setTimeout(() => {
        window.location.href = "books.html";
      }, 3000);
    }
    return false;
  });
});
