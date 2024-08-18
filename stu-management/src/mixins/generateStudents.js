import { ref, reactive, onMounted } from 'vue';
import Student from '../models/Student';
import Major from '../models/Major';

export default function useStudent() {
  const majors = reactive([
    new Major(1, 'Computer Science'),
    new Major(2, 'Business'),
    new Major(3, 'Mathematics'),
    new Major(4, 'Physics'),
    new Major(5, 'Chemistry')
  ]);

  const students = ref([]);

  const generateStudents = () => {
    students.value = [];
    for (let i = 1; i <= 20; i++) {
      const student = new Student(
        i,
        `First${i}`,
        `Last${i}`,
        `2000-01-${i.toString().padStart(2, '0')}`,
        i % 2 === 0,
        `student${i}@example.com`,
        `012345678${i.toString().padStart(2, '0')}`,
        majors[Math.floor(Math.random() * majors.length)]
      );

      students.value.push(student);
    }
  };

  onMounted(() => {
    generateStudents();
  });

  return {
    students,
    majors,
    generateStudents
  };
}
