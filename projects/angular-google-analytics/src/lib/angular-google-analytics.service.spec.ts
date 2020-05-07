import { TestBed } from '@angular/core/testing';

import { AngularGoogleAnalyticsService } from './angular-google-analytics.service';

describe('AngularGoogleAnalyticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularGoogleAnalyticsService = TestBed.get(AngularGoogleAnalyticsService);
    expect(service).toBeTruthy();
  });
});
