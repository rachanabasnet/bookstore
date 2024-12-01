$(document).ready(function () {
  $("#editDiv").hide();

  const profile = document.getElementById("profileInfo");
  const profileDiv1 = document.createElement("div");
  const profileDiv2 = document.createElement("div");
  profileDiv1.classList.add("imageDiv");
  profileDiv2.classList.add("details");

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user) {
    window.location.href = "login.html";
  }

  profileDiv1.innerHTML = `
      <img src="images/default-profile-pic.jpg" alt="User" />
      <button class="btn primaryBtn" id="editBtn">Edit Profile</button>
      <button class="btn secBtn" id="logout">Logout</button>
  `;

  profileDiv2.innerHTML = `
      <div class="profileRow">
        <div><strong>Name</strong></div>
        <div>${user.firstName} ${user.lastName}</div>
      </div>
      <div class="profileRow">
        <div><strong>Email</strong></div>
        <div>${user.email}</div>
      </div>
      <div class="profileRow">
        <div><strong>Gender</strong></div>
        <div style="text-transform:capitalize;">${user.gender}</div>
      </div>
      <div class="profileRow">
        <div><strong>Address</strong></div>
        <div>${user.address}</div>
      </div>
  `;

  profile.appendChild(profileDiv1);
  profile.appendChild(profileDiv2);

  $("#logout").click(function (event) {
    event.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  $("#editBtn").click(function (event) {
    event.preventDefault();

    $("#firstName").val(user.firstName);
    $("#lastName").val(user.lastName);
    $("input[name='gender'][value='" + user.gender + "']").prop(
      "checked",
      true,
    );
    $("#address").val(user.address);
    $("#editDiv").show();
  });

  $("#cancelBtn").click(function (event) {
    event.preventDefault();
    $("#editDiv").hide();
  });

  $("#save").click(function (event) {
    event.preventDefault();
    // Clear previous error messages
    $(".error").text("");
    $("#success").text("");

    let isValid = true;
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const gender = $("input[name='gender']:checked").val();
    const address = $("#address").val();

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

    if (isValid) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.gender = gender;
      user.address = address;

      // Parse users from localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if the user already exists
      const userIndex = users.findIndex((u) => u.username === user.username);

      if (userIndex !== -1) {
        // Update the existing user
        users[userIndex] = user;
      }

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      window.location.reload();
    }
    return false;
  });
});
