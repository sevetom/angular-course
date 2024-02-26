import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], this.forbiddenNames.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      'projectStatus': new FormControl('critical')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Test') {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.it') {
          resolve({'emailIsForbidden': true});
        }
        resolve(null);
      }, 1000);
    });
    return promise;
  }
}
