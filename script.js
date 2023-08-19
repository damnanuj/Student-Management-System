







const students = [
    {
      ID: 1,
      name: 'Anuj',
      grade: 'A',
      age: 22,
      degree: 'BSC',
      email: 'anuj@example.com'
    },
    {
      ID: 2,
      name: 'Harry',
      age: 23,
      grade: 'B',
      degree: 'Btech',
      email: 'harry@example.com'
    },
    {
      ID: 3,
      name: 'Rick',
      age: 24,
      grade: 'A',
      degree: 'MCA',
      email: 'rick@example.com'
    }
  ];
  
  const table = document.getElementById('student-table');
  const form = document.getElementById('student-form');
  const searchInput = document.getElementById('search-input');
  
  // Function to render the table with student data
  function renderTable(studentList = students) {
    table.querySelector('tbody').innerHTML = '';
  
    studentList.forEach(student => {
      const row = table.querySelector('tbody').insertRow();
  
      row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}</td>
        <td><button class="edit-button">Edit</button></td>
        <td><button class="delete-button">Delete</button></td>
      `;
  
      row.querySelector('.edit-button').addEventListener('click', () => editStudent(student));
      row.querySelector('.delete-button').addEventListener('click', () => deleteStudent(student));
    });
  }
  
  // Function to add a new student
  function addStudent(event) {
    event.preventDefault();
  
    const newStudent = {
      ID: students.length + 1,
      name: form.name.value,
      age: form.age.value,
      grade: form.grade.value,
      degree: form.degree.value,
      email: form.email.value
    };
  
    students.push(newStudent);
    form.reset();
    renderTable();
  }
  
  // Function to edit a student
  function editStudent(student) {
    form.name.value = student.name;
    form.email.value = student.email;
    form.age.value = student.age;
    form.grade.value = student.grade;
    form.degree.value = student.degree;
  
    form.querySelector('button[type="submit"]').textContent = 'Edit Student';
    form.removeEventListener('submit', addStudent);
    form.addEventListener('submit', (event) => updateStudent(event, student));
  }
  
  // Function to update a student
  function updateStudent(event, student) {
    event.preventDefault();
  
    student.name = form.name.value;
    student.age = form.age.value;
    student.grade = form.grade.value;
    student.degree = form.degree.value;
    student.email = form.email.value;
  
    form.reset();
    form.querySelector('button[type="submit"]').textContent = 'Add Student';
    form.removeEventListener('submit', updateStudent);
    form.addEventListener('submit', addStudent);
  
    renderTable();
  }
  
  // Function to delete a student
  function deleteStudent(student) {
    const index = students.indexOf(student);
    if (index !== -1) {
      students.splice(index, 1);
      renderTable();
    }
  }
  
  // Function to search for students
  function searchStudents() {
    const searchText = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
    );
    renderTable(filteredStudents);
  }
  
  // Event listeners
  form.addEventListener('submit', addStudent);
  searchInput.addEventListener('input', searchStudents);
  
  // Initial rendering of the table
  renderTable();
  