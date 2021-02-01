import { TestBed } from '@angular/core/testing';

import { ConfigOptionService } from './config-option.service';

describe('ConfigOptionService', () => {
  let service: ConfigOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
