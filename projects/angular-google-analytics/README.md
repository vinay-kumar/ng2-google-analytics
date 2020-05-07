# AngularGoogleAnalytics
## Add Google Analytics to your Angular or Ionic App

1. Easy installation
2. Angular 2+ and Ionic 2+ compatible
3. Track traditional Ionic 2 Pages with no URL Change (use setPage(pageName) function )
4. Track Custom Events with trackEvent function


## steps to integrate

### Add AngularGoogleAnalytics in app.module.ts

```javascript
imports: [
   ...,
   ...,
   AngularGoogleAnalyticsModule
  ],
```

### initialize AngularGoogleAnalytics

```javascript
// add AngularGoogleAnalyticsService in app.component.ts
import {AngularGoogleAnalyticsService} from 'angular-google-analytics';

// add in constructor
constructor(
    public ga: AngularGoogleAnalyticsService
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
    public ga: AngularGoogleAnalyticsService
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
