class Color {
    constructor(hex) {
        this.hex = hex || getRandomHex();
        this.locked = false;
    }
}

class Palette {
    constructor(paletteColors) {
        //this.colors = paletteColors || [new Color(),new Color(),new Color(),new Color(),new Color()];
        this.colors = paletteColors || getCohesivePalette();
        this.id = Date.now();
    }
    
    replaceColors() { 
        var lockFound = false;
        for(var i = 0; i < this.colors.length; i++) {
            if(this.colors[i].locked) {
                lockFound = true;
            }
        }
        if(lockFound) {
            for(var i = 0; i < this.colors.length; i++) {
                if(!this.colors[i].locked) {
                    this.colors[i] = new Color();
                }
            }
        }else{
            this.colors = getCohesivePalette();
        }

    }

    toggleColorLock(colorIndex) {
        this.colors[colorIndex].locked = !this.colors[colorIndex].locked;
    }
}
