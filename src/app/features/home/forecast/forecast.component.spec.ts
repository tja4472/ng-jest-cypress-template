import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeForecastComponent } from './forecast.component';

describe('HomeForecastComponent', () => {
  let component: HomeForecastComponent;
  let fixture: ComponentFixture<HomeForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeForecastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
