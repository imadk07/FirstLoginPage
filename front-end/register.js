document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const resp = document.getElementById("response-text");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resp.textContent = "Sending...";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const r = await fetch("https://firstloginpage.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await r.text();
      resp.textContent = text || (r.ok ? "Success" : "Error");
      if (r.ok) {
        resp.style.color = "green";
      } else {
        resp.style.color = "red";
      }
    } catch (err) {
      resp.textContent = "Network error";
      resp.style.color = "red";
      console.error(err);
    }
  });
});
