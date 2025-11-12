import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCard } from './project-card';
import { ProjectCardData } from '../../logics/models/interfaces/project-card.interface';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  const mockCardData: ProjectCardData = {
    id: 'test-project-1',
    imageUrl: '/images/test-image.jpg',
    imageAlt: 'Test image description',
    imageWidth: 770,
    imageHeight: 400,
    title: 'Test Project Title',
    buttonText: 'Learn More',
    buttonLink: '/test-project'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('cardData', mockCardData);
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the project title', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h3');
    expect(titleElement.textContent).toContain(mockCardData.title);
  });

  it('should have correct aria-labelledby attribute', () => {
    const compiled = fixture.nativeElement;
    const article = compiled.querySelector('article');
    expect(article.getAttribute('aria-labelledby')).toBe(`project-title-${mockCardData.id}`);
  });

  it('should have correct heading id', () => {
    const compiled = fixture.nativeElement;
    const heading = compiled.querySelector('h3');
    expect(heading.id).toBe(`project-title-${mockCardData.id}`);
  });

  it('should render image with correct alt text', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.alt).toBe(mockCardData.imageAlt);
  });

  it('should handle optional buttonText', () => {
    const dataWithoutButtonText = { ...mockCardData, buttonText: undefined };
    fixture.componentRef.setInput('cardData', dataWithoutButtonText);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});