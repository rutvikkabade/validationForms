import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  courses: any[] = [];

  constructor(private courseService:AuthService){}
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
}
