class Blackhole {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.mass = m;
    this.rs = (2 * G * this.mass) / (c * c);
  }

  pull(photon) {
    const force = p5.Vector.sub(this.pos, photon.pos);
    let r = force.mag();
    let fg = (G * this.mass) / (r * r);
    force.setMag(fg);
    photon.vel.add(force);
    photon.vel.setMag(c);

    if (r < this.rs) {
      photon.stop();
    }
  }

  show() {
    ellipseMode(RADIUS);
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.rs);

    noFill();
    stroke(211, 232, 217);
    strokeWeight(66);
    ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32);
    stroke(255, 220, 155);
    strokeWeight(32);

    ellipse(this.pos.x, this.pos.y, this.rs * 1.5 + 16);
  }

}
