import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from 'src/model/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  getTeacher(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teachers`);
  };

  createTeacher(teacher: Teacher): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${this.apiUrl}/teachers`, teacher, {
      headers: this.headers,
      observe: 'response'
    })
  }

  // get teacher by id
  getTeacherid(id: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/teachers/${id}`);
  }

  // Update teacher
  updateTeacher(teacher: Teacher): Observable<HttpResponse<any>> {
    return this.http.put(`${this.apiUrl}/teachers/${teacher._id}`, teacher, {
      headers: this.headers,
      observe: 'response'
    });
  };

  // delete teacher
  deleteTeacher(id: string): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(`${this.apiUrl}/teachers/${id}`, {
      observe: 'response'
    });
  };
}
