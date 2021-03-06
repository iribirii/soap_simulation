// Global variables to define the simulation

// Variables involving the virus 
var nVirus = 8;                             // number of viruses 
var radiV = 50;                             // radii of the viruses
var nCap = 12;                              // number of proteins of the capsule
var angle = 360/nCap                        // angle between each capsule
var l = 2 * radiV * Math.sin((angle/180*Math.PI)/2) * 0.45;
var viruses = [];                           // empty array to contain all the viruses

// Variables involving the soap particles
var nPart = 0;                              // number of soap particles
var radiS = 10;                             // radii of the soap particles
var particles = [];                         // empty array to contain all the soaps
var iniVel = 1.5;                           // magnitude of the velicities at start


// Setting up the simulation
function setup() {
    createCanvas(1000, 800);

// CREATION OF THE VIRUS
    for (var i = 1; i <= nVirus; i++) {
        var x = (radiV * 2 + 10) * i;
        var y = height - radiV;
        var t = "V";

        var tmp = new Particle(x, y, t);
        viruses.push(tmp);
    }    
}

// Drawing loop
function draw() {
    background(128,197,222);

    // draws and updates the soaps coordinates and states
    for (i = 0; i < particles.length; i++) {
        if (particles[i].free) {
            particles[i].update(particles, viruses, i);
            particles[i].show();
        } else {
            particles[i].move();
            particles[i].tilt();
            particles[i].show();
        }

    }

    // draws and updates the viruses states and positions
    for (i = 0; i < viruses.length; i++) {
        for (j = 0; j < viruses.length; j++) {
            if (i != j) {
                elastic(viruses[i], viruses[j]);
            }
        }
        viruses[i].edges();
        viruses[i].move();
       	viruses[i].show();
    }

}

