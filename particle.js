let particle = {
  position: null,
  radius: 0,
  color: null,
  velocity: null,
  gravity: null,
  create(x, y, radius, speed, angle, gravity) {
    let object = Object.create(this);
    object.position = vector.create(x, y);
    object.radius = radius;
    object.color = getRandomColor();
    object.velocity = vector.create(0, 0);
    object.velocity.setMagnitude(speed);
    object.velocity.setAngle(angle);
    object.gravity = vector.create(0, gravity || 0);
    return object;
  },
  update() {
    this.position.addTo(this.velocity);
    this.velocity.addTo(this.gravity);
  },
  accelerate(acceleration) {
    this.velocity.addTo(acceleration);
  },
  setRadius(newRadius) {
    this.radius = newRadius;
  },
  getRadius() {
    return this.radius;
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
