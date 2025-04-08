document.getElementById('btnReset').addEventListener('click', function() {
    document.getElementById('countryDetails').innerHTML = '';
});


document.addEventListener("DOMContentLoaded", function () {
    // Fetch JSON data
    fetch("./travel_recommendation.json")
        .then(response => response.json())
        .then(data => {
            // Save data globally for use in search
            window.travelData = data;
            console.log("JSON Loaded:", window.travelData);
        })
        .catch(error => console.error("Error fetching JSON:", error));

    // Handle search form submission
    document.getElementById("searchform").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const searchQuery = document.getElementById("search").value.trim().toLowerCase();
        console.log("Search input:", searchQuery);

        let results = [];

        // Search by category keywords
        if (searchQuery === "beach" || searchQuery === "beaches") {
            window.travelData.beaches.forEach(beach => results.push(beach));
        } else if (searchQuery === "temples" || searchQuery === "temple") {
            window.travelData.temples.forEach(temple => results.push(temple));
        } else if (searchQuery === "countries" || searchQuery === "country") {
            window.travelData.countries.forEach(country => {
                country.cities.forEach(city => results.push(city));
            });
        } else {
            // Try matching a specific country
            const matchedCountry = window.travelData.countries.find(
                country => country.name.toLowerCase() === searchQuery
            );

            if (matchedCountry) {
                results = matchedCountry.cities;
            }
        }

        displayResults(results);
    });
});

// Function to display results
function displayResults(results) {
    const resultsDiv = document.getElementById('countryDetails');
    // Show the div when displaying results
    // resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('result-item');
        item.innerHTML = `
            <h2>${result.name} </h2>
            <img src="${result.imageUrl}" alt="${result.name}" style="max-width:300px; border-radius: 10px;">
            <p>${result.description}</p>
        `;
        resultsDiv.appendChild(item);
    });
}
