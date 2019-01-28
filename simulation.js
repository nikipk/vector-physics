window.onload = () => {
  const canvasWidth = 1500;
  const canvasHeight = 1000;
  const canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const c = canvas.getContext("2d");

  let particles = [];
  let numberParticles = 300;

  canvas.addEventListener("mousedown", event => {
    for (let i = 0; i < numberParticles; i++) {
      particles.push(
        particle.create(
          event.layerX,
          event.layerY,
          Math.random() * 5 + 1,
          Math.random() * 3 + 1,
          Math.random() * Math.PI * 2,
          0.05
        )
      );
    }
  });

  update();

  function update() {
    console.log(particles.length, "particles being calculated!");
    c.clearRect(0, 0, canvasWidth, canvasHeight);

    particles.forEach(particle => {
      particle.update();
      c.beginPath();
      c.fillStyle = particle.color;
      c.arc(
        particle.position.getX(),
        particle.position.getY(),
        particle.getRadius(),
        0,
        Math.PI * 2
      );
      c.fill();
    });

    for (var i = particles.length - 1; i >= 0; i -= 1) {
      var p = particles[i];
      if (
        p.position.getX() - p.radius > canvasWidth ||
        p.position.getX() + p.radius < 0 ||
        p.position.getY() - p.radius > canvasHeight ||
        p.position.getY() + p.radius < 0
      ) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(update);
  }
};
