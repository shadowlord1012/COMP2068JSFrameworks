import { Injectable } from '@angular/core';
//Import the http client module
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  //Use Dependance Inject to get http client 
  //this is what  was decalrds in the imports list
  constructor(private http:HttpClient){}

  //gets all the prokects from the back end
  getProjects(){
    //make a get request to get the backend data
    return this.http.get("http://localhost:3000/api/projects");
  }
}
