<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:5em;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

:root  {
    --black:#000000;
    --truewhite:#ffffff;
    --white:#F4F4F6;
    --background:#141432;
    --highlight:#26264E;
    --bright:#313160;
    --upper:#1D1D42;
    --primary:#6FCF97;
    --secondary:#524EEE;
    --greater:#4E2ECF;
    --contrast:#836DDD;
    --caption:#C4C4C4;
    --danger:#D06969;
    --disabled:#5D5D7B;
}


body{
    background-color:var(--upper);
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -ms-user-select: none;
    -moz-user-select: none;
}


</style>
