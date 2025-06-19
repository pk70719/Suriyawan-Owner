document.addEventListener('DOMContentLoaded', () => {
  const BACKEND_URL = 'https://suriyawan-backend-68z3.onrender.com';
  const token = localStorage.getItem("ownerToken");

  if (!token) {
    alert("🔐 Unauthorized! Please login first.");
    window.location.href = "login.html";
    return;
  }

  // ✅ Fetch full dashboard data
  fetch(`${BACKEND_URL}/api/owner/full-dashboard`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) {
        alert("🔐 Session expired. Please login again.");
        localStorage.removeItem("ownerToken");
        window.location.href = "login.html";
        return;
      }

      // ✅ Summary Section
      setText("total-orders", data.totalOrders);
      setText("revenue", `₹${data.revenue}`);
      setText("delivery-boys", data.deliveryBoys);
      setText("sellers", data.sellers);
      setText("total-customers", data.customers);

      // ✅ Portal Management
      setText("active-portals", formatArray(data.activePortals));
      setText("blocked-portals", formatArray(data.blockedPortals));

      // ✅ Tools & Features
      setText("tools-added", data.toolsAdded);
      setText("websites-added", data.websitesAdded);
      setText("apps-launched", data.appsLaunched);

      // ✅ Control Logs
      setText("last-activity", data.lastActivity || 'Unknown');
      setText("admin-log", data.adminLog || 'No logs');

      // ✅ Dynamic Info
      setText("ai-status", data.aiAssistantStatus || 'Disabled');
      setText("currency-used", data.currency || 'INR');
    })
    .catch(err => {
      console.error("❌ Dashboard Fetch Error:", err);
      alert("⚠️ Unable to load dashboard. Please check your internet or server.");
    });

  // ✅ Utility Functions
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.innerText = value ?? '0';
  }

  function formatArray(arr) {
    return Array.isArray(arr) && arr.length ? arr.join(", ") : "None";
  }
});
