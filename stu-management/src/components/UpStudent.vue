<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h3>Update Student</h3>
        <form @submit.prevent="handleSubmit">
          <input v-model="updatedStudent.StudentId" id="firstName" type="text" hidden/> 
  
          <label for="firstName">First Name:</label>
          <input v-model="updatedStudent.FirstName" id="firstName" type="text" required />
  
          <label for="lastName">Last Name:</label>
          <input v-model="updatedStudent.LastName" id="lastName" type="text" required />
  
          <label for="dob">Date of Birth:</label>
          <input v-model="updatedStudent.DOB" id="dob" type="date" required />
  
          <label for="gender">Gender:</label>
          <select v-model="updatedStudent.Gender" id="gender" required>
            <option :value="true">Male</option>
            <option :value="false">Female</option>
          </select>
  
          <label for="email">Email:</label>
          <input v-model="updatedStudent.Email" id="email" type="email" required />
  
          <label for="phoneNumber">Phone Number:</label>
          <input v-model="updatedStudent.PhoneNumber" id="phoneNumber" type="text" required />
  
          <label for="major">Major:</label>
          <select v-model="updatedStudent.MajorSubject" id="major" required>
            <option v-for="major in majors" :key="major.MajorId" :value="major">
              {{ major.MajorName }}
            </option>
          </select>
  
          <button type="submit">Update</button>
          <button type="button" @click="$emit('update:visible', false)">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, inject, watch } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    visible: Boolean,
    studentData: Object,
  });
  
  const majors = inject('majors', []);
  const emit = defineEmits(['update:visible', 'update']);
  
  const updatedStudent = reactive({ ...props.studentData });
  
  watch(() => props.studentData, (newData) => {
    Object.assign(updatedStudent, newData); // Sync with props when data changes
  });
  
  const handleSubmit = () => {
    emit('update', { ...updatedStudent });
    emit('update:visible', false);
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
  