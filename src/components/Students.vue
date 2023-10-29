<template>
  <div :class="styleSwitcher">
    <div>
      <input
        @change="changeTheme"
        type="radio"
        name="drone"
        value="light"
        v-model="selectedTheme"
      />
      <label> light</label>
    </div>

    <div>
      <input
        @change="changeTheme"
        type="radio"
        name="drone"
        value="dark"
        v-model="selectedTheme"
      />
      <label> dark</label>
    </div>

    <div class="serchName">
      <h1>Searching</h1>
      <input class="input" placeholder="type name" v-model="searchName" />
    </div>

    <div class="addStudent">
      <input
        type="url"
        class="input"
        v-model="newStudent.photo"
        placeholder="Фото"
      />
      <input class="input" placeholder="add name" v-model="newStudent.name" />
      <input class="input" v-model="newStudent.isDonePr" type="checkbox" />
      <select
        class="input"
        v-model="newStudent.group"
        id="myComboBox"
        name="group"
      >
        <option class="input" value="placeholder" disabled selected>
          Group:
        </option>
        <option value="RPZ 20 1/9">RPZ 20 1/9</option>
        <option value="RPZ 20 2/9">RPZ 20 2/9</option>
      </select>
      <input
        class="input"
        v-model="newStudent.mark"
        type="number"
        placeholder="grade"
      />
      <button class="input" @click="addStudent()">Add student</button>
    </div>
    <p>Кількість {{ studentsNumber }}</p>
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Work Done</th>
          <th>Group</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody v-for="(stud, index) in students" :key="index">
        <td>
          <a @click="modalStudent(stud)">
            <img
              @click="isOpen = true"
              v-if="stud.photo"
              :src="stud.photo"
              alt="photo"
              width="50"
            />
          </a>
        </td>
        <td>
          <router-link v-bind:to="'/student-info/' + stud._id">
            {{ stud.name }}
          </router-link>
        </td>
        <td>
          <input class="input" type="checkbox" v-model="stud.isDonePr" />
        </td>
        <td>{{ stud.group }}</td>
        <td>{{ stud.mark }}</td>
        <td>
          <a @click="deleteStudent(stud._id)">Delete</a>
        </td>
        <td>
          <a class="edit-icon" @click="selectStudent(stud)"></a>
        </td>
      </tbody>
    </table>
  </div>

  <div v-if="selectedStudent" class="editStudentBlock">
    <input
      class="inputEdit"
      placeholder="add name"
      v-model="selectedStudent.name"
    />
    <input
      class="inputEdit"
      v-model="selectedStudent.isDonePr"
      type="checkbox"
    />
    <select
      class="inputEdit"
      v-model="selectedStudent.group"
      id="myComboBox"
      name="group"
    >
      <option class="inputEdit" value="placeholder" disabled selected>
        Group:
      </option>
      <option value="RPZ 20 1/9">RPZ 20 1/9</option>
      <option value="RPZ 20 2/9">RPZ 20 2/9</option>
    </select>
    <input
      class="inputEdit"
      v-model="selectedStudent.mark"
      type="number"
      placeholder="grade"
    />
    <button class="inputEdit" @click="saveChanges()">Safe changes</button>
  </div>

  <Modal :open="isOpen" @close="isOpen = !isOpen">
    <div v-if="modalStudentInfo">
      <div class="wrapper">
        <div class="student-info">
          <img
            :src="modalStudentInfo.photo"
            :alt="modalStudentInfo.name"
            class="student-photo"
          />
        </div>
        <div class="info">
          <h2>{{ modalStudentInfo.name }}</h2>
          <h3>
            {{ modalStudentInfo.group }}
          </h3>
          <h3>
            Grade:
            {{ modalStudentInfo.mark }}
          </h3>
          <div v-if="modalStudentInfo.isDonePr === true">
            <h3>Practice DONE</h3>
          </div>
          <div v-else>
            <h3>Practice FAILED</h3>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import Modal from "./Modal.vue";

const students = ref([]);
const searchName = ref("");
const newStudent = ref({
  id: "",
  name: "",
  isDonePr: false,
  mark: "",
  group: "",
  photo: "",
});
const selectedStudent = ref(null);
const modalStudentInfo = ref(null);
const isOpen = ref(false);
const store = useStore();

const storeStyle = useStore();
const selectedTheme = ref("dark");

onMounted(() => {
  axios.get("http://34.82.81.113:3000/students").then((response) => {
    students.value = response.data;
    store.commit("setCount", students.value.length);
  });
});

const deleteStudent = (id) => {
  axios.delete(`http://34.82.81.113:3000/students/${id}`).then((response) => {
    console.log(response);
    const index = students.value.findIndex((stud) => stud._id === id);
    if (index !== -1) {
      students.value.splice(index, 1);
    }
    store.commit("setCount", students.value.length);
  });
};

const addStudent = () => {
  axios
    .post("http://34.82.81.113:3000/students", newStudent.value)
    .then((response) => {
      console.log(response.data);
      students.value.push(response.data);
      store.commit("setCount", students.value.length);
    });

  newStudent.value.name = "";
  newStudent.value.isDonePr = false;
  newStudent.value.group = "";
  newStudent.value.mark = "";
};

const selectStudent = (stud) => {
  selectedStudent.value = { ...stud };
};

const modalStudent = (stud) => {
  modalStudentInfo.value = { ...stud };
};
const changeTheme = () => {
  storeStyle.commit("setStyle", selectedTheme.value);
};

const styleSwitcher = computed(() => {
  return storeStyle.getters.getStyle;
});

const studentsNumber = computed(() => {
  return store.getters.getCount;
});

const saveChanges = () => {
  axios
    .put(
      `http://34.82.81.113:3000/students/${selectedStudent.value._id}`,
      selectedStudent.value
    )
    .then((response) => {
      console.log("Data changed:", response.data);

      const index = students.value.findIndex(
        (stud) => stud._id === selectedStudent.value._id
      );
      if (index !== -1) {
        students.value[index] = { ...selectedStudent.value };
      }
      selectedStudent.value = null;
    });
};
// const filteredStudents = computed(() => {
//   const searchQuery = searchName.value.toLowerCase();
//   return students.value.filter((student) =>
//     student.name.toLowerCase().includes(searchQuery)
//   );
// });
</script>
<style scoped>
.light {
  background-color: #ffffff;
  color: #000000;
  padding: 15px;
}
.dark {
  background-color: #a7a7a7;
  color: #ffffff;
  padding: 15px;
}
.dark table {
  background-color: #333; /* Цвет фона таблицы */
  color: #fff; /* Цвет текста */
}
.dark th,
td {
  border-bottom: 1px solid #555; /* Цвет горизонтальных линий между ячейками */
}
.dark th {
  background-color: #555; /* Цвет фона заголовка */
}
.dark tbody tr:nth-child(even) {
  background-color: #444; /* Цвет фона четных строк */
}
.dark tbody tr:nth-child(odd) {
  background-color: #333; /* Цвет фона нечетных строк */
}
.dark a {
  color: #00f; /* Цвет ссылок */
  text-decoration: none;
}
.dark a:hover {
  text-decoration: underline; /* Подчеркивание ссылок при наведении */
}
.dark p {
  color: #000000;
}
.dark h1 {
  color: #000000;
}
</style>
