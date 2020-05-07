# Ng2GoogleAnalytics
## Add Google Analytics to your Angular2+ or Ionic2+ projects

1. Easy installation
2. Angular 2+ and Ionic 2+ compatible
3. Track traditional Ionic 2 Pages with no URL Change (use setPage(pageName) function )
4. Track Custom Events with trackEvent function


## steps to integrate

### Add Ng2GoogleAnalytics in app.module.ts

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

### call setPage(pageName) function to track pages
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

### call trackEvent() function to track events
```javascript

    this.ga.trackEvent('Register', 'Submit', 'Register Button', 1);

```

### to disable GA while development
send second parameter of initialize function to false.
It may be driven from environment.ts file.
See https://angular.io/guide/build#configuring-application-environments
```javascript
    ga.initialize('UA-XXXXXXX-1', environment.production);
```

Tested on Angular 7
