document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("email").value.trim();
    const messageBox = document.getElementById("login-message");
    const statusBox = document.getElementById("status-box");

    if (!username) {
      messageBox.innerText = "⚠️ Username required";
      messageBox.style.color = "red";
      return;
    }

    const submitButton = loginForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "⏳ Logging in...";

    try {
      const response = await fetch("https://suriyawan-backend-68z3.onrender.com/api/owner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })  // ❌ no password
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("ownerToken", data.token);
        localStorage.setItem("ownerData", JSON.stringify(data.owner || {}));

        statusBox.innerText = "✅ Login successful. Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        messageBox.innerText = data.message || "❌ Login failed!";
        messageBox.style.color = "red";
      }

    } catch (error) {
      messageBox.innerText = "❌ Server error!";
      messageBox.style.color = "red";
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  });
});
