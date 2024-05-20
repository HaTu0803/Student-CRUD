interface TStudent {
    Code: string;
    Name: string;
    DateOfBirth: Date;
    Email: string;
    Score: number;
  }
  
  class Student {
    data: Array<TStudent> = [];
  
    constructor() {
      this.data = [
        {
          Code: '001',
          Name: 'Nguyen Van A',
          DateOfBirth: new Date('1999-01-01'),
          Email: 'nvAn@gmail.com',
          Score: 9
        },
        {
          Code: '002',
          Name: 'Nguyen Van B',
          DateOfBirth: new Date('1999-01-02'),
          Email: 'nvB@gmail.com',
          Score: 8
        },
      ];
      this.showDataToTable();
    }
  
    showDataToTable() {
      let _str = '';
      let tbodyList:any = document.getElementById('tbodyList');
      for (const std of this.data) {
        _str += `<tr>
                    <td>${std.Code}</td>
                    <td>${std.Name}</td>
                    <td>${std.DateOfBirth.toISOString().substring(0, 10)}</td>
                    <td>${std.Email}</td>
                    <td>${std.Score}</td>
                    <td class="actions">
                        <button class="edit" onclick="editStudent('${std.Code}')">Edit</button>
                        <button class="delete" onclick="deleteStudent('${std.Code}')">Delete</button>
                    </td>
                </tr>`;
      }
      tbodyList.innerHTML = _str;
    }
  
    addOrUpdateStudent(student: TStudent) {
      const index = this.data.findIndex(std => std.Code === student.Code);
      if (index !== -1) {
        // Update
        this.data[index] = student;
      } else {
        // Add
        this.data.push(student);
      }
      this.showDataToTable();
    }
  
    deleteStudent(code: string) {
      this.data = this.data.filter(std => std.Code !== code);
      this.showDataToTable();
    }
  
    getStudent(code: string): TStudent | undefined {
      return this.data.find(std => std.Code === code);
    }
  }
  var std = new Student();
  std.showDataToTable();

  let studentApp = new Student();
  
  (window as any).editStudent = (code: string) => {
    const student = studentApp.getStudent(code);
    if (student) {
      (document.getElementById('student-code') as HTMLInputElement).value = student.Code;
      (document.getElementById('student-name') as HTMLInputElement).value = student.Name;
      (document.getElementById('student-dob') as HTMLInputElement).value = student.DateOfBirth.toISOString().substring(0, 10);
      (document.getElementById('student-email') as HTMLInputElement).value = student.Email;
      (document.getElementById('student-score') as HTMLInputElement).value = student.Score.toString();
    }
  };
  
  (window as any).deleteStudent = (code: string) => {
    studentApp.deleteStudent(code);
  };
  
  document.getElementById('student-form')!.addEventListener('submit', function (e) {
    e.preventDefault();
    const code = (document.getElementById('student-code') as HTMLInputElement).value || Date.now().toString();
    const name = (document.getElementById('student-name') as HTMLInputElement).value;
    const dob = new Date((document.getElementById('student-dob') as HTMLInputElement).value);
    const email = (document.getElementById('student-email') as HTMLInputElement).value;
    const score = parseInt((document.getElementById('student-score') as HTMLInputElement).value);
  
    const newStudent: TStudent = { Code: code, Name: name, DateOfBirth: dob, Email: email, Score: score };
    studentApp.addOrUpdateStudent(newStudent);
  
    (document.getElementById('student-form') as HTMLFormElement).reset();
    (document.getElementById('student-code') as HTMLInputElement).value = '';
  });
  