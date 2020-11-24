import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    (course) => course.category === 'BEGINNER',
  );

  beforeEach(
    waitForAsync(() => {
      const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
        'findAllCourses',
      ]);

      TestBed.configureTestingModule({
        imports: [CoursesModule, BrowserAnimationsModule],
        providers: [{ provide: CoursesService, useValue: coursesServiceSpy }],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          coursesService = TestBed.inject(CoursesService);
        });
    }),
  );

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display only beginner courses', () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });
});
