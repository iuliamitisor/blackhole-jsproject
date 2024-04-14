const c = 42,
  G = 5,
  dt = 0.1,
  particles = [];
let blackhole;
let photons = [];
let spaceship;

let massSlider;
let startButton;
let pauseButton;
let resetButton;

function setup() {
  createCanvas(1000, 1800);

  const controlsDiv = createDiv("");
  controlsDiv.class("controls");
  massSlider = createSlider(1000, 10000, 5000);

  startButton = createButton("Start");
  pauseButton = createButton("Pause");
  resetButton = createButton("Reset");

  controlsDiv.child(createP("Adjust the mass of the black hole: "));
  controlsDiv.child(massSlider);
  controlsDiv.child(createP(""));
  controlsDiv.child(startButton);
  controlsDiv.child(pauseButton);
  controlsDiv.child(resetButton);

  // Event listeners for simulation controls
  startButton.mousePressed(() => loop());
  pauseButton.mousePressed(() => noLoop());
  resetButton.mousePressed(() => {
    photons = [];
    spaceship = new Spaceship(500, 150, c);
    loop();
  });

  spaceship = new Spaceship(500, 150, c);

  const legendDiv = createDiv("");
  legendDiv.class("legend");
  legendDiv.child(createP("Legend:"));

  const yelloDiv = createDiv("");
  yelloDiv.class("yello");
  yelloDiv.child(createP("Event horizon"));

  const greyDiv = createDiv("");
  greyDiv.class("grey");
  greyDiv.child(createP("Accretion disk"));

  const photonDiv = createDiv("");
  photonDiv.class("photon");
  photonDiv.child(createP("Photons"));
}

function draw() {
  background(60, 0, 125);

  blackhole = new Blackhole(width / 2, height / 2, massSlider.value());
  blackhole.show();

  if (mouseIsPressed) {
    const photon = new Photon(mouseX, mouseY, c); // Create photon
    photons.push(photon); // Push in photon array
  }

  for (let i = photons.length - 1; i >= 0; i--) {
    const photon = photons[i];
    blackhole.pull(photons[i]);
    photon.update();
    photon.show();

    // Remove photons that have moved off-screen or stopped
    if (
      photon.stopped ||
      photon.pos.x > width ||
      photon.pos.y > height ||
      photon.pos.x < 0 ||
      photon.pos.y < 0
    ) {
      photons.splice(i, 1);
    }
  }

  spaceship.boosting(false);
  if (keyIsDown(RIGHT_ARROW)) {
    spaceship.setRotation(0.1);
  }
  if (keyIsDown(LEFT_ARROW)) {
    spaceship.setRotation(-0.1);
  }
  if (keyIsDown(UP_ARROW)) {
    spaceship.boosting(true);
  }
  if (keyIsDown(DOWN_ARROW)) {
    spaceship.boosting(false);
  }

  spaceship.turn();
  spaceship.rotation = 0;
  spaceship.update();
  spaceship.render();
  spaceship.edges();
}
