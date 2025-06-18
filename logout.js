// logout.js - Secure Owner logout functionality

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const confirmLogout = confirm("🚪 आप वाकई logout करना चाहते हैं?");

      if (confirmLogout) {
        // 🧹 Clear token from localStorage
        localStorage.removeItem("ownerToken");

        // ✅ Redirect to login/index page
        window.location.href = "index.html"; // or "login.html" based on your structure
      }
    });
  }
});
