document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const resp = document.getElementById("response-text-login");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resp.textContent = "Signing in...";
    resp.style.color = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      const r = await fetch("https://firstloginpage.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await r.text();
      resp.textContent = text || (r.ok ? "Login successful" : "Login failed");
      resp.style.color = r.ok ? "green" : "red";
      if (r.ok) {
        // optional: redirect after successful login
        // window.location.href = "/dashboard.html";
      }
    } catch (err) {
      resp.textContent = "Network error";
      resp.style.color = "red";
      console.error(err);
    }
  });
});
