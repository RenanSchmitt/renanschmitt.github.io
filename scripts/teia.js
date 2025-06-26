const canvas = document.querySelector('.teia-canvas');
  const ctx = canvas.getContext('2d');
  const section = document.querySelector('.hero-tech');
  
  let width, height;
  function resizeCanvas() {
    width = section.offsetWidth;
    height = section.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  const numPoints = 70;
  const maxDistance = 120;
  const points = [];
  
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = 2.5;
    }
    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#06f6d2';
      ctx.shadowColor = '#06f6d2';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.closePath();
    }
  }
  
  function initPoints() {
    points.length = 0;
    for (let i = 0; i < numPoints; i++) {
      points.push(new Point(Math.random() * width, Math.random() * height));
    }
  }
  
  function connectPoints() {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 246, 210, ${1 - dist / maxDistance})`;
          ctx.lineWidth = 1;
          ctx.shadowColor = 'rgba(6, 246, 210, 0.7)';
          ctx.shadowBlur = 4;
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    points.forEach(p => {
      p.move();
      p.draw();
    });
    connectPoints();
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', () => {
    resizeCanvas();
    initPoints();
  });
  
  window.addEventListener('load', () => {
    resizeCanvas();
    initPoints();
  });
  
  resizeCanvas();
  initPoints();
  animate();
  