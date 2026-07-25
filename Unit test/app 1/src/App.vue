<template>
  <EmployeeManagement />
</template>

<script>
import EmployeeManagement from './components/EmployeeManagement.vue';

export default {
  name: 'App',
  components: {
    EmployeeManagement
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  min-height: 100vh;
  padding: 20px;
}
</style>
