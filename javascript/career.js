
console.log("Career JS loaded");

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  console.log("Form submitted");

  const form = e.target;
  const formData = new FormData(form);

  try {
    console.log("Sending fetch...");

    const res = await fetch("http://localhost:5000/api/careers", {
      method: "POST",
      mode: "cors",
      body: formData,
    });

    console.log("Fetch response received:", res);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Server response:", data);

    if (data.success) {
      alert("Application submitted successfully!");
      console.log("application submitted", data.success)
      // form.reset();
    } else {
      alert("Failed: " + data.message);
    }
  } catch (error) {
    console.error("Career form error:", error.message);
    alert("Something went wrong: " + error.message);
  }
});
