<template>
  <div class="wrapper">
    <div class="photo">
      {{ student.photo }}
    </div>
    <div class="info">
      <h2>{{ student.name }}</h2>
      <p>
        {{ student.group }}
      </p>
      <p>
        Grade:
        {{ student.mark }}
      </p>
      <div v-if="student.isDonePr === true">
        <p>Practice DONE</p>
      </div>
      <div v-else>
        <p>Practice FAILED</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: "",
  },
  data() {
    return {
      student: {},
    };
  },
  mounted() {
    axios
      .get("http://34.82.81.113:3000/students/" + this.id)
      .then((response) => {
        this.student = response.data;
      });
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
}
.photo {
  max-width: 200px;
  border: 2px solid #ccc;
  border-radius: 10px;
}
.info {
  flex: 1;
  text-align: left;
  margin-left: 20px;
  color: #008000;
}
h2 {
  color: #008000;
}
</style>
