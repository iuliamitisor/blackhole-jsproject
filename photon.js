class Photon {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(-c, 0);
    this.history = [];
    this.stopped = false;
    this.theta = 0;
  }

  stop() {
    this.stopped = true;
  }

  update() {
    if (!this.stopped) {
      this.history.push(this.pos.copy());
      const deltaV = this.vel.copy();
      deltaV.mult(dt);
      this.pos.add(deltaV);
    }

    // Smooth the trajectory by interpolating between points
    for (let i = this.history.length - 1; i >= 0; i--) {
      const pos = this.history[i];
      stroke(170, 120, 255, i * 0.5);
      point(pos.x, pos.y);
    }

    if (this.history.length > 500) {
      this.history.splice(0, 1);
    }
  }

  show() {
    strokeWeight(Math.floor(Math.random() * 25));
    stroke(170, 120, 255);
    point(this.pos.x, this.pos.y);
  }
}
