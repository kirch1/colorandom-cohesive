function getCohesivePalette() {
    var color1 = getRandomHSL();
    var color2 = getRotatedHueColor(color1, 180);
    var color3 = getRotatedHueColor(color1, 90);
    var color4 = getRotatedHueColor(color1, 270);
    var color5 = adjustLightness(color4);
  
    return [
        new Color(HSLToHex(color1)),
        new Color(HSLToHex(color2)),
        new Color(HSLToHex(color3)),
        new Color(HSLToHex(color4)),
        new Color(HSLToHex(color5))
    ]
}
  
function getRandomHSL() {
    var h = Math.floor(Math.random() * 360);
    var maxS = 100;
    var minS = 20;
    var s = Math.floor(Math.random() * (maxS - minS + 1)) + minS;
    var maxL = 90;
    var minL = 30;
    var l = Math.floor(Math.random() * (maxL - minL + 1)) + minL;
    return [h,s,l];
}
  
function getRotatedHueColor(color, degrees) {
    var newColor = [...color];

    var newAngle = color[0] + degrees;
    if(newAngle > 359) {
        newAngle = newAngle - 359;
    }
    newColor[0] = newAngle;

    return newColor;
}

function adjustLightness(color) {
    var newColor = [...color];
    var L = color[2];

    if(L > 50){
        L -= 35;
    }else{
        L += 35;
    }

    newColor[2] = L;
    return newColor;
}


function HSLToHex(color) {
    h = color[0]/360;
    s = color[1]/100;
    l = color[2]/100;
    
    var r;
    var g;
    var b;
    
    if(s === 0) {
      r = l;
      g = l;
      b = l;
    }else {
      function hue2rgb(p, q, t) {
        if (t < 0){
          t += 1;
        }
        if (t > 1){
          t -= 1;
        }
        if (t < 1 / 6){
          return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2){
          return q;
        }
        if (t < 2 / 3){
          return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
      };
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
