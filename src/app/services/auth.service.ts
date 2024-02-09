import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrls } from '../api.urls';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Course } from '../pages/course-list/course.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

 

  

 http = inject(HttpClient);
 private apiUrl = 'http://localhost:8800/api/course/getAllCourses';
 

 registerService(registerObj:any){
  // console.log(`${apiUrls}register`);
  return this.http.post<any>('http://localhost:8800/api/auth/register',registerObj);
 }
 loginService(loginObj:any){
  return this.http.post<any>('http://localhost:8800/api/auth/login',loginObj);
 }
 getAllCourses(): Observable<Course[]> {
  return this.http.get<Course[]>(this.apiUrl);
}
updateCourse(courseId:string,updatedCourse:any): Observable<any> {
  return this.http.put<any>(`http://localhost:8800/api/course/updateCourse/${courseId}`, updatedCourse);
}
deleteCourse(courseId: string): Observable<any> {
  return this.http.delete<any>(`http://localhost:8800/api/course/deleteCourse/${courseId}`);
}
getCourseById(courseId:any) {
  return this.http.get<Course[]>('http://localhost:8800/api/course/getCourseById/'+courseId);
}
loginUser(credentials: any): Observable<any> {
  return this.http.post(`http://localhost:8800/api/auth/login`, credentials);
}
isAdmin(): Observable<boolean> {
  // Check if the user is an admin by making an API call
  // Replace this with the actual implementation in your application
  return this.http.get<boolean>('http://localhost:8800/api/auth/login');
}


}
