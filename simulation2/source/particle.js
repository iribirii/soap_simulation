class Cell {
    constructor(x, y, t, a) {
        this.t = t
        this.x = x;
        this.y = y;
        this.pos = createVector(x, y);
        this.angle = a;
        

        if (this.t == "C") {
            this.vel = p5.Vector.sub(this.pos, [0,0]);
            this.vel.setMag(-iniVel);
            
            this.r = radiC;
            this.free = false;
        } else if (this.t == "D") {
        	this.vel = p5.Vector.random2D();
        	this.vel.setMag(iniVel*0.2);
        	
        	this.r = radiD;
        	this.free = true;
        } else if (this.t == "S") {
        	this.vel = p5.Vector.random2D();
        	this.vel.setMag(iniVel/5);
        	
        	this.r = radiS;
        	this.free = true
        }

        this.vx = this.vel.x;
        this.vy = this.vel.y;
    }

    get mass() {
        var density = 1;
        return density * Math.PI * this.r * this.r
    }
    get v() {
        return [this.vx, this.vy];
    }

    dis(other) {
        return p5.Vector.sub(this.pos, other.pos).mag();
    }

    edges() {
        if (this.pos.x <= -width/2 + this.r/2) {
            this.pos.x = -width/2 + this.r/2;
            this.vel.x *= -1;
        } else if (this.pos.x >= width/2 - this.r/2) {
            this.pos.x = width/2 - this.r/2;
            this.vel.x *= -1;
        } else if (this.pos.y <= -height/2 + this.r/2) {
            this.pos.y = -height/2 + this.r/2;
            this.vel.y *= -1;
        } else if (this.pos.y >= height/2 - this.r/2) {
            this.pos.y = height/2 - this.r/2;
            this.vel.y *= -1
        }
    }

    move() {
        if (this.t == "S" && !this.free || this.t == "C" && this.free || this.t == "D" && this.free && nFree > nCap/2) {
            this.pos.add(this.vel);
        }
    }

    tilt(n) {
        if (this.t == "S" && this.free || this.t == "D" && this.free || this.t == "C") {
            this.pos.add(p5.Vector.random2D().setMag(n));
        }        
        
    }

    osc() {
    	if (this.free) {
	    	this.angle = this.angle + random(-1,1);
    	} 
    }

    update(particles, dirts, start) {
        for (var i = 0; i < particles.length; i++) {
            var other = particles[i];
            if (this != other && this.dis(other) <= (this.r + other.r)) {
                var newVel = elastic(this, other)
            }
        }


        for (var i = 0; i < dirts.length; i++) {
            var other = dirts[i];
            var d = this.dis(other);
            var sep = this.r/2 + other.r/2;
            if (d < sep) {
                this.free = false;
                var l = p5.Vector.sub(this.pos, other.pos).normalize().setMag(sep + 1);
                this.pos = p5.Vector.add(other.pos, l);
                this.vel = other.vel;
                other.free = true;
                nFree++
            }
        }

        if (this.free) {
            this.pos.add(this.vel);
            this.tilt();
        }

        this.edges();
    }

    show() {
    	if (this.t == "C") {
    		fill(0);
    		noStroke();
            //exterior circle
            //circle(this.pos.x, this.pos.y, this.r);

            //Drawing the different part of the capside monomers
            push();
            stroke(0,255,0);
            translate(this.pos.x, this.pos.y);
            rotate(this.angle);

            fill(0, 255, 0, 200);
            rect(0, -this.r/2, -this.r/3, this.r);
            ellipse(this.r/4, 0, this.r/2, this.r*0.85);


            pop();

    	} else if (this.t == "D") {
    		stroke(150,50,100);
    		fill(150,50,100, 100);
    		circle(this.pos.x, this.pos.y, this.r);
    	} else if (this.t == "S") {
    		stroke(100,100,255);
    		fill(100,100,255, 100);
    		circle(this.pos.x, this.pos.y, this.r);
    	}
    }
}