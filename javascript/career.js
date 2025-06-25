
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("career-submit-btn");
  const submitText = document.getElementById("career-submit-text");
  const spinner = document.getElementById("career-spinner");

  // Show spinner, hide text
  submitBtn.disabled = true;
  submitText.style.display = "none";
  spinner.style.display = "inline-block";

  const formData = new FormData(form);

  try {
    const res = await fetch("https://spectrumsinstrument.onrender.com/api/careers", {
      method: "POST",
      body: formData,
    });

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON response");
    }

    if (data.success) {
      alert("Application submitted successfully!");
      form.reset();
    } else {
      alert("Failed to submit: " + data.message);
    }
  } catch (err) {
    console.error("Career form error:", err);
    alert("An error occurred. Please try again.");
  } finally {
    // Restore button
    submitBtn.disabled = false;
    submitText.style.display = "inline";
    spinner.style.display = "none";
  }
});
