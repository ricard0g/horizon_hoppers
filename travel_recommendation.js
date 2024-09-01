// Fetch and Show Results
const searchResults = [];

async function fetchResults(input) {
    try {
        const inputValue = document.getElementById("search").value.toLowerCase();
        const response = await fetch('./travel_recommendation_api.json');
        
        if (inputValue && response) {
            const jsonResponse = await response.json();
            console.log(typeof jsonResponse[input])
        }
    } catch(error) {
        console.log(error)
    }
}