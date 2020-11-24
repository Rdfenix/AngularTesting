import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesModule } from '../courses.module';
import { CoursesService } from '../services/courses.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
        'findAllCourses',
      ]);

      TestBed.configureTestingModule({
        imports: [CoursesModule, BrowserAnimationsModule],
        providers: [CoursesService],
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    }),
  );
});
