document.addEventListener('DOMContentLoaded', () => {
  const BACKEND_URL = 'https://suriyawan-backend-18.onrender.com'; // ✅ Backend URL

  const token = localStorage.getItem("ownerToken");

  if (!token) {
    alert("❌ Unauthorized! Please login first.");
    window.location.href = "login.html";
    return;
  }

  fetch(`${BACKEND_URL}/api/owner/full-dashboard`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      alert("⚠️ Session expired. Please login again.");
      localStorage.removeItem("ownerToken");
      window.location.href = "login.html";
      return;
    }

    // Phase 1–4: Summary
    document.getElementById('total-orders').innerText = data.totalOrders ?? '0';
    document.getElementById('revenue').innerText = `₹${data.revenue ?? '0'}`;
    document.getElementById('delivery-boys').innerText = data.deliveryBoys ?? '0';
    document.getElementById('sellers').innerText = data.sellers ?? '0';

    // Phase 5–10: Portal Management
    document.getElementById('active-portals').innerText = data.activePortals.join(", ");
    document.getElementById('blocked-portals').innerText = data.blockedPortals.join(", ");

    // Phase 11–15: Add-on tools and features
    document.getElementById('tools-added').innerText = data.toolsAdded ?? '0';
    document.getElementById('websites-added').innerText = data.websitesAdded ?? '0';
    document.getElementById('apps-launched').innerText = data.appsLaunched ?? '0';

    // Phase 16–20: Control Logs
    document.getElementById('last-activity').innerText = data.lastActivity ?? 'Unknown';
    document.getElementById('admin-log').innerText = data.adminLog ?? 'No logs found';

    // Phase 21–25: Dynamic content
    document.getElementById('total-customers').innerText = data.customers ?? '0';
    document.getElementById('ai-status').innerText = data.aiAssistantStatus ?? 'Disabled';
    document.getElementById('currency-used').innerText = data.currency ?? 'INR';
  })
  .catch(error => {
    console.error("❌ Dashboard Load Error:", error);
    alert("⚠️ Could not load dashboard data.");
  });
});
