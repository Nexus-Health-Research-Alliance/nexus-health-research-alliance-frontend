import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ResearchProjects } from './research-projects'

describe('Projects', () => {
  let component: ResearchProjects
  let fixture: ComponentFixture<ResearchProjects>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchProjects],
    }).compileComponents()

    fixture = TestBed.createComponent(ResearchProjects)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
