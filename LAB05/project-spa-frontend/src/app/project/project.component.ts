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

  //Properites to store the object
  name!:any;
  dueDate!:any;
  course!:any;

  //Property to store id when editing
  _id!: any;

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

  //create new project
  addProject() : void {
    //create a project using the information in the forms 

    let newProject = {
      name: this.name,
      dueDate: this.dueDate,
      course: this.course,
    }
    //call the service and pass the new project

    this.projectService.addProject(newProject).subscribe(responce => {
      this.getProjects();
    });

    //clear the form
    this.clearForm();
  }

  deleteProject(_id: any) :void {
    if(confirm("Are you sure you want to delete?")) {
      this.projectService.deleteProject(_id).subscribe(responce => {
        this.getProjects();
      })
    }
  }

  //select a project
  selectProject(project: any) :void {
    this._id = project._id;
    this.name = project.name;
    this.dueDate = project.dueDate;
    this.course = project.course;
  }

  updateProject(){
    let selectProject = {
     _id: this._id,
     name: this.name,
     dueDate: this.dueDate,
     course: this.course,
    }

    this.projectService.updateProject(selectProject).subscribe(responce => {
      this.getProjects();
    });

    this.clearForm();
  }

  clearForm() :void {
    this._id="";
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }
}
