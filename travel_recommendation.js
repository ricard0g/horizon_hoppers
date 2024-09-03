// Fetch and Show Results
const searchResults = [];

async function fetchResults() {
	try {
		const regexCity = /\b(?:city|cities)\b/i;
		const regexRest = /\b(?:beach|beaches|temple|temples)\b/i;
		const inputValue = document.getElementById("search").value.toLowerCase();

		if (inputValue) {
			const response = await fetch("./travel_recommendation_api.json");

			if (response) {
				const jsonResponse = await response.json();

				switch (true) {
					case regexCity.test(inputValue):
						showCategoryRecommendation(jsonResponse.countries, inputValue);
						break;
					case regexRest.test(inputValue):
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

// Create Results Container for category iteration
function createCategoryResults(results) {
	const resultsContainer = document.createElement("div");
	resultsContainer.id = "search-results";

	Object.assign(resultsContainer.style, {
		position: "absolute",
		top: "9vh",
		right: "2vw",
		maxHeight: "90vh",
		width: "40vw",
		overflow: "scroll",
	});

	const resultsList = document.createElement("ul");

	Object.assign(resultsList.style, {
		listStyle: "none",
		padding: "0",
		margin: "0",
	});

	results.map((location) => {
		const listItem = document.createElement("li");

		Object.assign(listItem.style, {
			height: "auto",
			width: "100%",
			marginBottom: "5%",
			backgroundColor: "rgba(255, 255, 255, 0.8)",
			borderRadius: "10px",
			padding: "2vh",
		});

		const listItemImage = document.createElement("img");

		listItemImage.src = location.imageUrl;

		Object.assign(listItemImage.style, {
			maxWidth: "100%",
			borderRadius: "10px",
		});

		const listItemTitle = document.createElement("h1");

		listItemTitle.textContent = location.name;

		Object.assign(listItemTitle.style, {
			fontSize: "1.125rem",
			color: "black",
		});

		const listItemDescription = document.createElement("p");

		listItemDescription.textContent = location.description;

		Object.assign(listItemDescription.style, {
			color: "black",
		});

		listItem.appendChild(listItemImage);
		listItem.appendChild(listItemTitle);
		listItem.appendChild(listItemDescription);
		resultsList.appendChild(listItem);
	});

	resultsContainer.appendChild(resultsList);
	document.querySelector(".search-container").appendChild(resultsContainer);
}

// Display Category Recommendation

function showCategoryRecommendation(travelRecommendationJson, inputValue) {
	const results = document.getElementById("search-results");
	if (document.querySelector(".search-container").contains(results)) {
		document.querySelector(".search-container").removeChild(results);
	}

	const regexCity = /\b(?:city|cities)\b/i;
	const regexBeach = /\b(?:beach|beaches)\b/i;
	const regexTemple = /\b(?:temple|temples)\b/i;
	const citiesArr = [];
	if (regexCity.test(inputValue)) {
		travelRecommendationJson.map((country) => {
			country.cities.map((city) => citiesArr.push(city));
		});
	}

	if (citiesArr.length) {
		createCategoryResults(citiesArr);
	} else if (regexBeach.test(inputValue)) {
		createCategoryResults(travelRecommendationJson.beaches);
	} else if (regexTemple.test(inputValue)) {
		createCategoryResults(travelRecommendationJson.temples);
	}
}

// Create Results Container for Specific location
function createResultsContainer(result) {
	const resultsContainer = document.createElement("div");
	resultsContainer.id = "search-results";

	Object.assign(resultsContainer.style, {
		position: "absolute",
		top: "9vh",
		right: "2vw",
		maxHeight: "90vh",
		width: "40vw",
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
		backgroundColor: "rgba(255, 255, 255, 0.8)",
		borderRadius: "10px",
		padding: "2vh",
	});

	const listItemImage = document.createElement("img");

	listItemImage.src = result.imageUrl;

	Object.assign(listItemImage.style, {
		maxWidth: "100%",
		borderRadius: "10px",
	});

	const listItemTitle = document.createElement("h1");

	listItemTitle.textContent = result.name;

	Object.assign(listItemTitle.style, {
		fontSize: "1.125rem",
		color: "black",
	});

	const listItemDescription = document.createElement("p");

	listItemDescription.textContent = result.description;

	Object.assign(listItemDescription.style, {
		color: "black",
	});

	console.log(resultsContainer);

	resultsContainer.appendChild(resultsList);
	resultsList.appendChild(listItem);
	listItem.appendChild(listItemImage);
	listItem.appendChild(listItemTitle);
	listItem.appendChild(listItemDescription);
	document.querySelector(".search-container").appendChild(resultsContainer);
}

// Display Specific Recommendation

function showSpecificRecommendation(travelRecommendationJson, inputValue) {
	const results = document.getElementById("search-results");
	if (document.querySelector(".search-container").contains(results)) {
		document.querySelector(".search-container").removeChild(results);
	}

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
		createResultsContainer(cityFound);
	} else if (templeFound) {
		createResultsContainer(templeFound);
	} else if (beachFound) {
		createResultsContainer(beachFound);
	}
}
