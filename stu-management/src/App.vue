<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div>
    <h1>Student Mangement</h1>
  </div>
  <div class="container-xl">
    <!-- List Student -->
	<div class="table-responsive">
		<div class="table-wrapper">
			<div class="table-title">
				<div class="row">
					<div class="col-sm-3">
						<h2>Manage <b>Student</b></h2>
					</div>
          <div class="col-sm-3">
            <input type="text"
            v-model="searchFullName"
            placeholder="Search by Full Name"
            class="mb-2"
          />
          </div>
					<div class="col-sm-6">
						<a @click="showCreateModel()" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Student</span></a>					
					</div>
				</div>
			</div>
			<b-table :items="paginatedStudents" :fields="fields" striped hover >
        <template #cell(FullName)="data">
            {{ `${data.item.FirstName} ${data.item.LastName}` }}
        </template>
        <template #cell(Gender)="data">
            {{ data.value ? 'Male' : 'Female' }}
          </template>
        <template #cell(actions)="data">
            <a @click="showUpdateModal(data.item)" class="edit" data-toggle="modal">
              <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
            </a>
            <a @click="showDeleteModal(data.item.StudentId)" class="delete" data-toggle="modal">
              <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
            </a>
          </template>
    </b-table>
			<div class="clearfix">
				<b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="itemsPerPage"
      aria-controls="students-table"
      class="mt-3"/>
			</div>
		</div>
  </div>        
</div>
 <!-- DeleteStudent Modal -->
 <DeleteStudent
      :visible="V_showDelete"
      :studentId="studentIdToCRUD"
      @update:visible="V_showDelete = $event"
      @delete="handleDelete"
    />
 <!-- CreateStudent Modal -->
 <CreateStudent
      :visible="V_showCreate"
      @update:visible="V_showCreate = $event"
      @create="handleCreate"
    />
<!-- UpdateStudent Modal -->
<UpStudent
    :visible="V_showUpdate"
    :studentData="studentToUpdate"
    @update:visible="V_showUpdate = $event"
    @update="handleUpdate"
  />
</template>

<script setup>
import { ref, computed ,watch , reactive, onMounted, provide} from 'vue';
import DeleteStudent from './components/DeleteStudent.vue';
import CreateStudent from './components/CreateStudent.vue';
import UpStudent from './components/UpStudent.vue';
import useStudent from './mixins/generateStudents';

const V_showDelete = ref(false);
const V_showUpdate = ref(false);
const V_showCreate = ref(false);
const { students, majors, generateStudents } = useStudent();
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchFullName = ref('');
const filteredStudents = reactive([]);
const studentToUpdate = ref(null);
const studentIdToCRUD = ref(null);

const fields = [
  { key: 'StudentId', label: 'ID', sortable: true },
  { key: 'FullName', label: 'Full Name', sortable: true },
  { key: 'DOB', label: 'Date of Birth', sortable: true },
  { key: 'Gender', label: 'Gender', sortable: true },
  { key: 'Email', label: 'Email', sortable: true },
  { key: 'PhoneNumber', label: 'Phone Number', sortable: true },
  { key: 'MajorSubject.MajorName', label: 'Major', sortable: true },
  { key: 'actions', label: 'Actions' }
];

const fullName = (student) => `${student.FirstName} ${student.LastName}`;
watch(searchFullName, (newValue) => {
  if (students.value) {
    filteredStudents.value = students.value.filter(student =>
      fullName(student).toLowerCase().includes(newValue.toLowerCase())
    );
  } else {
    filteredStudents.value = []; // Fallback to an empty array
  }
  currentPage.value = 1; // Reset to the first page on search
});

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredStudents.value?.slice(start, end) || []; // Ensure slice is called on an array
});
const totalRows = computed(() => filteredStudents.value.length);


const showDeleteModal = (studentId) => {
  studentIdToCRUD.value = studentId;
  V_showDelete.value = true;
};

const handleDelete = (studentId) => {
  students.value = students.value.filter(student => student.StudentId !== studentId);
  filteredStudents.value = filteredStudents.value.filter(student => student.StudentId !== studentId);
  V_showDelete.value = false;
};

const showCreateModel = () =>{
  V_showCreate.value = true
}

const handleCreate = (newStudent) => {
  students.value.push(newStudent);
  filteredStudents.value = students.value;
};

const showUpdateModal = (student) => {
  studentToUpdate.value = student;
  V_showUpdate.value = true;
};

const handleUpdate = (updatedStudent) => {
  const index = students.value.findIndex(student => student.StudentId === updatedStudent.StudentId);
  if (index !== -1) {
    students.value.splice(index, 1, updatedStudent);
    filteredStudents.value = [...students.value];
  }
  V_showUpdate.value = false;
};
onMounted(()=>{
  generateStudents();
})

const findMaxStudentId = (students) => {
  return students.length > 0 
    ? Math.max(...students.map(student => student.StudentId)) 
    : 0; 
};
const currentMaxId = ref(findMaxStudentId(students.value));

const updateMaxId = () => {
  currentMaxId.value = findMaxStudentId(students.value);
};

// Watch `students` for changes and update `currentMaxId`
watch(() => students.value, updateMaxId, { deep: true });

watch(() => currentMaxId.value, (newValue) => {
  console.log("Updated Max Student ID:", newValue);
});

// Provide `maxId` and `majors` to child components
provide('maxId', currentMaxId);

provide('majors', majors);

generateStudents();
filteredStudents.value = students.value || [];

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
	color: #566787;
	background: #f5f5f5;
	font-family: 'Varela Round', sans-serif;
	font-size: 13px;
}
.table-responsive {
    margin: 30px 0;
}
.table-wrapper {
	background: #fff;
	padding: 20px 25px;
	border-radius: 3px;
	min-width: 1000px;
	box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.table-title {        
	padding-bottom: 15px;
	background: #435d7d;
	color: #fff;
	padding: 16px 30px;
	min-width: 100%;
	margin: -20px -25px 10px;
	border-radius: 3px 3px 0 0;
}
.table-title h2 {
	margin: 5px 0 0;
	font-size: 24px;
}
.table-title .btn-group {
	float: right;
}
.table-title .btn {
	color: #fff;
	float: right;
	font-size: 13px;
	border: none;
	min-width: 50px;
	border-radius: 2px;
	border: none;
	outline: none !important;
	margin-left: 10px;
}
.table-title .btn i {
	float: left;
	font-size: 21px;
	margin-right: 5px;
}
.table-title .btn span {
	float: left;
	margin-top: 2px;
}
table.table tr th, table.table tr td {
	border-color: #e9e9e9;
	padding: 12px 15px;
	vertical-align: middle;
}
table.table tr th:first-child {
	width: 60px;
}
table.table tr th:last-child {
	width: 100px;
}
table.table-striped tbody tr:nth-of-type(odd) {
	background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
	background: #f5f5f5;
}
table.table th i {
	font-size: 13px;
	margin: 0 5px;
	cursor: pointer;
}	
table.table td:last-child i {
	opacity: 0.9;
	font-size: 22px;
	margin: 0 5px;
}
table.table td a {
	font-weight: bold;
	color: #566787;
	display: inline-block;
	text-decoration: none;
	outline: none !important;
}
table.table td a:hover {
	color: #2196F3;
}
table.table td a.edit {
	color: #FFC107;
}
table.table td a.delete {
	color: #F44336;
}
table.table td i {
	font-size: 19px;
}
table.table .avatar {
	border-radius: 50%;
	vertical-align: middle;
	margin-right: 10px;
}
.pagination {
	float: right;
	margin: 0 0 5px;
}
.pagination li a {
	border: none;
	font-size: 13px;
	min-width: 30px;
	min-height: 30px;
	color: #999;
	margin: 0 2px;
	line-height: 30px;
	border-radius: 2px !important;
	text-align: center;
	padding: 0 6px;
}
.pagination li a:hover {
	color: #666;
}	
.pagination li.active a, .pagination li.active a.page-link {
	background: #03A9F4;
}
.pagination li.active a:hover {        
	background: #0397d6;
}
.pagination li.disabled i {
	color: #ccc;
}
.pagination li i {
	font-size: 16px;
	padding-top: 6px
}
.hint-text {
	float: left;
	margin-top: 10px;
	font-size: 13px;
}    
/* Custom checkbox */
.custom-checkbox {
	position: relative;
}
.custom-checkbox input[type="checkbox"] {    
	opacity: 0;
	position: absolute;
	margin: 5px 0 0 3px;
	z-index: 9;
}
.custom-checkbox label:before{
	width: 18px;
	height: 18px;
}
.custom-checkbox label:before {
	content: '';
	margin-right: 10px;
	display: inline-block;
	vertical-align: text-top;
	background: white;
	border: 1px solid #bbb;
	border-radius: 2px;
	box-sizing: border-box;
	z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
	content: '';
	position: absolute;
	left: 6px;
	top: 3px;
	width: 6px;
	height: 11px;
	border: solid #000;
	border-width: 0 3px 3px 0;
	transform: inherit;
	z-index: 3;
	transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
	border-color: #03A9F4;
	background: #03A9F4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
	border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
	color: #b8b8b8;
	cursor: auto;
	box-shadow: none;
	background: #ddd;
}
/* Modal styles */
.modal .modal-dialog {
	max-width: 400px;
}
.modal .modal-header, .modal .modal-body, .modal .modal-footer {
	padding: 20px 30px;
}
.modal .modal-content {
	border-radius: 3px;
	font-size: 14px;
}
.modal .modal-footer {
	background: #ecf0f1;
	border-radius: 0 0 3px 3px;
}
.modal .modal-title {
	display: inline-block;
}
.modal .form-control {
	border-radius: 2px;
	box-shadow: none;
	border-color: #dddddd;
}
.modal textarea.form-control {
	resize: vertical;
}
.modal .btn {
	border-radius: 2px;
	min-width: 100px;
}	
.modal form label {
	font-weight: normal;
}
</style>
