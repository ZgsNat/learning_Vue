<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>Create New Student</h3>
        <form @submit.prevent="handleSubmit">
            
          <input v-model="newStudent.StudentId" id="firstName" type="text" hidden/> 
          <label for="firstName">First Name:</label>
          <input v-model="newStudent.FirstName" id="firstName" type="text" required />
  
          <label for="lastName">Last Name:</label>
          <input v-model="newStudent.LastName" id="lastName" type="text" required />
  
          <label for="dob">Date of Birth:</label>
          <input v-model="newStudent.DOB" id="dob" type="date" required />
  
          <label for="gender">Gender:</label>
          <select v-model="newStudent.Gender" id="gender" required>
            <option :value="true">Male</option>
            <option :value="false">Female</option>
          </select>
  
          <label for="email">Email:</label>
          <input v-model="newStudent.Email" id="email" type="email" required />
  
          <label for="phoneNumber">Phone Number:</label>
          <input v-model="newStudent.PhoneNumber" id="phoneNumber" type="text" required />
  
          <label for="major">Major:</label>
          <select v-model="newStudent.MajorSubject" id="major" required>
            <option v-for="major in majors" :key="major.MajorId" :value="major">
              {{ major.MajorName }}
            </option>
          </select>
  
          <button type="submit">Create</button>
          <button type="button" @click="$emit('update:visible', false)">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, inject ,ref, watch} from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import Student from '../models/Student';
  
  const props = defineProps({
    visible: Boolean,
  });
  
  console.log(props.visible)
  const majors = inject('majors', []);
  const maxId = inject('maxId', ref(0)); // Default to ref(0) if not provided

  watch(maxId,(newVal)=>{
    maxId.value = newVal
    newStudent.StudentId = maxId.value + 1;
    //console.log(maxId.value)
  })
  const emit = defineEmits(['update:visible', 'create']);
  
  const newStudent = reactive(new Student());
  const handleSubmit = () => {
    emit('create', { ...newStudent });
    newStudent.StudentId = 
    emit('update:visible', false);
    // Reset the form fields
    Object.assign(newStudent, new Student());
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
  }
  </style>
  