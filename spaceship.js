class Spaceship {
  constructor(x, y, speed) {
    this.position = createVector(50, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.speed = speed;
    this.angle = 70;
    this.isboosting = false;
    this.r = 10;
    this.heading = 0;
    this.rotation = 0;
    this.mass = 0.06;
    this.isDead = false;
    this.color = color(233, 62, 62);
    this.maxDistEffect = 200; // Where you want the effect to start
    this.maxForce = 2; // The power of the effect
    this.dampening = 0.1; // The dampening effect
    this.blackHolePos = createVector(width / 2, height / 2);
  }

  boosting(b) {
    this.isboosting = b;
  }

  update() {
    if (!this.isDead) {
      if (this.isboosting) {
        this.boost();
      }
      // Calculate gravitational pull from the black hole
      const force = p5.Vector.sub(blackhole.pos, this.position);
      const r = force.mag();
      const fg = (G * this.mass * blackhole.mass) / (r * r);
      force.normalize();
      force.mult(fg);
      // Update velocity and position based on gravitational pull
      this.acc.add(force);
      this.vel.add(this.acc);
      this.vel.limit(this.speed);
      this.position.add(this.vel);
      // Check if the spaceship is inside the event horizon
      if (r <= blackhole.rs + 5) {
        this.isDead = true;
      }
      this.acc.mult(0);
    }
  }

  boost() {
    var force = createVector(
      Vector.fromAngle(this.heading).x,
      Vector.fromAngle(this.heading).y,
      0
    );
    force.mult(0.15);
    this.vel.add(force);
  }

  render() {
    push();
    stroke(this.color);
    strokeWeight(1);
    translate(this.position.x, this.position.y);
    rotate(this.heading);
    fill(this.color);
    beginShape();
    vertex(this.r, 0);
    vertex(-this.r, -this.r + 2);
    vertex(-this.r, this.r - 2);
    if (this.isboosting) {
      line(0, 0, -this.r * 2, 0);
    }
    endShape(CLOSE);
    pop();
  }

  edges() {
    if (this.position.x > width + this.r) {
      this.position.x = -this.r;
    } else if (this.position.x < -this.r) {
      this.position.x = width + this.r;
    }

    if (this.position.y > height + this.r) {
      this.position.y = 0;
    } else if (this.position.y < -this.r) {
      this.position.y = height + this.r;
    }
  }

  setRotation(a) {
    this.rotation = a;
  }

  turn() {
    this.heading += this.rotation;
  }
}
