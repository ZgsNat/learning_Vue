import Major from './Major'; // Ensure this path is correct

export default class Student {
  constructor(
    StudentId = '',
    FirstName = '',
    LastName = '',
    DOB = '',
    Gender = true,
    Email = '',
    PhoneNumber = '',
    MajorSubject = new Major()
  ) {
    this.StudentId = StudentId;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.DOB = DOB;
    this.Gender = Gender;
    this.Email = Email;
    this.PhoneNumber = PhoneNumber;
    this.MajorSubject = MajorSubject;
  }
}
