<script setup lang="ts"></script>

<template>
  <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <span class="orb orb-1" />
    <span class="orb orb-2" />
    <span class="orb orb-3" />
    <span class="orb orb-4" />
    <span class="orb orb-5" />
    <span class="orb orb-6" />
    <span class="orb orb-7" />
    <span class="orb orb-8" />
    <span class="orb orb-9" />
    <span class="orb orb-10" />
    <span class="orb orb-11" />
    <span class="orb orb-12" />
  </div>
</template>

<style scoped>
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(50px);
  will-change: transform;
}

.orb-1 {
  top: -8%;
  left: 4%;
  width: 26rem;
  height: 26rem;
  background: radial-gradient(circle at 30% 30%, rgba(56, 214, 245, 0.35), rgba(56, 214, 245, 0) 70%);
  animation: float-a 24s ease-in-out infinite;
}

.orb-2 {
  top: 8%;
  right: 6%;
  width: 20rem;
  height: 20rem;
  background: radial-gradient(circle at 40% 40%, rgba(150, 240, 253, 0.22), rgba(150, 240, 253, 0) 70%);
  animation: float-b 30s ease-in-out infinite;
}

.orb-3 {
  bottom: 4%;
  left: 18%;
  width: 24rem;
  height: 24rem;
  background: radial-gradient(circle at 50% 50%, rgba(31, 185, 222, 0.28), rgba(31, 185, 222, 0) 70%);
  animation: float-c 28s ease-in-out infinite;
}

.orb-4 {
  bottom: 14%;
  right: 12%;
  width: 16rem;
  height: 16rem;
  background: radial-gradient(circle at 40% 40%, rgba(56, 214, 245, 0.2), rgba(56, 214, 245, 0) 70%);
  animation: float-a 22s ease-in-out infinite reverse;
}

.orb-5 {
  top: 42%;
  left: 48%;
  width: 14rem;
  height: 14rem;
  background: radial-gradient(circle at 50% 50%, rgba(201, 248, 255, 0.14), rgba(201, 248, 255, 0) 70%);
  animation: float-b 26s ease-in-out infinite reverse;
}

.orb-6 {
  top: 22%;
  left: 32%;
  width: 12rem;
  height: 12rem;
  background: radial-gradient(circle at 40% 40%, rgba(56, 214, 245, 0.18), rgba(56, 214, 245, 0) 70%);
  animation: float-c 20s ease-in-out infinite;
  animation-delay: -4s;
}

.orb-7 {
  top: 30%;
  right: 22%;
  width: 18rem;
  height: 18rem;
  background: radial-gradient(circle at 50% 50%, rgba(31, 185, 222, 0.22), rgba(31, 185, 222, 0) 70%);
  animation: float-a 27s ease-in-out infinite;
  animation-delay: -9s;
}

.orb-8 {
  top: 58%;
  left: 8%;
  width: 15rem;
  height: 15rem;
  background: radial-gradient(circle at 30% 30%, rgba(150, 240, 253, 0.2), rgba(150, 240, 253, 0) 70%);
  animation: float-b 23s ease-in-out infinite;
  animation-delay: -12s;
}

.orb-9 {
  top: 66%;
  right: 30%;
  width: 22rem;
  height: 22rem;
  background: radial-gradient(circle at 50% 50%, rgba(56, 214, 245, 0.16), rgba(56, 214, 245, 0) 70%);
  animation: float-c 32s ease-in-out infinite reverse;
  animation-delay: -6s;
}

.orb-10 {
  top: 78%;
  left: 42%;
  width: 13rem;
  height: 13rem;
  background: radial-gradient(circle at 40% 40%, rgba(201, 248, 255, 0.16), rgba(201, 248, 255, 0) 70%);
  animation: float-a 21s ease-in-out infinite;
  animation-delay: -3s;
}

.orb-11 {
  top: 88%;
  right: 8%;
  width: 19rem;
  height: 19rem;
  background: radial-gradient(circle at 50% 50%, rgba(31, 185, 222, 0.2), rgba(31, 185, 222, 0) 70%);
  animation: float-b 29s ease-in-out infinite;
  animation-delay: -15s;
}

.orb-12 {
  top: 96%;
  left: 22%;
  width: 16rem;
  height: 16rem;
  background: radial-gradient(circle at 30% 30%, rgba(56, 214, 245, 0.18), rgba(56, 214, 245, 0) 70%);
  animation: float-c 25s ease-in-out infinite;
  animation-delay: -10s;
}

@keyframes float-a {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(4%, 6%) scale(1.08);
  }
}

@keyframes float-b {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-5%, 4%) scale(0.94);
  }
}

@keyframes float-c {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(3%, -5%) scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none;
  }
}
</style>
