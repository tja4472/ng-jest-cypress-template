import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feature2Component } from './feature-2.component';

describe('Feature2Component', () => {
  let component: Feature2Component;
  let fixture: ComponentFixture<Feature2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feature2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Feature2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
