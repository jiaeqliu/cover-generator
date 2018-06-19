var canvas_empty = true; // keeps track of whether canvas has drawings on it, so you can reset it everytime you click the button

var margin_x; // width of left/right margin around tile grid
var margin_y; // height of top/bottom margin around tile grid

var tiles = [];
var tile_count = 3; // number of tiles in grid horizontal & vertical
var tile_size = 200; // size of tile in grid - hardcoded for now
var tile_dist_x; // x distance between tiles
var tile_dist_y; // y distance between tiles

var unit_count = 3; // number of units (e.g 3x3) within a tile
var unit_size = tile_size / unit_count; // size of each unit within a tile

var button;

var song;
var tempo;

function preload() {
    song = loadJSON('tempo.json');
    // load the sound, but don't play it yet
//    soundFile = loadSound('media/2017_12_13 deep soul.mp3');
}

function setup() {
    // check that song's JSON file is working
    console.log('song is: ' + song);
    console.log('tempo in JSON song is: ' + song.auftakt_result.overall_tempo);
    
    localStorage.setItem('temp',JSON.stringify(song));
    tempo = JSON.parse(localStorage.getItem('temp'));
    console.log('parsed JSON is: ' + tempo.auftakt_result.overall_tempo);
    
    // drawing stuff below
    createCanvas(windowWidth, windowHeight);
    noLoop();

    margin_x = width / 5; // assumes 5 column layout for canvas
    margin_y = height / 12; // assumes 12 row layout for canvas
    tile_dist_x = (width - 2 * margin_x) / tile_count;
    tile_dist_y = (height - 2 * margin_y) / tile_count;
    
    console.log('Margin X: ' + margin_x, width / 2, 100);
    console.log('Margin Y: ' + tile_dist_x, width / 2, 130);
    console.log('Width: ' + width, width / 2, 160);
    console.log('Height: ' + height, width / 2, 190);
    
    drawGuides();
    
    button = createButton('Generate');
    button.position(windowWidth/2, 65); 
    button.mousePressed(buttonPressed);
  }
  
function draw() {
    
}

function buttonPressed() {
//    if(canvas_empty) {
    resetSketch();
        createTiles();
        drawSquares();
        drawCircles();
        console.log(tiles);
//        canvas_empty = false;
//    } else {
        
//        canvas_empty = true;
    }

function resetSketch() {
    tiles = []; // clear out the array of shapes
    background(255); // clear out canvas
    drawGuides();
}

function drawGuides() {
//    noStroke();
//    fill('rgba(0, 0, 255, 0.1)');
//    rect(0, 0, width, height); // visualize canvas size
    
    noStroke();
    fill('rgba(255, 0, 255, 0.2)');
    rect(0, 0, margin_x, height); // left margin guide
    rect(width - margin_x, 0, margin_x, height); // right margin guide
    
    fill('rgba(0, 255, 255, 0.2)');
    rect(0, 0, width, margin_y); // top margin guide
    rect(0, height - margin_y, width, margin_y); // bottom margin guide
}
  
  function createTiles() {
      var x = margin_x;
      var y = margin_y;
      var tiles = [];

    for (var j = 0; j < tile_count; j += 1) {   
      for (var i = 0; i < tile_count; i += 1) {        
        x_center = x + (tile_dist_x / 2) - (tile_size / 2);
        y_center = y + (tile_dist_y / 2) - (tile_size / 2);
        
        createUnits(x_center, y_center);
          
    // visualizes background of tile  
//        fill('rgba(0,255,0,0.2)'); 
//        rect(x_center, y_center, tile_size, tile_size);

        // display tile positions
//        fill('rgba(0,0,255,0.2)');
//        textSize(12);
//        text('(' + x_center + ',' + y + ')', x_center, y);

        y += tile_dist_y; // increment y
      }
        x += tile_dist_x; // increment x
        y = margin_y;
    }
  }

// createUnits creates a smaller grid of 'units' which hold the position and size of each circle, square, etc that's generated within a tile.

function createUnits(x, y) { // initial x, y coordinates for each tile 
    var x_dist = 50;
    var y_dist = 50;
    var init_x = x;
    var init_y = y;
    var unit_x = init_x;
    var unit_y = init_y;    
    var scale;
    
    for (var j = 0; j < unit_count; j++) {
      for (var i = 0; i < unit_count; i++) {
        var tile = {};
        tile.x_pos = unit_x + unit_size / 2;
        tile.y_pos = unit_y + unit_size / 2;
        tile.size = unit_size; 
        tiles.push(tile);
        unit_y += unit_size; // move to next unit y position along y-axis 
        }
        
        unit_x += unit_size; // move to next unit x position along y-axis
        unit_y = init_y; // reset unit y position to top of grid
    }
}

function drawSquares(x, y) {    
    for (var i = 0; i < tiles.length; i++) {
        push();
            temp_size = tiles[i].size * random(0.05, 0.95);
            rectMode(CENTER);
            stroke('rgba(0,0,255,0.4)');
            fill('rgba(0,0,255,0.2)');
            rect(tiles[i].x_pos, tiles[i].y_pos, temp_size, temp_size);
        pop();
    }
}

function drawCircles(x, y) {    
    for (var i = 0; i < tiles.length; i++) {
        push();
            ellipseMode(CENTER);
            stroke('rgba(0,0,255,0.4)');
            fill('rgba(0,0,255,0.2)');
            ellipse(tiles[i].x_pos, tiles[i].y_pos, tiles[i].size * random(0.05, 0.95));
        pop();
    }
}