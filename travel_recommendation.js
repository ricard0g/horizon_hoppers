// Fetch and Show Results
const searchResults = [];

async function fetchResults() {
	try {
		const inputValue = document.getElementById("search").value.toLowerCase();

		if (inputValue) {
			const response = await fetch("./travel_recommendation_api.json");

			if (response) {
				const jsonResponse = await response.json();

				showFilteredResults(jsonResponse, inputValue);
			}
		}
	} catch (error) {
		console.log(error);
	}
}

// Display Results

function showFilteredResults(travelRecommendationJson, inputValue) {
	const citiesArr = []

    travelRecommendationJson.countries.map(country => {
        country.cities.forEach(city => citiesArr.push(city));
    })

    const cityFound = citiesArr.find(city => city.name.toLowerCase().includes(inputValue) === true);

    console.log(cityFound);
}
