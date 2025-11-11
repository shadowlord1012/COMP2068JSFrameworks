import { Component } from '@angular/core';

//import dependencies
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  standalone: false,
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  projects: any; //variable to store the projects data for the UI

  // Dependency Injection via constructor method
  // this is the service declared in the provides list
  constructor(private projectService:ProjectService){}

  //lifecycle hook to call the service when the component is initiailized
  ngOnInit(): void {
    this.getProjects();
  }

  //method to call the service
  getProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }


}
