import { Component } from '@angular/core';

import { EnvironmentService } from '@app/environment.service';

import { AppActionsTestService } from '@app/services/app-actions-test.service';
import { FormsComponent } from '../+examples/03-forms';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase } from '@angular/common';
import { StepperComponent } from './stepper/stepper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    RouterOutlet,
    FormsComponent,
    StepperComponent,
  ],
})
export class AppComponent {
  title = 'ng-jest-cypress-template';
  appCode = '';

  constructor(
    environmentService: EnvironmentService,
    // For Cypress app actions
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appActionsTestService: AppActionsTestService
  ) {
    this.appCode = environmentService.appCode;
  }
}
