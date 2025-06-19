document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("login-message");
  const statusBox = document.getElementById("status-box");

  try {
    const response = await fetch("https://suriyawan-backend-68z3.onrender.com/api/owner/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("ownerToken", data.token);
      statusBox.innerText = "✅ Login successful! Redirecting...";
      message.innerText = "";
      window.location.href = "dashboard.html";
    } else {
      message.innerText = "❌ Invalid username or password.";
      statusBox.innerText = "";
    }
  } catch (err) {
    message.innerText = "⚠️ Server error. Please try again later.";
    console.error(err);
  }
});
