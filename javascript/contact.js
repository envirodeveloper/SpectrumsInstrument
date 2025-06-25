  window.onload = function () {
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const submitText = document.getElementById("submit-text");
    const spinner = document.getElementById("spinner");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Show spinner, hide text
      submitBtn.disabled = true;
      submitText.style.display = "none";
      spinner.style.display = "inline-block";

      try {
        const res = await fetch("https://spectrumsinstrument.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        });

        const text = await res.text();
        let data;

        try {
          data = JSON.parse(text);
        } catch (jsonErr) {
          console.error("Server response was not JSON:", text);
          throw new Error("Invalid JSON response from server.");
        }

        if (data.success) {
          alert("Message sent successfully!");
          form.reset();
        } else {
          alert("Failed to send: " + data.message);
        }
      } catch (error) {
        console.error("Contact form error:", error);
        alert("Error sending message. Try again.");
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitText.style.display = "inline";
        spinner.style.display = "none";
      }
    });
  };