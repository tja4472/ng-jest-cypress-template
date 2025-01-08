import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/angular';
import { ReactiveFormsModule } from '@angular/forms';

setupZonelessTestEnv();

configure({
  defaultImports: [ReactiveFormsModule],
});
