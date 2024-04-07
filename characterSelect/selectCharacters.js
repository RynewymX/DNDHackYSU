document.addEventListener("DOMContentLoaded", function () {
    const characterSelection = document.getElementById("characterSelection");

    // Retrieve characters from localStorage
    const characters = JSON.parse(localStorage.getItem("characters")) || [];

    // Display character options
    characters.forEach((character) => {
        const option = document.createElement("div");
        const link = document.createElement("a");
        link.textContent = character.character_name;
        link.href = `../playerScreen/map.html?character=${JSON.stringify(character)}`;
        option.appendChild(link);
        characterSelection.appendChild(option);
    });
});

//?name=${encodeURIComponent(character.character_name)}&level=${encodeURIComponent(character.character_level)}&spells=${encodeURIComponent(JSON.stringify(character.character_spells))}&stats=${encodeURIComponent(JSON.stringify(character.character_stats))}&icon=${encodeURIComponent(character.character_icon)}