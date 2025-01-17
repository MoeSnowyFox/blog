<template>
  <div id="app">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      STAR_COUNT: (window.innerWidth + window.innerHeight) / 8,
      STAR_SIZE: 3,
      STAR_MIN_SCALE: 0.2,
      OVERFLOW_THRESHOLD: 50,
      scale: 1,
      width: 0,
      height: 0,
      stars: [],
      velocity: { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 },
      pointerX: null,
      pointerY: null,
      touchInput: false,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext('2d');
    this.generate();
    this.resize();
    this.step();
    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('touchmove', this.onTouchMove);
    window.addEventListener('touchend', this.onMouseLeave);
    document.addEventListener('mouseleave', this.onMouseLeave);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onMouseLeave);
    document.removeEventListener('mouseleave', this.onMouseLeave);
  },
  methods: {
    generate() {
      for (let i = 0; i < this.STAR_COUNT; i++) {
        this.stars.push({ x: 0, y: 0, z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE) });
      }
    },
    placeStar(star) {
      star.x = Math.random() * this.width;
      star.y = Math.random() * this.height;
    },
    recycleStar(star) {
      let direction = 'z';
      let vx = Math.abs(this.velocity.x), vy = Math.abs(this.velocity.y);
      if (vx > 1 || vy > 1) {
        let axis = vx > vy ? (Math.random() < vx / (vx + vy) ? 'h' : 'v') : (Math.random() < vy / (vx + vy) ? 'v' : 'h');
        direction = axis === 'h' ? (this.velocity.x > 0 ? 'l' : 'r') : (this.velocity.y > 0 ? 't' : 'b');
      }
      star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE);
      if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * this.width;
        star.y = Math.random() * this.height;
      } else if (direction === 'l') {
        star.x = -this.OVERFLOW_THRESHOLD;
        star.y = this.height * Math.random();
      } else if (direction === 'r') {
        star.x = this.width + this.OVERFLOW_THRESHOLD;
        star.y = this.height * Math.random();
      } else if (direction === 't') {
        star.x = this.width * Math.random();
        star.y = -this.OVERFLOW_THRESHOLD;
      } else if (direction === 'b') {
        star.x = this.width * Math.random();
        star.y = this.height + this.OVERFLOW_THRESHOLD;
      }
    },
    resize() {
      this.scale = window.devicePixelRatio || 1;
      this.width = window.innerWidth * this.scale;
      this.height = window.innerHeight * this.scale;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.stars.forEach(this.placeStar);
    },
    step() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.update();
      this.render();
      requestAnimationFrame(this.step);
    },
    update() {
      this.velocity.tx *= 0.96;
      this.velocity.ty *= 0.96;
      this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8;
      this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8;
      this.stars.forEach(star => {
        star.x += this.velocity.x * star.z;
        star.y += this.velocity.y * star.z;
        star.x += (star.x - this.width / 2) * this.velocity.z * star.z;
        star.y += (star.y - this.height / 2) * this.velocity.z * star.z;
        star.z += this.velocity.z;
        if (star.x < -this.OVERFLOW_THRESHOLD || star.x > this.width + this.OVERFLOW_THRESHOLD || star.y < -this.OVERFLOW_THRESHOLD || star.y > this.height + this.OVERFLOW_THRESHOLD) {
          this.recycleStar(star);
        }
      });
    },
    render() {
      this.stars.forEach(star => {
        this.context.beginPath();
        this.context.lineCap = 'round';
        this.context.lineWidth = this.STAR_SIZE * star.z * this.scale;
        this.context.strokeStyle = 'rgba(255,255,255,' + (0.5 + 0.25 * Math.random()) + ')';
        this.context.moveTo(star.x, star.y);
        let tailX = this.velocity.x * 2, tailY = this.velocity.y * 2;
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        this.context.lineTo(star.x + tailX, star.y + tailY);
        this.context.stroke();
      });
    },
    movePointer(x, y) {
      if (typeof this.pointerX === 'number' && typeof this.pointerY === 'number') {
        let ox = x - this.pointerX, oy = y - this.pointerY;
        this.velocity.tx += ox / 8 * this.scale * (this.touchInput ? 0.25 : -0.25);
        this.velocity.ty += oy / 8 * this.scale * (this.touchInput ? 0.25 : -0.25);
      }
      this.pointerX = x;
      this.pointerY = y;
    },
    onMouseMove(event) {
      this.touchInput = false;
      this.movePointer(event.clientX, event.clientY);
    },
    onTouchMove(event) {
      this.touchInput = true;
      this.movePointer(event.touches[0].clientX, event.touches[0].clientY);
      event.preventDefault();
    },
    onMouseLeave() {
      this.pointerX = null;
      this.pointerY = null;
    }
  }
};
</script>

<style>
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #1e1e32;
  background-image: radial-gradient(circle at top right, rgb(39, 26, 51), transparent), radial-gradient(circle at 20% 80%, rgb(8, 39, 51), transparent);
  user-select: none;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>