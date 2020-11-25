import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { click } from '../common/test-utils';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    (course) => course.category === 'BEGINNER',
  );

  const advancedCourses = setupCourses().filter(
    (course) => course.category === 'ADVANCED',
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

  it('should display only advanced courses', () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
  });

  it('should display both tabs', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).toBe(2, 'Expected to find 2 tabs');
  });

  it('should display advanced courses when tab clicked', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    const cardTitle = el.queryAll(By.css('.mat-card-title'));

    expect(cardTitle.length).toBeGreaterThan(0, 'Could not find card titles');
    expect(cardTitle[0].nativeElement.textContent).toContain(
      'Angular Security Course',
    );
  });
});
