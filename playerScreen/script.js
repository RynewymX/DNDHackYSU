// Function to parse query parameters from URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded event fired");
    
    // Retrieve character information from query parameters
    const characterName = getQueryParameter("name");
    const characterIcon = getQueryParameter("icon");

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

async function logMovies() {
    const response = await fetch("http://10.247.71.30:5000/test");
    const movies = await response.json();
    console.log(movies);
  }

logMovies();

async function checkForOtherPlayers() {
    try {
        const response = await fetch("http://10.247.71.30:5000/players");
        if (response.ok) {
            const players = await response.json();
            for (const player of players) {
                if (player.id !== currentPlayerId) {
                    try {
                        const response = await fetch(`http://10.247.71.30:5000/player/${player.id}`);
                        if (response.ok) {
                            const playerData = await response.json();
                            console.log(`Data of player ${player.id}:`, playerData);
                        } else {
                            console.error(`Failed to download data of player ${player.id}.`);
                        }
                    } catch (error) {
                        console.error(`Error while downloading data of player ${player.id}:`, error);
                    }
                }
            }
        } else {
            console.error("Failed to fetch other players' data.");
        }
    } catch (error) {
        console.error("Error while fetching other players' data:", error);
    }
}

async function informOtherPlayers(playerData) {
    try {
        const response = await fetch("http://10.247.71.30:5000/player/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playerData)
        });
        if (response.ok) {
            console.log("Other players informed about the joining player.");
        } else {
            console.error("Failed to inform other players about the joining player.");
        }
    } catch (error) {
        console.error("Error while informing other players:", error);
    }
}

const currentPlayerId = "player123";
informOtherPlayers(currentPlayerData); 
checkForOtherPlayers(); 
