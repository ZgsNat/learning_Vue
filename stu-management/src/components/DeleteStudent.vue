<template>
    <div v-if="visible" class="modal fade show" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="confirmDelete">
            <div class="modal-header">
              <h4 class="modal-title">Delete Student</h4>
              <button type="button" class="close" @click="cancelDelete" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this student?</p>
              <p class="text-warning"><small>This action cannot be undone.</small></p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" @click="cancelDelete">Cancel</button>
              <button type="submit" class="btn btn-danger">Delete</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    visible: Boolean,
    studentId: Number
  });
  
  const emit = defineEmits(['update:visible', 'delete']);
  
  const cancelDelete = () => {
    console.log('cancel')
    emit('update:visible', false);
  };
  
  const confirmDelete = () => {
    console.log('confirm')
    emit('delete', props.studentId);
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