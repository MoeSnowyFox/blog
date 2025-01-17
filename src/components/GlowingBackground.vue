<template>
    <div class="glowing-background">
      <div class="glow" v-for="(glow, index) in glows" :key="index" :style="glow.style"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        glows: [],
        glowCount: 10,
        glowSize: 50,
        animationDuration: 5, // seconds
      };
    },
    mounted() {
      this.createGlows();
      this.animateGlows();
    },
    methods: {
      createGlows() {
        for (let i = 0; i < this.glowCount; i++) {
          const glow = {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            size: `${this.glowSize}px`,
            delay: `${Math.random() * this.animationDuration}s`,
          };
          this.glows.push(glow);
        }
      },
      animateGlows() {
        setInterval(() => {
          this.glows = this.glows.map((glow, index) => {
            return {
              ...glow,
              left: `${(parseFloat(glow.left) - 1 + 100) % 100}%`,
              top: `${(parseFloat(glow.top) - 1 + 100) % 100}%`,
            };
          });
        }, 1000 / 60); // approximately 60 frames per second
      },
    },
    computed: {
      glowStyles() {
        return `
          .glow {
            position: absolute;
            width: ${this.glowSize}px;
            height: ${this.glowSize}px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,183,255,0.8) 70%);
            border-radius: 50%;
            animation: moveGlow ${this.animationDuration}s linear infinite;
          }
  
          @keyframes moveGlow {
            0% {
              transform: translate(-50%, -50%) translate(${this.glows[0].left}, ${this.glows[0].top});
            }
            100% {
              transform: translate(-50%, -50%) translate(${this.glows[this.glows.length - 1].left}, ${this.glows[this.glows.length - 1].top});
            }
          }
        `;
      },
    },
  };
  </script>
  
  <style scoped>
  .glowing-background {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #000;
  }
  
</style>