const toggleBtn = document.getElementById("toggleBtn");
const navLinks = document.getElementById("navLinks");

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      document.getElementById("statusMessage").textContent =
        "Thank you for your message!";
      document.getElementById("contactForm").reset();
    } else {
      document.getElementById("statusMessage").textContent =
        "Error: Unable to submit your message.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("statusMessage").textContent =
      "Error: Unable to connect to the server.";
  }
});
