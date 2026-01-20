document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");
  const resp = document.getElementById("response-text");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resp.textContent = "Sending...";
    resp.style.color = "";
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email && password) {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!emailRegex.test(email)) {
        resp.textContent = "Invalid email format";
        resp.style.color = "red";
        return;
      }
      if (!passwordRegex.test(password)) {
        resp.textContent =
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
        resp.style.color = "red";
        return;
      }
    } else {
      resp.textContent = "Please fill in both email and password";
      resp.style.color = "red";
      return;
    }
    try {
      const r = await fetch("https://firstloginpage.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await r.text();
      resp.textContent = text || (r.ok ? "Success" : "Error");
      resp.style.color = r.ok ? "green" : "red";
      resp.style.backgroundColor = r.ok ? "#d4edda" : "#f8d7da";
    } catch (err) {
      resp.textContent = "Network error";
      resp.style.color = "red";
      console.error(err);
    }
  });
});
