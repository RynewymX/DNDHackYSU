// Function to parse query parameters from URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve character information from query parameters
    const characterName = getQueryParameter("name");

    // Display character name in the top right corner
    const characterNameElement = document.getElementById("characterName");
    if (characterNameElement) {
        if (characterName !== null) {
            characterNameElement.textContent = characterName;
        } else {
            console.error("Character name not provided in URL.");
        }
    } else {
        console.error("Character name element not found in DOM.");
    }
});

// Function to toggle the dropdown menu
function toggleMenu() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}

// Function to handle the "Spells" button click
function showSpells() {
    console.log("Spells button clicked"); // Debugging statement
    // Retrieve character information from query parameters (assuming character data is stored in localStorage)
    const characterName = getQueryParameter("name");
    const characterSpells = getQueryParameter("spells");
    const characters = JSON.parse(localStorage.getItem("characters")) || [];
    
    // Find the selected character by name
    const selectedCharacter = characters.find(character => character.character_name === characterName);
    
    // Show spells
    if (selectedCharacter && selectedCharacter.character_spells) {
        alert(characterName +  "'s spells are " + characterSpells);
    } else {
        alert("No spells found for " + characterName);
    }
}

// Function to handle the "Import Map" button click
function importMap() {
    alert("Importing map...");
}
