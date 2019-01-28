window.onload = () => {
  const canvasWidth = 1500;
  const canvasHeight = 1000;
  const canvas = document.getElementById("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const c = canvas.getContext("2d");

  let particles = [];
  let numberParticles = 1;
  const gravitationalConstant = 0.8;

  particles.push(
    particle.create(
      canvasWidth / 2,
      canvasHeight / 2,
      200,
      gravitationalConstant,
      0,
      0
    )
  );
  particles.push(
    particle.create(
      canvasWidth / 3,
      canvasHeight / 2,
      50,
      gravitationalConstant,
      0.8,
      80
    )
  );
  particles.push(
    particle.create(
      canvasWidth / 3.5,
      canvasHeight / 2,
      10,
      gravitationalConstant,
      1.5,
      80
    )
  );

  canvas.addEventListener("mousedown", event => {
    for (let i = 0; i < numberParticles; i++) {
      let mass = Math.random() * 30 + 10;
      particles.push(
        particle.create(
          event.layerX, // + Math.random() * 400 - 200,
          event.layerY, // + Math.random() * 400 - 200,
          mass,
          gravitationalConstant,
          //Math.random() * 2 - 1,
          0,
          //Math.random() * Math.PI * 2
          0
        )
      );
    }
  });

  update();

  function update() {
    c.clearRect(0, 0, canvasWidth, canvasHeight);
    if (particles.length > 0) {
      let particlesToRemove = [];
      let particlesToMerge = [];
      for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];
        if (particles.length > 1) {
          for (let j = 0; j < particles.length; j++) {
            if (particle != particles[j]) {
              if (
                particle.position.getX() - particle.radius <
                  particles[j].position.getX() - particles[j].radius &&
                particle.position.getX() + particle.radius >
                  particles[j].position.getX() + particles[j].radius &&
                particle.position.getY() - particle.radius <
                  particles[j].position.getY() - particles[j].radius &&
                particle.position.getY() + particle.radius >
                  particles[j].position.getY() + particles[j].radius
              ) {
                particlesToMerge.push({ a: particle, b: particles[j] });
                particlesToRemove.push(particle);
                particlesToRemove.push(particles[j]);
              } else {
                particle.gravitateTo(particles[j]);
              }
            }
          }
        }
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
        if (
          particle.position.getX() - particle.radius > canvasWidth ||
          particle.position.getX() + particle.radius < 0 ||
          particle.position.getY() - particle.radius > canvasHeight ||
          particle.position.getY() + particle.radius < 0
        ) {
          particlesToRemove.push(particle);
        } else {
          particles[i] = particle;
        }
      }
      particles = particles.filter(particle => {
        return !particlesToRemove.includes(particle);
      });
      particlesToMerge.forEach(pair => {
        let mergedParticle = pair.a.merge(pair.b);
        particles.push(mergedParticle);
      });
    }

    requestAnimationFrame(update);
  }
};
