// authGuard.js - Protects owner dashboard & internal pages

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("ownerToken");

  if (!token) {
    alert("🔒 Unauthorized Access!\nPlease login first to access the Owner Dashboard.");
    window.location.href = "index.html";
    return;
  }

  // Verify token with backend
  fetch("https://suriyawan-backend-68z3.onrender.com/api/owner/verify", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        localStorage.removeItem("ownerToken");
        alert("🔐 Session expired or invalid token.\nPlease login again.");
        window.location.href = "index.html";
      }
    })
    .catch(err => {
      console.error("Token verification failed:", err);
      alert("⚠️ Connection issue or invalid response.\nRedirecting to login.");
      localStorage.removeItem("ownerToken");
      window.location.href = "index.html";
    });
});
