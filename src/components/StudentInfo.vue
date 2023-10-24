<template>
    {{ student.name }}
</template>

<script >
import axios from 'axios';

export default ({
    props:{
        id:'',
    },
    data(){
        return{
            student:{},

        }
    },
    mounted () {
       axios.get("http://34.82.81.113:3000/students/"+this.id)
        .then(data => {
            this.student =  data.data;
        })},
})
</script>