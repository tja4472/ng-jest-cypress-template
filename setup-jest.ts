import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';

setupZoneTestEnv();

configure({
  defaultImports: [ReactiveFormsModule],
});
