<template>
  <div>
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

<script>
import axios from "axios";
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      students: [],
      searchName: "",
      newStudent: {
        id: "",
        name: "",
        isDonePr: false,
        mark: "",
        group: "",
        photo: "",
      },
      selectedStudent: null,
      modalStudentInfo: null,
      isOpen: false,
    };
  },

  mounted() {
    axios.get("http://34.82.81.113:3000/students").then((data) => {
      this.students = data.data;
    });
  },
  methods: {
    deleteStudent(id) {
      axios.delete(`http://34.82.81.113:3000/students/${id}`).then((data) => {
        console.log(data);
        const index = this.students.findIndex((stud) => stud._id === id);
        if (index !== -1) {
          this.students.splice(index, 1);
        }
      });
    },
    addStudent() {
      axios
        .post("http://34.82.81.113:3000/students", this.newStudent)
        .then((response) => {
          console.log(response.data);
          this.students.push(response.data);
        });

      this.newStudent.name = "";
      this.newStudent.isDonePr = false;
      this.newStudent.group = "";
      this.newStudent.mark = "";
    },
    selectStudent(stud) {
      this.selectedStudent = { ...stud }; //new copy of selected student
    },
    modalStudent(stud) {
      this.modalStudentInfo = { ...stud }; //new copy of selected student
    },
    saveChanges() {
      axios
        .put(
          `http://34.82.81.113:3000/students/${this.selectedStudent._id}`,
          this.selectedStudent
        )
        .then((response) => {
          console.log("Data changed:", response.data);

          const index = this.students.findIndex(
            (stud) => stud._id === this.selectedStudent._id
          );
          if (index !== -1) {
            this.students[index] = { ...this.selectedStudent };
          }
          this.selectedStudent = null;
        });
    },
  },
  computed: {
    filteredStudents: function () {
      const searchQuery = searchName.value.toLowerCase();
      return students.value.filter((student) =>
        student.name.toLowerCase().includes(searchQuery)
      );
    },
  },
};
</script>
