let vector = {
  x: null,
  y: null,
  create(x, y) {
    let object = Object.create(this);
    object.setX(x);
    object.setY(y);
    return object;
  },
  setX(newX) {
    this.x = newX;
  },
  getX() {
    return this.x;
  },
  setY(newY) {
    this.y = newY;
  },
  getY() {
    return this.y;
  },
  setAngle(newAngle) {
    let magnitude = this.getMagnitude();
    this.x = Math.cos(newAngle) * magnitude;
    this.y = Math.sin(newAngle) * magnitude;
  },
  getAngle() {
    return Math.atan2(this.y, this.x);
  },
  setMagnitude(newMagnitude) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * newMagnitude;
    this.y = Math.sin(angle) * newMagnitude;
  },
  getMagnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  add(newVector) {
    return this.create(this.x + newVector.getX(), this.y + newVector.getY());
  },
  subtract(newVector) {
    return this.create(this.x - newVector.getX(), this.y - newVector.getY());
  },
  multiply(factor) {
    return this.create(this.x * factor, this.y * factor);
  },
  divide(divisor) {
    return this.create(this.x / divisor, this.y / divisor);
  },
  addTo(newVector) {
    this.x += newVector.getX();
    this.y += newVector.getY();
  },
  subtractFrom(newVector) {
    this.x -= newVector.getX();
    this.y += newVector.getY();
  },
  multiplyBy(factor) {
    this.x *= factor;
    this.y *= factor;
  },
  divideBy(divisor) {
    this.x /= divisor;
    this.y /= divisor;
  }
};
