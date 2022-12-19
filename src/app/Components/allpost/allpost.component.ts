import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../../Core/Service/apiservice.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogboxComponent } from '../../dialog/dailogbox/dailogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';
import { ViewDialogboxComponent } from '../../dialog/view-dialogbox/view-dialogbox.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';


@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.css']
})
export class AllpostComponent implements OnInit {
  durationInSeconds = 3;
  title: string = 'rxjs'
  showFiller: boolean = false
  filterData: any = ''
  date: any = new Date()
  displayedColumns: string[] = ['id', 'userId', 'title', 'body', 'status', 'action'];
  dataSource: any = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: ApiserviceService,
    public dialog: MatDialog, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.fetchPosts();
    this.dataSource.sort = this.sort;
  }

  fetchPosts() {
    this.api.getAllPost().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: any) {
    const filterValue = event
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePost(id: any) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      width: '40%',
      data: {
        title: 'Deactivate Network',
        message: 'Are you sure you want to deactivate this post?',
        primaryButton: 'Yes',
        secondaryButton: 'No'
      }
    })
    dialog.afterClosed().subscribe(result => {
      if (result && result.primaryAction) {
        this.api.deletePost(id).subscribe(res => { console.log('res',res) });
        this._snackBar.open('Delete post successfully', 'ok', { duration: 5000 })
      }
    })

  }

  addNetwork() {
    this.dialog.open(DailogboxComponent, {
      width: '45%',
    })
  }


  // avtivateDeactivate(id: any) {

  //   const dialog = this.dialog.open(ConfirmationDialogComponent, {
  //     data: {
  //       title: id.status == 1 ? 'Deactivate Post' : 'Activate Post',
  //       message: 'Are you sure you want to delete this post?',
  //       primaryButton: id.status == 1 ? 'Deactivate' : 'Activate',
  //       secondaryButton: 'Cancel'
  //     }
  //   })
  //   dialog.afterClosed().subscribe(result=>{
  //     console.log(result)
  //   })
  // }
  // this.api.deletePost(id).subscribe(res => { });

  openDialog(editid: any) {
    const dialogRef = this.dialog.open(DailogboxComponent, {
      width: '40%',
      data: editid,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openViewDialog(row: any) {
    const viewDialog = this.dialog.open(ViewDialogboxComponent, {
      width: '40%',
      data: row
    })
  }
}
