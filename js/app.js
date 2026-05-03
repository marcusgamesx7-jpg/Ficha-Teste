// RPG Character Sheet Application in JavaScript

class Character {
    constructor(name, classType, level) {
        this.name = name;
        this.classType = classType;
        this.level = level;
        this.skills = [];
        this.rituals = [];
    }

    addSkill(skill) {
        this.skills.push(skill);
    }

    addRitual(ritual) {
        this.rituals.push(ritual);
    }

    saveCharacter() {
        const characterData = JSON.stringify(this);
        localStorage.setItem(this.name, characterData);
    }

    loadCharacter(name) {
        const characterData = localStorage.getItem(name);
        if (characterData) {
            const data = JSON.parse(characterData);
            Object.assign(this, data);
        }
    }

    exportCharacter() {
        const characterData = JSON.stringify(this);
        // Trigger a download with the character data
        const blob = new Blob([characterData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${this.name}.json`;
        link.click();
    }

    importCharacter(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const characterData = JSON.parse(event.target.result);
            Object.assign(this, characterData);
        };
        reader.readAsText(file);
    }
}

// Example usage
const myCharacter = new Character('Hero', 'Warrior', 1);
myCharacter.addSkill('Swordsmanship');
myCharacter.addRitual('Healing');
myCharacter.saveCharacter();

// To load a character
const loadedCharacter = new Character();
loadedCharacter.loadCharacter('Hero');

// To export a character
// myCharacter.exportCharacter();

// To import a character
// const fileInput = document.getElementById('fileInput');
// fileInput.addEventListener('change', (event) => {
//     myCharacter.importCharacter(event.target.files[0]);
// });