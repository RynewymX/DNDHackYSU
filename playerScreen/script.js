

// Function to parse query parameters from URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const character = JSON.parse(getQueryParameter("character"));

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
    
    // Retrieve character information from query parameters
    const characterName = character.character_name;
    const characterIcon = character.character_icon;

    console.log("Character Name:", characterName);
    console.log("Character Icon:", characterIcon);

    // Display character name in the top right corner
    const characterNameElement = document.getElementById("characterName");
    const characterIconElement = document.getElementById("characterIcon");

    console.log("Character Name Element:", characterNameElement);
    console.log("Character Icon Element:", characterIconElement);

    if (characterNameElement) {
        if (characterName !== null) {
            characterNameElement.textContent = characterName;
        } else {
            console.error("Character name not provided in URL.");
        }
    } else {
        console.error("Character name element not found in DOM.");
    }

    if (characterIconElement) {
        if (characterIcon !== null) {
            // Create an img element for the character icon
            const iconImg = document.createElement("img");
            iconImg.src = characterIcon;
            iconImg.alt = "Character Icon";
            characterIconElement.appendChild(iconImg);
        } else {
            console.error("Character icon not provided in URL.");
        }
    } else {
        console.error("Character icon element not found in DOM.");
    }
});

// Function to toggle the dropdown menu
function toggleMenu() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}

// Function to handle the "Spells" button click
function showSpells() {
    // Your showSpells function implementation
}





var client_id = Date.now();
const socket = new WebSocket(`ws://localhost:8000/ws/${client_id}`);

socket.onopen = () => {
  socket.send(JSON.stringify(character));
};

socket.onmessage = (event) => {
  console.log(event.data);
};

// Close the WebSocket connection when done
socket.onclose = () => {
  console.log("WebSocket connection closed.");
};