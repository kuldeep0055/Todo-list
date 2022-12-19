import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private http: HttpClient) { }

  getAllPost(): Observable<any> {
    return this.http.get(environment.BASE_URl);
  }

  deletePost(id: any): Observable<any> {
    return this.http.delete(`${environment.BASE_URl}/${id}`);
  }

  editPost(editid: any): Observable<any> {
    return this.http.get(`${environment.BASE_URl}/${editid}`)
  }
  // updatePost(updateId:any):Observable<any>{
  //   return this.http.put(`${environment.BASE_URl}/${updateId}`)
  // }
  createPost(data:any): Observable<any> {
    return this.http.post(environment.BASE_URl,data)
  }
  updatePost(updateId:any,data:any):Observable<any>{
    return this.http.put(`${environment.BASE_URl}/${updateId}`,data)
  }
}
