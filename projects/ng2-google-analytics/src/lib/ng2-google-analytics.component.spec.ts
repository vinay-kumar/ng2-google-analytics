import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2GoogleAnalyticsComponent } from './ng2-google-analytics.component';

describe('Ng2GoogleAnalyticsComponent', () => {
  let component: Ng2GoogleAnalyticsComponent;
  let fixture: ComponentFixture<Ng2GoogleAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2GoogleAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2GoogleAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
