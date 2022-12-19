import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewDialogboxComponent } from './view-dialogbox.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

const mockDialogRef = {
  close: jasmine.createSpy('close')
};

fdescribe('ViewDialogboxComponent', () => {
  let component: ViewDialogboxComponent;
  let fixture: ComponentFixture<ViewDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDialogboxComponent ],
      imports:[MatDialogModule,ReactiveFormsModule,MatInputModule,MatFormFieldModule,BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit- it should be called',()=>{
    component.viewData={
      title:'xyz',
      body:'abc'
    }
    component.ngOnInit();
    expect(component.profileForm.value).toEqual(component.viewData);
  })

});
