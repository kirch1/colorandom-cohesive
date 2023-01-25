var colorWidgetParent = document.querySelector('.color-widget-parent');
var newPaletteButton = document.querySelector('#new-palette');
var savePaletteButton = document.querySelector('#save-palette');
var savedSection = document.querySelector('aside');

var currentPalette = new Palette();
var savedPalettes = [];

window.addEventListener('load', loadPage);
newPaletteButton.addEventListener('click', changePaletteColors);
savePaletteButton.addEventListener('click', savePalette);
colorWidgetParent.addEventListener('click', toggleColorLock);
savedSection.addEventListener('click', deleteSavedPalette);
savedSection.addEventListener('dblclick', recallSavedPalette);


var dragID;
savedSection.addEventListener('dragstart', function(event) {
    dragID = event.target.id;
})
colorWidgetParent.addEventListener('dragover', function(event){
    event.preventDefault();
});
colorWidgetParent.addEventListener('drop', function(event) {
    for (var i = 0; i < savedPalettes.length; i++) {
        if (savedPalettes[i].id == dragID) {
            currentPalette = savedPalettes[i]
        }
    }
    displayCurrentPalette();
})


function loadPage() {
    displayCurrentPalette();
}

function displayCurrentPalette() {
    colorWidgetParent.innerHTML = '';
    for (var i = 0; i < 5; i++) {
        var imgString = 'Unlock.png';
        var altText = "Unlock icon";
        if (currentPalette.colors[i].locked) {
            imgString = 'Lock.png';
            altText = "Lock icon";
        }
        colorWidgetParent.innerHTML +=
            `<article class="color-widget">
                <div data-index-number="${i}" style="background-color:${currentPalette.colors[i].hex}" class="color-box"></div>
                <div class="color-box-footer">
                    <p style="font-size: 3vmin;">${currentPalette.colors[i].hex}</p>
                    <img src="./assets/${imgString}" alt="${altText}">
                </div>
            </article>`;           
    }
}

function displaySavedPalettes() {
    savedSection.innerHTML = `<h3>Saved Palettes</h3>Drag & Drop to Recall`;
    for (var i = 0; i < savedPalettes.length; i++) {
        savedSection.innerHTML += 
        `<article draggable="true" class="single-saved-palette" id="${savedPalettes[i].id}">
            <div class="mini-color-box" style="background-color: ${savedPalettes[i].colors[0].hex}"></div>
            <div class="mini-color-box" style="background-color: ${savedPalettes[i].colors[1].hex}"></div>
            <div class="mini-color-box" style="background-color: ${savedPalettes[i].colors[2].hex}"></div>
            <div class="mini-color-box" style="background-color: ${savedPalettes[i].colors[3].hex}"></div>
            <div class="mini-color-box" style="background-color: ${savedPalettes[i].colors[4].hex}"></div>
            <img src="./assets/Delete.png" alt="Delete icon">
        </article>`;
    }
    if(savedPalettes.length === 0) {
        savedSection.innerHTML = `<h3>Saved Palettes</h3>`;
    }
}

function changePaletteColors() {
    currentPalette.replaceColors();
    displayCurrentPalette();
}

function toggleColorLock(event) {
    if(event.target.className === 'color-box') {
        var selectedColorIndex = event.target.dataset.indexNumber;
        currentPalette.toggleColorLock(selectedColorIndex);
        displayCurrentPalette();
    }
}

function savePalette() {
    var newSavedPalette = new Palette([...currentPalette.colors]);
    savedPalettes.push(newSavedPalette);
    displaySavedPalettes();
    changePaletteColors();
}

function deleteSavedPalette(event) {
    if(event.target.tagName === 'IMG') {
        var clickedPaletteId = event.target.parentElement.id;
        for (var i = 0; i < savedPalettes.length; i++) {
            if (savedPalettes[i].id == clickedPaletteId) {
                savedPalettes.splice(i, 1);
                break;
            }
        }
        displaySavedPalettes();
    }
}

function recallSavedPalette(event) {
    if(event.target.className === 'mini-color-box') {
        var clickedPaletteId = event.target.parentElement.id;
        for (var i = 0; i < savedPalettes.length; i++) {
            if (savedPalettes[i].id == clickedPaletteId) {
                currentPalette = new Palette([...savedPalettes[i].colors]);
            }
        }
        displayCurrentPalette();
    }
}

function getRandomHex() {
    var characters = 'ABCDEF0123456789'.split('');
    var hexCode = '#';
    for (var i = 0; i < 6; i++) {
        var randomNum = Math.floor(Math.random() * characters.length);
        hexCode += characters[randomNum];
    }
    return hexCode;
}
