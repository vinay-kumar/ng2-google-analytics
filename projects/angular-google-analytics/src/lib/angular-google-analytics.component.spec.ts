import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularGoogleAnalyticsComponent } from './angular-google-analytics.component';

describe('AngularGoogleAnalyticsComponent', () => {
  let component: AngularGoogleAnalyticsComponent;
  let fixture: ComponentFixture<AngularGoogleAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularGoogleAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularGoogleAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
