// logout.js - Secure Owner logout functionality

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (!logoutBtn) {
    console.warn("⚠️ Logout button not found!");
    return;
  }

  logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("🚪 आप वाकई लॉगआउट करना चाहते हैं?");

    if (confirmLogout) {
      // 🔐 Clear all owner data
      localStorage.removeItem("ownerToken");
      localStorage.removeItem("ownerData");

      // 🚀 Optional: Clear everything for full reset
      // localStorage.clear();

      // ✅ Redirect to secure login
      window.location.href = "login.html"; // or use "index.html" if that's your login page
    }
  });
});
