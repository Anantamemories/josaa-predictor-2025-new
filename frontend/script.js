const form = document.getElementById("predict-form");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    rank: document.getElementById("rank").value,
    category: document.getElementById("category").value,
    gender: document.getElementById("gender").value,
    home_state: document.getElementById("home_state").value,
    round: document.getElementById("round").value
  };

  resultsDiv.innerHTML = "<p>Fetching predictions...</p>";

  fetch("https://josaa-backend.onrender.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch predictions.");
      }
      return response.json();
    })
    .then(result => {
      if (result.predictions && result.predictions.length > 0) {
        let html = "<h2>Predicted Colleges:</h2><ul>";
        result.predictions.forEach(college => {
          html += `<li><strong>${college["Institute"]}</strong> - ${college["Academic Program Name"]} (Closing Rank: ${college["Closing Rank"]})</li>`;
        });
        html += "</ul>";
        resultsDiv.innerHTML = html;
      } else {
        resultsDiv.innerHTML = "<p>No matching colleges found.</p>";
      }
    })
    .catch(error => {
      console.error(error);
      resultsDiv.innerHTML = `<p style='color: red;'>Error fetching predictions. Please try again later.</p>`;
    });
});