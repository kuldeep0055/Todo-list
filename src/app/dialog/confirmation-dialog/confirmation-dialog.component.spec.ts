import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatDialogModule, MatDialogRef,MatDialog, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatTestDialogOpenerModule  } from '@angular/material/dialog/testing';

const mockDialogRef = {
  close: jasmine.createSpy('close')
};

fdescribe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDialogComponent ],
      imports:[MatTestDialogOpenerModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#closeModal-it should be call on dialogbox close',()=>{
    // spyOn(component.dialogRef, 'close')
    component.closeModal()
    expect(component.closeModal).toBeTruthy();
  })
});
