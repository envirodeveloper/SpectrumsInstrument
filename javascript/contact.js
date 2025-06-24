document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const text = await res.text(); // always read as text
    let data;

    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error("Server response was not JSON:", text);
      throw new Error("Invalid JSON response from server.");
    }

    if (data.success) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Failed to send: " + data.message);
    }
  } catch (error) {
    console.error("Contact form error:", error);
    alert("Error sending message. Try again.");
  }
});
