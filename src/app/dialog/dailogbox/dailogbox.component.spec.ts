import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailogboxComponent } from './dailogbox.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';

class MatSnackBarStub{
  open(){
    return {
      onAction: () => of({})
    }
  }

}

fdescribe('DailogboxComponent', () => {
  let component: DailogboxComponent;
  let fixture: ComponentFixture<DailogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailogboxComponent],
      imports: [MatDialogModule, HttpClientTestingModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, MatSnackBarModule],
      providers: [{
        provide: MatDialogRef,
        useValue: []
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: [{}]
      },
      { provide: MatSnackBar , useClass: MatSnackBarStub }

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DailogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#ngOnInit- it should be called', () => {
    // spyOn(component, 'profile')
    component.editId = {
      title: '',
      body: ''
    }
    component.ngOnInit();
    expect(component.profileForm.value).toEqual(component.editId);
    component.profileForm.patchValue({title:'',body:''})

  })

  it('#createPost-it should be called', () => {
    const formData={
      id:0,
      title:'xyz',
      body:'abc'
    }
    component.profileForm = component.FormBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]

    })
    component.createPost()
    spyOn(component,'createPost')
    console.log(component.createPost)
    expect(component.createPost.length).toEqual(0)
  })

  it('#updatepost-it should be called',()=>{
    component.updatepost()
    spyOn(component._snackBar,"open").and.callThrough();
    expect(component._snackBar.open).toHaveBeenCalled();
  })
});
