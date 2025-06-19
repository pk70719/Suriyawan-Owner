document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("❌ Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("login-message");
    const statusBox = document.getElementById("status-box");

    if (!email || !password) {
      messageBox.innerText = "⚠️ Please fill all fields.";
      messageBox.style.color = "red";
      return;
    }

    const submitButton = loginForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "⏳ Logging in...";

    try {
      const response = await fetch("https://suriyawan-backend-68z3.onrender.com/api/owner/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }) // ✅ Corrected here (was: username)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        messageBox.innerText = data.message || "✅ लॉगिन सफल!";
        messageBox.style.color = "green";

        localStorage.setItem("ownerToken", data.token);
        localStorage.setItem("ownerData", JSON.stringify(data.owner || {}));

        statusBox.innerText = "✅ Login successful. Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        messageBox.innerText = data.message || "❌ अमान्य क्रेडेंशियल्स!";
        messageBox.style.color = "red";
      }

    } catch (error) {
      console.error("Login error:", error);
      messageBox.innerText = "❌ Server error. Please try again later.";
      messageBox.style.color = "red";
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  });
});
