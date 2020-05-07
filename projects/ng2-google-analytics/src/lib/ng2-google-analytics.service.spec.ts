import { TestBed } from '@angular/core/testing';

import { Ng2GoogleAnalyticsService } from './ng2-google-analytics.service';

describe('Ng2GoogleAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2GoogleAnalyticsService = TestBed.get(Ng2GoogleAnalyticsService);
    expect(service).toBeTruthy();
  });
});
