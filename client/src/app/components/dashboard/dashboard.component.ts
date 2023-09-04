import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teachers: any[] = [];

  constructor(
    private teacherService: TeacherService
  ) {

  }

  ngOnInit(): void {
      this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getTeacher().subscribe(
      (res) => {
        console.log('Response for getting teachers', res);
        this.teachers = res;
      },
      (err: any) => {
        console.log('Error while getting teachers', err);
      },
      () => {
        console.log('Completed getting teachers');
      }
    );
  };

  // Delete teacher
  deleteTeacher(id: string) {
    this.teacherService.deleteTeacher(id).subscribe(
      () => {
          this.teachers = this.teachers.filter(teacher => teacher._id !== id);
      },
      (err: any) => {
        console.log('Error deleting teacher', err);
      }
    )
  };

}
