var song;
var tempo;

function preload() {
    song = loadJSON("tempo.json");
    // load the sound, but don't play it yet
//    soundFile = loadSound('media/2017_12_13 deep soul.mp3');
}

function setup() {
    console.log("song is: " + song);
    console.log("tempo in JSON song is: " + song.auftakt_result.overall_tempo);
    localStorage.setItem("temp",JSON.stringify(song));
    tempo = JSON.parse(localStorage.getItem("temp"));
    console.log("parsed JSON is: " + tempo.auftakt_result.overall_tempo);
    var x = tempo.auftakt_result.overall_tempo;
}

//function drawData(data) {
//    fill(155, 30, 180, 180);
//    console.log(data.auftakt_result.overall_tempo);
//    ellipse(data.auftakt_result.overall_tempo, 200, data.auftakt_result.overall_tempo, data.auftakt_result.overall_tempo);
//}

function draw() {
    localStorage.clear();
//    background(255);
}