import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../core/system/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.configurated();
  }

}