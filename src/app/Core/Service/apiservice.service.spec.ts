import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController,HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiserviceService } from './apiservice.service';

export interface RegisterResponse {
        id:number,
        userId:number,
        body:string,
        title:string
}

describe('ApiserviceService', () => {
  let service: ApiserviceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [ApiserviceService],
    });
    service = TestBed.inject(ApiserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllPost service test', () => {
    it('#getAllPost- Should return getAllPost by making a GET request to the given url', () => {
      const mockResponse: RegisterResponse = {
        id:1,
        userId:1,
        body:'jhhkjnk',
        title:'jhgkuhghj'
      };
      service.getAllPost().subscribe((res)=>{
        expect(res).toBe(mockResponse)
      })
      const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
    
  });


  describe('deletePost service test', () => {
    const delId=1
    it('#deletePost- Should return delete by making a DELETE request to the given url', () => {
      const mockResponse: RegisterResponse = {
        id:1,
        userId:1,
        body:'jhhkjnk',
        title:'jhgkuhghj'
      };
      service.deletePost(delId).subscribe((res)=>{
        expect(res).toBe(mockResponse)
      })
      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${delId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('edit service test', () => {
    const id=1
    it('#editPost- Should return delete by making a get request to the given url', () => {
      const mockResponse: RegisterResponse = {
        id:1,
        userId:1,
        body:'jhhkjnk',
        title:'jhgkuhghj'
      };
      service.editPost(id).subscribe((res)=>{
        expect(res).toBe(mockResponse)
      })
      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  fdescribe('Create service test', () => {
    const id=1
    it('#createPost- Should return delete by making a post request to the given url', () => {
      const mockResponse: RegisterResponse = {
        id:1,
        userId:1,
        body:'jhhkjnk',
        title:'jhgkuhghj'
      };
      service.createPost(id).subscribe((res)=>{
        expect(res).toBe(mockResponse)
      })
      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  fdescribe('update service test', () => {
    const updateId=2
    const data='sunt'
    it('#update- Should return delete by making a post request to the given url', () => {
      const mockResponse: RegisterResponse = {
        id:5,
        userId:7,
        body:'abc',
        title:'xyz'
      };
      service.updatePost(updateId,data).subscribe((res)=>{
        expect(res).toBe(mockResponse)
      })
      const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/posts/${updateId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockResponse);
    });
  });
});
