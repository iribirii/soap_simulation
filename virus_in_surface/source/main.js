var nPart = 0;
var nDirt = 8;
var particles = [];
var iniVel = 1.5;
var radiS = 10;
var radiD = 50;
var dirts = [];
var dirt;
var nCap = 12;
var angle = 360/nCap
var l = 2 * radiD * Math.sin((angle/180*Math.PI)/2) * 0.45;

function setup() {
    createCanvas(1000, 800);
    background(0);


// CREATION OF THE DIRT MOLECULES
    for (var i = 1; i <= nDirt; i++) {
        var x = (radiD * 2 + 10) * i;
        var y = height - radiD;
        var t = "V";

        var tmp = new Particle(x, y, t);
        dirts.push(tmp);
    }    


//CREATION OF AUTOMATIC SOAPS 
    for (var i = 1; i <= nPart; i++) {
        var ok = false;
        while (!ok) {
            var x = random(width);
            var y = random(height/2);
            var t = "S";

            var tmp = new Particle(x, y, t);
            ok = true;
            for (var j = 0; j < particles.length; j++) {
                if (particles[j].dis(tmp) < tmp.r + particles[j].r) ok = false;
            }
        }
        particles.push(tmp);
    }

}

function draw() {
    background(128,197,222);


    for (i = 0; i < particles.length; i++) {
        if (particles[i].free) {
            particles[i].update(particles, dirts, i);
            particles[i].show();
        } else {
            particles[i].move();
            particles[i].tilt();
            particles[i].show();
        }

    }

    for (i = 0; i < dirts.length; i++) {
        for (j = 0; j < dirts.length; j++) {
            if (i != j) {
                elastic(dirts[i], dirts[j]);
            }
        }
        dirts[i].edges();
        dirts[i].move();
       	dirts[i].show();
    }

    //   dirt.show();
}

function mousePressed() {
	nPart++
	particles.push(new Particle(mouseX, mouseY, "S"))
}