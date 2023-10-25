<template>
  <div>
    <h1>Searching</h1>
    <input class="input" placeholder="type name" v-model="searchName" />
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Group</th>
          <th>Grade</th>
          <th>Work Done</th>
        </tr>
      </thead>
      <tbody v-for="(stud, index) in students" :key="index">
        <td>
          <!-- <a @click="openModal(student)">
                      <img v-if="student.photo" :src="student.photo" alt="Фото студента" width="50">
                  </a> -->
        </td>
        <td :class="{ red: stud.highlighted }">
          <router-link v-bind:to="'/student-info/' + stud._id">
            {{ stud.name }}
          </router-link>
        </td>
        <td>
          <input class="input" type="checkbox" v-model="stud.workDone" />
        </td>
        <td>{{ stud.group }}</td>
        <td>{{ stud.grade }}</td>
        <td>
          <a @click="editStudent(stud._id)" href="../assets/icons-edit.png"></a>
          <a @click="deleteStudent(stud._id)">Delete</a>
        </td>
      </tbody>
    </table>

    <div class="addStudent">
      <input class="input" placeholder="add name" v-model="newStudent.name" />
      <input class="input" v-model="newStudent.workDone" type="checkbox" />
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
        v-model="newStudent.grade"
        type="number"
        placeholder="grade"
      />
      <button class="input" @click="addStudent()">Add student</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      students: [],
      searchName: "",
      newStudent: { id: "", name: "", workDone: false, group: "", photo: "" },
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
      this.newStudent.workDone = false;
      this.newStudent.group = "";
      this.newStudent.grade = "";
    },
    computed: {
      filteredStudents: function () {
        const searchNameLower = this.searchName.toLowerCase();
        return this.students.map((stud) => ({
          ...stud,
          highlighted:
            stud.name.toLowerCase().includes(searchNameLower) &&
            searchNameLower.length > 0,
        }));
      },
    },
  },
};
</script>
