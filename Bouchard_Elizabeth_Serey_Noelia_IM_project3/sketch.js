// All code is developed from the examples provided to us in class. 
let cam;
let poseNet;
//claim the buttons and controller
let btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, btn9;
let controller = "Color";
let controller2 = "Right-Handed";
let handL, handR;
let c;
let cHue;
let opacity;
let leftx2, lefty2, rightx2, righty2;
let song;

function preload() {
    img = loadImage('window2.png');
    img2 = loadImage('canvas.png');
    song = loadSound('streets.mp3');
}

setup = () => {
    createCanvas(windowWidth, windowHeight);
    cam = createCapture(VIDEO);
    cam.hide();
    cam.size(windowWidth, windowHeight);
    poseNet = ml5.poseNet(cam, {
        flipHorizontal: true //flips interaction
    }, modelReady);
    poseNet.on('pose', gotPoses);

    handL = createVector(width / 1, height / 2);
    handR = createVector(width / 1, height / 2);

    noStroke();

    //Create the new H Buttons
    btn1 = new HButton1((width / 2) + 570, height - 575, "Red");
    btn4 = new HButton4((width / 2) + 570, height - 500, "Orange");
    btn5 = new HButton5((width / 2) + 570, height - 425, "Yellow");
    btn2 = new HButton2((width / 2) + 570, height - 350, "Green");
    btn3 = new HButton3((width / 2) + 570, height - 275, "Blue");
    btn6 = new HButton6((width / 2) + 570, height - 200, "Magenta");

    btn7 = new HButton7((width / 2) - 600, height - 400, "Left-Handed");
    btn8 = new HButton7((width / 2) - 600, height - 500, "Right-Handed");

    push();
    scale(0.5, 0.5);
    image(img, 0, 0);
    pop();

    push();
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    image(img2, windowWidth / 4, 280);
    pop();

    opacity = 80;

    c = color(0, 0, 0, opacity)
    cHue = 255;
}

let gotPoses = (poses) => {
    //console.log(poses);
    //only detect if there is a person
    if (poses.length > 0) {
        handL.x = lerp(poses[0].pose.keypoints[9].position.x, handL.x, 0.5);
        handL.y = lerp(poses[0].pose.keypoints[9].position.y, handL.y, 0.5);
        handR.x = lerp(poses[0].pose.keypoints[10].position.x, handR.x, 0.5);
        handR.y = lerp(poses[0].pose.keypoints[10].position.y, handR.y, 0.5);
        leftx2 = handL.x;
        lefty2 = handL.y;
        rightx2 = handR.x;
        righty2 = handR.y;
    }
}

let modelReady = () => {
    console.log('model ready');
    song.play();
    song.setVolume(0.5);
}

draw = () => {
    //draw the buttons onto the screen, pass in hand positions to check if over the buttons
    btn1.update(handL.x, handL.y, handR.x, handR.y);
    btn2.update(handL.x, handL.y, handR.x, handR.y);
    btn3.update(handL.x, handL.y, handR.x, handR.y);
    btn4.update(handL.x, handL.y, handR.x, handR.y);
    btn5.update(handL.x, handL.y, handR.x, handR.y);
    btn6.update(handL.x, handL.y, handR.x, handR.y);
    btn7.update(handL.x, handL.y, handR.x, handR.y);
    btn8.update(handL.x, handL.y, handR.x, handR.y);

    cHue = (handL.y / width) * 360;

    //draw the content
    fill(50);
    textAlign(CENTER);
    textSize(48);
    if (controller == "Red") {
        c = color(cHue, 0, 0, opacity);
    }
    if (controller == "Orange") {
        c = color(255, 165, 0, opacity);
    }
    if (controller == "Yellow") {
        c = color(cHue, cHue, 0, opacity);
    }
    if (controller == "Green") {
        c = color(0, cHue, 0, opacity);
    }
    if (controller == "Blue") {
        c = color(0, 0, cHue, opacity);
    }
    if (controller == "Magenta") {
        c = color(cHue, 0, cHue, opacity);
    }
    if (controller2 == "Right-Handed") {
        if (handR.x > 425 && handR.x < 1200 && handR.y > 300 && handR.y < 820) {
            //draw the hands onto the screen
            push();
            strokeWeight(30);
            stroke(c);
            line(handR.x, handR.y, rightx2, righty2);
            pop();
        } else {
            strokeWeight(60);
        }
    }
    if (controller2 == "Left-Handed") {
        if (handL.x > 425 && handL.x < 1200 && handL.y > 300 && handL.y < 820) {
            //draw the hands onto the screen
            push();
            strokeWeight(30);
            stroke(c);
            line(handL.x, handL.y, leftx2, lefty2);
            pop();
        } else {
            strokeWeight(60);
        }
    }
    console.log(controller2);
}

//The Class for the Hover Buttons
class HButton1 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#FF0000');
        rect(this.x, this.y, 120, 40);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#8B0000');
        rect(this.x, this.y, this.hover, 40);

        rectMode(CORNERS);
        fill('white');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
class HButton2 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#00FF00');
        rect(this.x, this.y, 120, 40);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#008000');
        rect(this.x, this.y, this.hover, 40);

        rectMode(CORNERS);
        fill('black');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
class HButton3 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#0000FF');
        rect(this.x, this.y, 120, 40);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#000080');
        rect(this.x, this.y, this.hover, 40);

        rectMode(CORNERS);
        fill('white');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
class HButton4 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#FFA500');
        rect(this.x, this.y, 120, 40);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#FF8C00');
        rect(this.x, this.y, this.hover, 40);

        rectMode(CORNERS);
        fill('black');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
class HButton5 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#FFFF00');
        rect(this.x, this.y, 120, 40);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#FFD700');
        rect(this.x, this.y, this.hover, 40);

        rectMode(CORNERS);
        fill('black');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
class HButton6 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#FF00FF');
        rect(this.x, this.y, 120, 40);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#C71585');
        rect(this.x, this.y, this.hover, 40);

        rectMode(CORNERS);
        fill('black');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}
class HButton7 {
    constructor(posX, posY, label) {
        this.x = posX;
        this.y = posY;
        this.label = label;
        this.hover = 0;
    }

    update(lx, ly, rx, ry) {
        rectMode(CENTER);
        fill('#F8F8FF');
        rect(this.x, this.y, 180, 50);

        let ld = dist(this.x, this.y, lx, ly);
        let rd = dist(this.x, this.y, rx, ry);

        if (ld < 50 || rd < 50) {
            this.hover += 2;
            if (this.hover > 120) {
                controller2 = this.label;
                this.hover -= 6;
            }
        } else {
            if (this.hover > 0) this.hover -= 6;
            if (this.hover < 0) this.hover = 0;

        }
        fill('#808080');
        rect(this.x, this.y, this.hover, 50);

        rectMode(CORNERS);
        fill('black');
        textAlign(CENTER);
        textSize(24);
        text(this.label, this.x, this.y + 9);
    }
}

keyPressed = () => {
    if (key == 's' || key == 'S') saveCanvas('MyDrawing', 'png');
}
keyPressed = () => {
    if (key == 'x' || key == 'X') push();
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    image(img2, windowWidth / 4, 280);
    pop();
}
