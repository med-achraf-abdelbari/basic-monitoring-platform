import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  addServerForm: FormGroup;
  @Input() isSite: boolean;
  @Output() serviceDetails = new EventEmitter<any>();

  constructor(private _toasterService: ToastrService) {
  }

  initForm() {
    this.addServerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.addServerForm.valid) {
      this.serviceDetails.emit({
        name: this.addServerForm.get('name').value,
        url: this.addServerForm.get('url').value
      });
    } else {
      this._toasterService.error('Please verify all required fields!');
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

}
