import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Course } from './course.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCourseComponent } from '../edit-course/edit-course.component';


@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule,ReactiveFormsModule,FormsModule,EditCourseComponent],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
 
  showUpdateModal: boolean = false;
  isModalVisible = false;
  selectedCourse: any;
  authService = inject(AuthService);
  // http = inject(HttpClient);
 
  constructor(private courseService: AuthService, private router:Router,private httpClient:HttpClient) {}
  // updateCourse(courseData: any) {
  //   const courseId = this.selectedCourse._id; // Assuming your course object has an '_id' property
  //   this.courseService.updateCourse(courseId, courseData)
  //     .subscribe(
  //       (response) => {
  //         console.log('Course updated successfully:', response);
  //         // Close the modal after updating
  //         this.closeUpdateModal(false);
  //       },
  //       (error) => {
  //         console.error('Error updating course:', error);
  //       }
  //     );
  // }
  ngOnInit(): void {
    this.loadCourses();
  }
    public loadCourses(): void {
      this.courseService.getAllCourses().subscribe(
        (courses) => {
          this.courses = courses;
        },
        (error) => {
          console.error('Error loading courses:', error);
        }
      );

   
  }
  openModal(course: any): void {
    course.isModalVisible = true;
  }

  closeUpdateModal(course: any): void {
    course.isModalVisible = false;
  }
  onDeleteCourse(courseId: string): void {
    // Ask for confirmation
    const isConfirmed = confirm('Are you sure you want to delete this course?');
  
    if (isConfirmed) {
      this.courseService.deleteCourse(courseId)
        .subscribe(
          () => {
            // Remove the deleted course from the local array
            this.courses = this.courses.filter(c => c._id !== courseId);
            console.log('Course deleted successfully');
            alert('Course deleted successfully');
          },
          error => {
            console.error('Error deleting course: ', error);
          }
        );
        }
      }
  
  

  getCourses(): void {
    this.authService.getAllCourses()
        .subscribe(
          (response) => {
            this.courses = response;
          },
          (error) => {
            console.error('Error fetching courses:', error);
          }
        );
}

}

  

