let particle = {
  position: null,
  radius: 0,
  mass: 0,
  gravity: null,
  color: null,
  velocity: null,
  create(x, y, mass, gravity, speed, angle) {
    let object = Object.create(this);
    object.position = vector.create(x, y);
    object.radius = mass / Math.PI;
    object.mass = mass;
    object.gravity = gravity;
    object.color = getRandomColor();
    object.velocity = vector.create(0, 0);
    object.velocity.setMagnitude(speed);
    object.velocity.setAngle(angle);
    return object;
  },
  update() {
    this.position.addTo(this.velocity);
  },
  accelerate(acceleration) {
    this.velocity.addTo(acceleration);
  },
  angleTo(otherParticle) {
    return Math.atan2(
      otherParticle.position.getY() - this.position.getY(),
      otherParticle.position.getX() - this.position.getX()
    );
  },
  distanceTo(otherParticle) {
    let dx = otherParticle.position.getX() - this.position.getX(),
      dy = otherParticle.position.getY() - this.position.getY();
    return Math.sqrt(dx * dx + dy * dy);
  },
  gravitateTo(otherParticle) {
    let gravity = vector.create(0, 0),
      distance = this.distanceTo(otherParticle);
    //mass
    gravity.setMagnitude(
      (this.gravity *
        ((otherParticle.getMass() * this.mass) / (distance * distance))) /
        this.mass
    );
    gravity.setAngle(this.angleTo(otherParticle));
    this.velocity.addTo(gravity);
  },
  merge(otherParticle) {
    let newVelocity = this.velocity;
    return this.create(
      this.position.getX(),
      this.position.getY(),
      this.getMass() + otherParticle.getMass(),
      this.gravity,
      newVelocity.getMagnitude(),
      newVelocity.getAngle()
    );
  },
  setRadius(newRadius) {
    this.radius = newRadius;
  },
  getRadius() {
    return this.radius;
  },
  setMass(newMass) {
    this.mass = newMass;
  },
  getMass() {
    return this.mass;
  }
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
