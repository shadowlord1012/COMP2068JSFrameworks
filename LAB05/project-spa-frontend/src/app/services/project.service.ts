import { Injectable } from '@angular/core';
//Import the http client module
import { HttpClient } from '@angular/common/http';

import { environment} from '../environment/environement';

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
    return this.http.get(environment.apiURL+"/projects");
  }

  //create a new project
  addProject(newProject: any){
    return this.http.post(environment.apiURL+"/projects",newProject);
  }

  //delete project by id
  deleteProject(_id:any) {
    return this.http.delete(environment.apiURL+"/projects" + _id);
  }

  updateProject(selectProject: any) {
    return this.http.put(environment.apiURL+"/projects",selectProject);
  }
}
