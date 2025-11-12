import { Component, input } from '@angular/core';
import { Button } from '../button/button';
import { NgOptimizedImage } from '@angular/common';
import { ProjectCardData } from '../../logics/models/interfaces/project-card.interface';

@Component({
  selector: 'lib-project-card',
  imports: [Button, NgOptimizedImage],
  templateUrl: './project-card.html',
})
export class ProjectCard {
 public cardData = input.required<ProjectCardData>()
}
