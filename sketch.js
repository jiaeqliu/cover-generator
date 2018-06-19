//var song;
//
//function preload() {
//    song = loadSound("media/2017_12_13 deep soul.mp3");
//}
//
//function setup() {
//    createCanvas(200, 200);
//    song.play();
//}
//
//function draw() {
//    background(0);
//}

/*
 * getLevel() from the p5.Amplitude object
 * and map it to the ellipse position.
 */
var button;
var mic, soundFile;
var amplitude;
var mapMax = 1.0;

function preload() {
    // load the sound, but don't play it yet
    soundFile = loadSound('media/2017_12_13 deep soul.mp3')
}

function togglePlaying() {
    if(!soundFile.isPlaying()) {
        soundFile.play();   
        button.html("pause");
    } else {
        soundFile.pause();
        button.html("play");
    }
}

function setup() {
    c = createCanvas(windowWidth, windowHeight);
    background(255);
    fill(255);
    noStroke();

    button = createButton("play");
    button.position(width/2, height/2);
    button.mousePressed(togglePlaying);
        
//    mic = new p5.AudioIn();
//    mic.start();

    amplitude = new p5.Amplitude();
    amplitude.setInput(soundFile);
    amplitude.smooth(0.8); // <-- try this!
    
    peaks = soundFile.getPeaks();
    console.log(peaks);
}

function draw() {
    background(0);

    var level = amplitude.getLevel();
    text('Amplitude: ' + level, 20, 20);
    text('mapMax: ' + mapMax, 20, 40);

    // map ellipse height
    var ellipseHeight = map(level, 0, mapMax, height, 0);
    ellipse(width/2, ellipseHeight, 100, 100);
}