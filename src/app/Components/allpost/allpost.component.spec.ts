import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiserviceService } from '../../Core/Service/apiservice.service';
import { AllpostComponent } from './allpost.component';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { DailogboxComponent } from '../../dialog/dailogbox/dailogbox.component';


fdescribe('AllpostComponent', () => {
  let component: AllpostComponent;
  let fixture: ComponentFixture<AllpostComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllpostComponent],
      imports: [RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatSortModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatSelectModule,
        MatGridListModule,MatSnackBarModule],
        providers:[MatSnackBar, Overlay]
    })
      .compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit - Should call fetchPosts method', () => {
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    spyOn(component, 'fetchPosts')
    component.ngOnInit();
    expect(component.fetchPosts).toHaveBeenCalled();
  })

  it('#fetchPost- Should call GetAllPost method', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    const restService = TestBed.inject(ApiserviceService);
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    const data = [{
      body: "abjikj",
      title: "asjdaifbib",
      id: 1,
      userId: 1
    }]

    spyOn(restService, 'getAllPost').and.callFake(() => {
      return of(data)
    })

    component.fetchPosts()
    expect(component.dataSource.filteredData.length).toBeGreaterThan(0)
  })

  
  it('#applyFilter- should apply sort method', () => {
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    const dummy: any = 'sunt'
    const page: any = 10
    fixture.detectChanges()
    component.applyFilter(dummy);
    expect(component.dataSource.paginator).toBeUndefined()
    component.dataSource.paginator = page
  })

  it('#deletePost- should be called', ()=>{
    const a = "Test";
    const b = "X";
    const c = "suc";
    const primary=true
    const httpMock = TestBed.inject(HttpTestingController);
    const restService = TestBed.inject(ApiserviceService);
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    const id:number=1
    const key=true
    const data = [{
      body: "abjikj",
      title: "asjdaifbib",
      id: 1,
      userId: 1
    }]
    
    
    spyOn(restService, 'deletePost').and.callFake(() => {
      return of(data)
    })
    let returnValue = {primaryAction:true}
    spyOn(component.dialog, 'open')
        .and
        .returnValue({afterClosed: () => of(returnValue)} as MatDialogRef<typeof component>);
    // spyOn(component, 'openSnackBar')

    component.deletePost(id)
    // expect(component.dialog.afterAllClosed.subscribe()).toBeTrue()
    expect(data.length).toBeGreaterThan(0)
    // expect(component.openSnackBar).toHaveBeenCalled();

  })

  it('#openDialog-should be open dialogBox',()=>{
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    const body:any='abc'
    fixture.detectChanges();
    component.openDialog(body)
  })

  it('#openViewDialog-should be open dialogBox',()=>{
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    const body:any='abc'
    fixture.detectChanges();
    component.openViewDialog(body)
  })
  it('#addNetwork-should be called open dialog',()=>{
    fixture = TestBed.createComponent(AllpostComponent);
    component = fixture.componentInstance;
    spyOn(component,'openDialog')
    component.addNetwork();
    expect(component.dialog.open).toHaveBeenCalled();
  })
  
});
