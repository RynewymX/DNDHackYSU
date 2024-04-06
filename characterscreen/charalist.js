document.addEventListener("DOMContentLoaded", function () {
    const characterList = document.getElementById("characterList");
    const characterDetails = document.getElementById("characterDetails");

    // Function to import JSON file
    function importJSON(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(JSON.parse(reader.result));
            reader.onerror = error => reject(error);
            reader.readAsText(file);
        });
    }

    // Function to add character to list
    function addCharacterToList(character) {
        const characterItem = document.createElement("div");
        characterItem.classList.add("character-item");

        const characterNameElement = document.createElement("span");
        characterNameElement.textContent = character.character_name;
        characterNameElement.addEventListener("click", () => {
            showCharacterDetails(character);
        });
        characterItem.appendChild(characterNameElement);

        const removeButton = document.createElement("img");
        removeButton.src = "imgs/trashicon.webp"; // Replace with the path to your remove button image
        removeButton.alt = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
            removeCharacter(character);
            characterList.removeChild(characterItem);
        });
        characterItem.appendChild(removeButton);

        characterList.appendChild(characterItem);
        saveCharacter(character);
    }

    // Function to remove character from localStorage
    function removeCharacter(character) {
        let characters = JSON.parse(localStorage.getItem("characters")) || [];
        characters = characters.filter(char => char.character_name !== character.character_name);
        localStorage.setItem("characters", JSON.stringify(characters));
    }

    // Function to save character to localStorage
    function saveCharacter(character) {
        const characters = JSON.parse(localStorage.getItem("characters")) || [];
        characters.push(character);
        localStorage.setItem("characters", JSON.stringify(characters));
    }

    // Function to load characters from localStorage
    function loadCharacters() {
        const characters = JSON.parse(localStorage.getItem("characters")) || [];
        const characterNamesInList = new Set();
        characterList.innerHTML = ''; // Clear the character list before loading

        characters.forEach((character) => {
            if (!characterNamesInList.has(character.character_name)) {
                addCharacterToList(character);
                characterNamesInList.add(character.character_name);
            }
        });
    }

    // Load characters when the page is loaded
    loadCharacters();

    // Input element to upload JSON file
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        try {
            const jsonData = await importJSON(file);
            addCharacterToList(jsonData);
        } catch (error) {
            console.error("Error importing JSON file:", error);
        }
    });
    document.body.appendChild(fileInput);

    function showCharacterDetails(character) {
        const statsList = Object.entries(character.character_stats).map(([stat, value]) => `<li>${stat}: ${value}</li>`).join("");
        characterDetails.innerHTML = `
            <h2>${character.character_name}</h2>
            <p>Class: ${character.character_class}</p>
            <p>Level: ${character.character_level}</p>
            <h3>Stats:</h3>
            <ul>${statsList}</ul>
            <img src=${character.character_icon} alt="Character Icon"></img>
        `;
    }
});
