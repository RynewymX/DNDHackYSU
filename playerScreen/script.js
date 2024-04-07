document.addEventListener("DOMContentLoaded", function () {
    // Function to parse query parameters from URL
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Retrieve character information from query parameters
    const character = JSON.parse(getQueryParameter("character"));

    // Store initial position of characterIcon
    let characterIconPosition = { x: 0, y: 0 };

    // Function to move characterIcon
    function moveCharacterIcon(x, y) {
        characterIconPosition.x += x;
        characterIconPosition.y += y;
        document.getElementById("characterIcon").style.transform = `translate(${characterIconPosition.x}px, ${characterIconPosition.y}px)`;
    }

    // Event listener for keydown events
    document.addEventListener("keydown", function(event) {
        switch(event.key) {
            case "ArrowUp":
                moveCharacterIcon(0, -50);
                break;
            case "ArrowDown":
                moveCharacterIcon(0, 50);
                break;
            case "ArrowLeft":
                moveCharacterIcon(-50, 0);
                break;
            case "ArrowRight":
                moveCharacterIcon(50, 0);
                break;
        }
    });

    // Display character name and icon
    const characterNameElement = document.getElementById("characterName");
    const characterIconElement = document.getElementById("characterIcon");

    if (characterNameElement && characterIconElement) {
        if (character) {
            const characterName = character.character_name;
            const characterIcon = character.character_icon;

            characterNameElement.textContent = characterName || "Unknown";

            if (characterIcon) {
                // Create an img element for the character icon
                const iconImg = document.createElement("img");
                iconImg.src = characterIcon;
                iconImg.alt = "Character Icon";
                characterIconElement.appendChild(iconImg);
            }
        } else {
            console.error("Character information not provided in URL.");
        }
    } else {
        console.error("Character name or icon element not found in DOM.");
    }

    // Establish WebSocket connection
    const socket = new WebSocket(`ws://localhost:8000/ws`);

    socket.onopen = () => {
        console.log("WebSocket connection established.");
        // Send character information to the server
        if (character) {
            socket.send(JSON.stringify(character));
        }
    };

    socket.onmessage = (event) => {
        console.log("Message received from server:", event.data);
        // You can handle the message received from the server here
    };

    socket.onclose = () => {
        console.log("WebSocket connection closed.");
    };
});
