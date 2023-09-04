import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/model/teacher.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  teacher: Teacher;
  createForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {
      this.createForm = this.fb.group({
        name: ['', [Validators.required]],
        experience: ['', [Validators.required]],
        previousEmployer: ['', [Validators.required]]
      })
      this.teacher = new Teacher();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if(id !== undefined) {
        this.teacherService.getTeacherid(id).subscribe(res => {
          this.teacher = res;
          this.createForm.patchValue(this.teacher);
        })
      }
    })
  }

  async subCreate() {
    this.submitted = true;

    if(this.createForm.invalid) {
      return;
    };

    const formData = this.createForm.value;
    const operation = this.teacher._id
    ? this.teacherService.updateTeacher({ ...this.teacher, ...formData })
    : this.teacherService.createTeacher(formData);

    try {
      await operation.toPromise();
      this.router.navigate(['/dashboard']);
    } catch(err) {
      console.error('Error occured: ' + err);
    }
  };

  // subCreate() {
  //   this.submitted = true;
  //   if(this.createForm.invalid) {
  //     return;
  //   };

  //   this.teacherService.createTeacher(this.createForm.value).subscribe(
  //     () => {
  //       this.router.navigate(['/dashboard'])
  //     }
  //   );

  //   if(this.teacher._id !== undefined) {
  //     this.teacherService.updateTeacher(this.createForm.value).subscribe(
  //       () => {
  //         this.router.navigate(['/dashboard'])
  //       }
  //     )
  //   }
  // }
}
