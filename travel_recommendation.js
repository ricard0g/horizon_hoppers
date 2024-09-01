// Fetch and Show Results
const searchResults = [];

async function fetchResults() {
    try {
        const inputValue = document.getElementById("search").value.toLowerCase();
        
        if (inputValue) {
            const response = await fetch('./travel_recommendation_api.json');

            if (response) {
                const jsonResponse = await response.json();
            }
        }
    } catch(error) {
        console.log(error)
    }
}