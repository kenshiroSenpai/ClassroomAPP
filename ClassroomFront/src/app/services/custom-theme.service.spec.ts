import { TestBed } from '@angular/core/testing';

import { CustomThemeService } from './custom-theme.service';

describe('CustomThemeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomThemeService = TestBed.get(CustomThemeService);
    expect(service).toBeTruthy();
  });
});
