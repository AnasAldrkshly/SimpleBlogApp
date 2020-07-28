import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  postImage(fd : FormData): Observable<string>{
    return this.httpClient.post<string>('http://localhost:8000/files/postImage.php', fd );
  }

  getImage(): Observable<Blob> {
    return this.httpClient.get( 'http://localhost:8000/files/getImage.php', 
    { responseType: 'blob' })      
 }
}