document.getElementById("predict-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    rank: document.getElementById("rank").value,
    category: document.getElementById("category").value,
    gender: document.getElementById("gender").value,
    home_state: document.getElementById("home-state").value,
    round: document.getElementById("round").value
  };

  const response = await fetch("http://localhost:5000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const results = await response.json();
  const tbody = document.querySelector("#results-table tbody");
  tbody.innerHTML = "";

  results.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item['Institute']}</td>
      <td>${item['Academic Program Name']}</td>
      <td>${item['Closing Rank']}</td>
      <td>${item['Total Fees (4 years)']}</td>
      <td>${item['Avg Fees/Year']}</td>
      <td>${item['Average Package']}</td>
      <td>${item['Highest Package']}</td>
    `;
    tbody.appendChild(row);
  });
});