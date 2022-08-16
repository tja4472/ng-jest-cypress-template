import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormsComponent } from '../+examples/03-forms';

import { EnvironmentService } from '@app/environment.service';
import { Environment } from '../environments/environment-types';

describe('AppComponent', () => {
  const mockEnvironment: Environment = {
    appCode: '--mockEnvironment--',
    production: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [AppComponent, FormsComponent],
      providers: [{ provide: EnvironmentService, useValue: mockEnvironment }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ng-jest-cypress-template'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('ng-jest-cypress-template');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'ng-jest-cypress-template app is running!'
    );
  });

  it('should be using the configured environment settings', () => {
    const fixture = TestBed.createComponent(AppComponent);

    expect(fixture.componentInstance.appCode).toBe(mockEnvironment.appCode);
  });
});
