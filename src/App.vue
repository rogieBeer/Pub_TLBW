<template>
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/quiz">Quiz</router-link> |
      <router-link to="/species">Species</router-link> |
  </div>
  <router-view />
</template>

<style scoped>
  body {
    padding: 0;
  }
</style>