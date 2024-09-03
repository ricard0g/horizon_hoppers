// Fetch and Show Results
const searchResults = [];

async function fetchResults() {
	try {
		const regex = /\b(?:beach|beaches|city|cities|temple|temples)\b/i;
		const inputValue = document.getElementById("search").value.toLowerCase();

		if (inputValue) {
			const response = await fetch("./travel_recommendation_api.json");

			if (response) {
				const jsonResponse = await response.json();

				switch (true) {
					case regex.test(inputValue):
						showCategoryRecommendation(jsonResponse, inputValue);
						document.getElementById("search").value = "";
						break;
					default:
						showSpecificRecommendation(jsonResponse, inputValue);
						document.getElementById("search").value = "";
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
}

// Display Category Recommendation

function showCategoryRecommendation(travelRecommendationJson, inputValue) {
	console.log(`This was the input in this case ---> ${inputValue}`);
}

// Display Specific Recommendation

function showSpecificRecommendation(travelRecommendationJson, inputValue) {
	const citiesArr = [];

	travelRecommendationJson.countries.map((country) => {
		country.cities.forEach((city) => citiesArr.push(city));
	});

	const cityFound = citiesArr.find(
		(city) => city.name.toLowerCase().includes(inputValue) === true
	);

	const templeFound = travelRecommendationJson.temples.find(
		(temple) => temple.name.toLowerCase().includes(inputValue) === true
	);

	const beachFound = travelRecommendationJson.beaches.find(
		(beach) => beach.name.toLowerCase().includes(inputValue) === true
	);

	if (cityFound) {
		const resultsContainer = document.createElement("div");
		resultsContainer.id = "search-results";

		Object.assign(resultsContainer.style, {
			position: "absolute",
			top: "0",
			right: "0",
			maxHeight: "90vh",
			width: "20vw",
		});

		const resultsList = document.createElement("ul");

		Object.assign(resultsList.style, {
			listStyle: "none",
			padding: "0",
			margin: "0",
		});

		const listItem = document.createElement("li");

		Object.assign(listItem.style, {
			height: "auto",
			width: "100%",
			marginBottom: "5%",
			backgroundColor: "white",
		});

		const listItemImage = document.createElement("img");

		Object.assign(listItemImage.style, {
			maxWidth: "50%",
			borderRadius: "10px",
		});

		const listItemTitle = document.createElement("h1");

		Object.assign(listItemTitle.style, {
			fontSize: "1.125rem",
			color: "black",
		});
	} else if (templeFound) {
	} else if (beachFound) {
	}
}
