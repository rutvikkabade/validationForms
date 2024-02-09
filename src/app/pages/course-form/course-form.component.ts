import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule]
})
export class CourseFormComponent {
  fb = new FormBuilder();
  courseForm!: FormGroup;

  constructor(private http: HttpClient) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      courseDetail: ['', Validators.required],
      courseImage: [''],
      coursePrice: [0, Validators.required],
      courseFile: ['', Validators.required]
    });
    
  }
  // onfile(event: any): void {
  //   const fileInput = event.target;

  //   if (fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     this.courseForm.patchValue({
  //       courseFile: file
  //     });
  //   }
  // }
  

  onSubmit(): void {
    const formData = new FormData();

// append other form values
formData.append('courseName', this.courseForm.get('courseName')?.value);
formData.append('courseDetail', this.courseForm.get('courseDetail')?.value);
formData.append('coursePrice', this.courseForm.get('coursePrice')?.value.toString());

// append file
// const courseFile = this.courseForm.get('courseFile')?.value;
// formData.append('courseFile', courseFile);

// make HTTP post request
this.http.post('http://localhost:8800/api/course/createCourse', formData)
  .subscribe(
    response => {
      console.log('Course added successfully', response);
      alert('Course added successfully');
      this.courseForm.reset();
    },
    error => {
      console.log('Error adding course', error);
    }
  );
  }
}
