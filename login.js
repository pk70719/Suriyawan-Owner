// login.js
document.addEventListener("DOMContentLoaded", () => {
  const BACKEND_URL = "https://suriyawan-backend-68z3.onrender.com";
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("❌ Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("email").value.trim();
    const messageBox = document.getElementById("login-message");
    const statusBox = document.getElementById("status-box");

    if (!username) {
      messageBox.innerText = "⚠️ कृपया ईमेल डालें।";
      messageBox.style.color = "red";
      return;
    }

    const submitButton = loginForm.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.innerText = "⏳ लॉगिन हो रहा है...";

    try {
      const response = await fetch(`${BACKEND_URL}/api/owner/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        messageBox.innerText = data.message || "✅ लॉगिन सफल!";
        messageBox.style.color = "green";

        // Store session
        localStorage.setItem("ownerToken", data.token);
        localStorage.setItem("ownerData", JSON.stringify(data.owner || {}));

        statusBox.innerText = "🔁 Redirecting...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        messageBox.innerText = data.message || "❌ अमान्य लॉगिन!";
        messageBox.style.color = "red";
      }

    } catch (error) {
      console.error("Login error:", error);
      messageBox.innerText = "❌ सर्वर से कनेक्ट नहीं हो सका।";
      messageBox.style.color = "red";
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  });
});
