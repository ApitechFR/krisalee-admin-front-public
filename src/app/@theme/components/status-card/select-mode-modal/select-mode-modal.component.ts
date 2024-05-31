import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from "@nebular/theme";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'ngx-select-mode-modal',
  templateUrl: './select-mode-modal.component.html',
  styleUrls: ['./select-mode-modal.component.scss']
})
export class SelectModeModalComponent implements OnInit {

  @Input() headerIcon: string;
  @Input() content: string;
  @Input() validateButtonContent: string;
  isPopupOpen: true;
  @Input() modeDemarrageOptions: { label: string, value: string, description: string, default: boolean }[] = [];
  @Input() defaultValue:any;
  selectedDescription: string = '';
  // loading= true;
  form: FormGroup = new FormGroup({
    modeDemarrage: new FormControl(null, Validators.required)
  });


  constructor(
    protected ref: NbDialogRef<SelectModeModalComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.isPopupOpen = true;
    this.form.get('modeDemarrage')?.setValue(this.defaultValue);
    this.onModeChange(this.defaultValue);
  }


  cancel() {
    this.ref.close();
  }

  submit() {
    if (this.form.valid) {
      this.ref.close(this.form.value);
    }
  }

  onModeChange(event: any) {
    const selectedOption = this.modeDemarrageOptions.find(option => option.value === event);
    if (selectedOption) {
      this.selectedDescription = selectedOption.description;
    }
  }
}
