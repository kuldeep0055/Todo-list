import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../../Core/Service/apiservice.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';





@Component({
  selector: 'app-dailogbox',
  templateUrl: './dailogbox.component.html',
  styleUrls: ['./dailogbox.component.css']
})
export class DailogboxComponent {
  profileForm!: FormGroup
  data: any

  constructor(public dialog: MatDialog,
    public FormBuilder: FormBuilder,
    private api: ApiserviceService,
    public dialogRef: MatDialogRef<DailogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public editId: any,
    public _snackBar: MatSnackBar
  ) {
    this.profileForm = this.FormBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.editId) {
      this.api.editPost(this.editId).subscribe((resp) => {
        this.data = resp
        this.profileForm.patchValue({
          title: this.data.title,
          body: this.data.body
        })
      })
    }
  }

  createPost() {
    if(this.profileForm.valid){
      this.api.createPost(this.profileForm.value).subscribe((res)=>{
      this._snackBar.open('create post successfully', 'ok', { duration: 5000 })
      })
    }
  }

  updatepost(){
    this.api.updatePost(this.editId,this.profileForm.value).subscribe((res)=>{
      this._snackBar.open('update post successfully', 'ok', { duration: 5000 })
    })
   
  }
}


