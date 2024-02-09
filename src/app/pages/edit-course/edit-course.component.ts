import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseListComponent } from '../course-list/course-list.component';

@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,CourseListComponent],
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent {
  @Input() showModal!: boolean;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() updatedCourse: any;

  updateForm!: FormGroup;
 
  router = inject(Router);
  


  constructor( private formBuilder: FormBuilder,
    private courseService: AuthService) { }
    ngOnInit(): void {
      this.updateForm = this.formBuilder.group({
        courseName: [this.updatedCourse.courseName, Validators.required],
        courseDetail: [this.updatedCourse.courseDetail, Validators.required],
        coursePrice: [this.updatedCourse.coursePrice, Validators.required],
     
      });
    }
    onSubmit() {
      if (this.updateForm.valid) {
        const updatedCourseData = this.updateForm.value;
        this.courseService.updateCourse(this.updatedCourse._id, updatedCourseData)
          .subscribe({
            next: (response) => {
              console.log('Course updated successfully:', response);
              alert("course updated successfully");
              this.closeModal.emit();
              // Optionally, emit an event or perform other actions upon successful update
            },
            error: (error) => {
              console.error('Error updating course:', error);
              // Handle error (e.g., display error message)
            }
          });
        }
      }
    
   

  // ngOnInit(): void {
  //   this.updateForm = this.formBuilder.group({
  //     courseName: [this.updatedCourse.courseName, Validators.required],
  //     courseDetail: [this.updatedCourse.courseDetail, Validators.required],
  //     coursePrice: [this.updatedCourse.coursePrice, Validators.required],
  //     courseFile:[this.updatedCourse.courseFile, Validators.required],
  //   });
  // }
 
  
}
