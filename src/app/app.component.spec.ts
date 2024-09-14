import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { EnvironmentService } from '@app/environment.service';
import { Environment } from '../environments/environment-types';

const mockEnvironment: Environment = {
  appCode: '--mockEnvironment--',
  production: false,
};

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: EnvironmentService, useValue: mockEnvironment }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ng-jest-cypress-template' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('ng-jest-cypress-template');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome to ng-jest-cypress-template!'
    );
  });

  it('should be using the configured environment settings', () => {
    const fixture = TestBed.createComponent(AppComponent);

    expect(fixture.componentInstance.appCode).toBe(mockEnvironment.appCode);
  });
});
