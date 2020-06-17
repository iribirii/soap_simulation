var nPart = 0;
var nCap = 18;
var nSoaps = 0;
var nDNA = 100;
var angle = 360/nCap

var nFree = 0;

var iniVel = 1;

var rCell = 150;
var radiS = 10;
var radiD = 10;
var radiC = 2 * Math.PI * rCell / nCap;

var cells = [];
var soaps = [];
var dnas = [];

function setup() {
    createCanvas(1000, 500);
    background(0);

    // Creation of the capside of the virus
    for (var i = 0; i < nCap; i++) {
    	angleMode(DEGREES);
	    var x1 = rCell * cos(angle * i);
   		var y1 = rCell * sin(angle * i);

   		cells.push(new Cell(x1,y1,"C", angle * i));
    }

    for (var i = 0; i < nDNA; i++) {
    	var rdna = random(0, rCell - radiD * 10);
    	var angledna = random(0,360);
	    var xdna = rdna * cos(angledna);
	    var ydna = rdna * sin(angledna);
    	dnas.push(new Cell(xdna, ydna, "D", 0))
    }
}

function draw() {
	background(128, 197, 222);
	translate(width/2, height/2);
	
	// Shows the capside of the virus
	//for (var i = 0; i < cells.length; i++) {
	//	cells[i].edges();
	//	cells[i].move();
	//	cells[i].show();
	//}

	//for (var i = 0; i < dnas.length; i++) {
	//	dnas[i].edges();
	//	dnas[i].move();
	//	dnas[i].show();
	//}

    // checks if the soaps have touched the cells in the capside
    for (var i = 0; i < soaps.length; i++) {
        if (soaps[i].free) {
            soaps[i].update(soaps, cells, i);
            soaps[i].show();
        } else {
            soaps[i].move();
            soaps[i].edges();
            soaps[i].tilt(4);
            soaps[i].show();
        }
    }

    for (i = 0; i < dnas.length; i++) {
        for (j = 0; j < cells.length; j++) {
            if (i != j) {
                elastic(dnas[i], cells[j]);
            }
        }
        dnas[i].edges();
        dnas[i].tilt(0.5);
        dnas[i].move();
       	dnas[i].show();
    }


    // checks if cells have collisionned with another one and changes velocities
    for (i = 0; i < cells.length; i++) {
        for (j = 0; j < cells.length; j++) {
            if (i != j) {
                elastic(cells[i], cells[j]);
            }
        }
        cells[i].edges();
        cells[i].tilt(0.1);
        cells[i].move();
        cells[i].osc();
       	cells[i].show();
    }





}

function mousePressed() {
	nSoaps++
	soaps.push(new Cell(mouseX - width/2, mouseY - height/2, "S"))
}