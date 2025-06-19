// 🔐 authGuard.js - Protect Owner Pages (Real-Time Verified)

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("ownerToken");

  if (!token) {
    alert("🔒 Unauthorized Access!\nPlease login first.");
    window.location.href = "index.html";
    return;
  }

  // ✅ Verify token with backend
  fetch("https://suriyawan-backend-68z3.onrender.com/api/owner/verify", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        // Token invalid or expired
        localStorage.removeItem("ownerToken");
        alert("🔐 Session expired.\nPlease login again.");
        window.location.href = "index.html";
      }
    })
    .catch(err => {
      console.error("⚠️ Token verification failed:", err);
      localStorage.removeItem("ownerToken");
      alert("⚠️ Network error or invalid token.\nRedirecting to login...");
      window.location.href = "index.html";
    });

  // 💡 Optional: Show loading spinner until verification completes
});
