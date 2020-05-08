# Ng2GoogleAnalytics
## Add Google Analytics to your Angular2+ or Ionic2+ projects

Tested on Angular 2 - 5
For Angular 6+ projects use version 1.0.0

1. Easy installation
2. Angular 2+ and Ionic 2+ compatible
3. Track traditional Ionic 2 Pages with no URL Change (use setPage(pageName) function )
4. Track Custom Events with trackEvent function
5. Add multiple tracker IDs

## to build the library
ng build ng2-google-analytics

## steps to integrate

### Add `Ng2GoogleAnalytics` in app.module.ts

```javascript
imports: [
   ...,
   ...,
   Ng2GoogleAnalyticsModule
  ],
```

### initialize Ng2GoogleAnalytics

```javascript
// add Ng2GoogleAnalyticsService in app.component.ts
import {Ng2GoogleAnalyticsService} from 'ng2-google-analytics';

// add in constructor
constructor(
    public ga: Ng2GoogleAnalyticsService
    ...
  ) {
    //initialize service with your GA Token
    ga.initialize('UA-XXXXXXX-1');

  }
```

### call `setPage(pageName)` function to track pages
```javascript
// add in constructor
constructor(
    public ga: Ng2GoogleAnalyticsService
    ...
  ) {
  }

 ngOnInit() {
   this.ga.setPage('register.html');
 }
```

### call `trackEvent()` or `trackEventV2()` function to track events

```javascript
    this.ga.trackEvent('Register', 'Submit');

    // or call trackEvent2 which takes first param as object
    this.ga.trackEventV2({
      eventCategory: 'Register', 
      eventAction: 'Submit', 
    });
    
    // or call like this 
    this.ga.trackEventV2({
      eventCategory: 'Register', 
      eventAction: 'Submit', 
      eventLabel: 'Register Button',
      eventValue: 1
    });

```


## Additional Features
### to disable GA while development
send second parameter of initialize function to false.
It may be driven from environment.ts file.
See https://angular.io/guide/build#configuring-application-environments
```javascript
    ga.initialize('UA-XXXXXXX-1', environment.production);
```

### set additional tracker ID
Sometimes you need to set more than one tracking ID with your project.
This can be done with `setAdditionalTraker` function.
See https://developers.google.com/analytics/devguides/collection/analyticsjs/creating-trackers#working_with_multiple_trackers

```javascript
  //call this function to set additional tracker
  this.ga.setAdditionalTraker('UA-XXXXXX-2', 'myCustomTrackerName')

  // if you want to send page to different tacking id
  this.ga.setPage('register.html', 'myCustomTrackingName');

  //if you want to send event to different tacking id
  this.ga.trackEventV2({
    eventCategory: 'Register', 
    eventAction: 'Submit', 
    eventLabel: 'Register Button',
    eventValue: 1
  }, 'myCustomTrackingName');
```

