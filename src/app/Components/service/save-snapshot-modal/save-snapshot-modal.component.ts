import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
// import { Socket } from 'ngx-socket-io';
 
@Component({
  selector: 'ngx-save-snapshot-modal',
  templateUrl: './save-snapshot-modal.component.html',
  styleUrls: ['./save-snapshot-modal.component.scss']
})
export class SaveSnapshotModalComponent implements OnInit{
  @Input() content: string;
  @Input() headerIcon: string;
  @Input() downManyServices: boolean;
  @Input() confirmButtonContent : string;
  @Input() DenyButtonContent : string;
  @Input() validateButtonContent : string;
  /**
   * a variable for the list of services to stop (we need them to add some comments to them)
   */
  @Input() servicesToStop : any[];

  isPopupOpen: boolean;

  /**
   * a boolean variable used to show the text area for adding a comment to the newly saved snapshot
   */
  showCommentInput: boolean = true;
  form : FormGroup;
  // form = new FormGroup({
  //   answer: new FormControl(true),
  //   comment: new FormControl(''),
  // })

  // logs: any[] = [];

  constructor(protected ref: NbDialogRef<SaveSnapshotModalComponent>, private fb: FormBuilder) {
      // this.socket.fromEvent('logs').subscribe(log => {
      //   this.logs.push(log);
      // })
   }

  ngOnInit(): void {
    this.isPopupOpen = true;

    // Create controls for comments dynamically
    const commentControls = {};
    if(this.servicesToStop){
      for (const service of this.servicesToStop) {
        commentControls[service.service_id] = new FormControl('');
      }
    }

    // Initialize the form with the appropriate controls
    this.form = this.fb.group({
      answer: new FormControl(true),
      comments: this.fb.group(commentControls),
    });
  }

  submit() {
    if(this.form.valid){
      this.ref.close(this.form.value);
    }
    else {
      console.log('form is not valid');
      // this.ref.close()
    }
  }

  cancel() {
    this.ref.close();
  }
  /**
   * a function that changes the value of showCommentInput based on the clicked button
   * @param show boolean variable
   */
  showCommentTextArea(show: boolean){
    this.showCommentInput =show;
  }
}