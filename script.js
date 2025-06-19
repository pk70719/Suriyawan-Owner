// Suriyawan-Owner/script.js
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("❌ Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const messageBox = document.getElementById("login-message");
    const statusBox = document.getElementById("status-box");
    const submitButton = loginForm.querySelector("button[type='submit']");

    const email = emailInput.value.trim();

    if (!email) {
      messageBox.innerText = "⚠️ कृपया ईमेल दर्ज करें।";
      messageBox.style.color = "red";
      return;
    }

    submitButton.disabled = true;
    submitButton.innerText = "⏳ लॉगिन हो रहा है...";

    try {
      const response = await fetch("https://suriyawan-backend-68z3.onrender.com/api/owner/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: email })
      });

      const data = await response.json();

      if (response.ok && data.success && data.token) {
        messageBox.innerText = data.message || "✅ लॉगिन सफल!";
        messageBox.style.color = "green";

        // 🔐 Store secure login data
        localStorage.setItem("ownerToken", data.token);
        localStorage.setItem("ownerData", JSON.stringify(data.owner || {}));

        statusBox.innerText = "✅ लॉगिन सफल। डैशबोर्ड पर जा रहे हैं...";
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1500);
      } else {
        messageBox.innerText = data.message || "❌ अमान्य ईमेल!";
        messageBox.style.color = "red";
      }

    } catch (err) {
      console.error("❌ Server error during login:", err);
      messageBox.innerText = "❌ सर्वर त्रुटि। कृपया बाद में पुनः प्रयास करें।";
      messageBox.style.color = "red";
    } finally {
      submitButton.disabled = false;
      submitButton.innerText = "Login";
    }
  });
});
