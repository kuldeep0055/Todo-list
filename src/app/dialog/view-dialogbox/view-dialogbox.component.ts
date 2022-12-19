import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-dialogbox',
  templateUrl: './view-dialogbox.component.html',
  styleUrls: ['./view-dialogbox.component.css']
})
export class ViewDialogboxComponent {
  profileForm!: FormGroup
  data: any

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public viewData: any,
    public FormBuilder: FormBuilder) {
    this.profileForm = this.FormBuilder.group({
      title: [''],
      body: ['']
    })
  }

  ngOnInit() {
      this.profileForm = this.FormBuilder.group({
        title: this.viewData.title,
        body: this.viewData.body
      })
    

  }

}
