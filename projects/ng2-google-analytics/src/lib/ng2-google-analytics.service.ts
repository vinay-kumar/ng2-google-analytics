import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var ga: Function;

export class GAEventOptions {

  /**
   * @required Typically the object that was interacted with (e.g. 'Video')
   */
  eventCategory:string = '';

  /**
   * @required The type of interaction (e.g. 'play')
   */
  eventAction:string = '';

  /**
   * Useful for categorizing events (e.g. 'Fall Campaign')
   */
  eventLabel?:string = null;

  /**
   * A numeric value associated with the event (e.g. 42)
   */
  eventValue?:number = 0;

}


@Injectable({
  providedIn: 'root'
})
export class Ng2GoogleAnalyticsService {
  public trackerId: string;
  public isProd: boolean = true;
  public additionalTrackers = {};
  private router: Router;
  private scriptAdded: boolean = false;

  constructor(router: Router) {
    this.router = router;
  }

  private addGaScript() {
    try {
      if (this.scriptAdded) {
        //script is already added skip adding it again.
        console.error('duplicate call to add google analytics tag')
        return;
      }
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '` + this.trackerId + `', 'auto');
      `;
      document.head.appendChild(script);
      this.scriptAdded = true;
    } catch (error) {
      console.error('ga script add', error);
    }
  }

  /**
   *
   * @param trackerId String 'UA-XXXXX-Y' additional tracker Id to attach
   * @param trackerName String unique name for trackerId (e.g. clientTracker) to identify tracker
   */
  setAdditionalTraker(trackerId: string, trackerName: string) {
    if (this.additionalTrackers[trackerName]) {
      return false;
    }
    this.additionalTrackers[trackerName] = trackerId;
    ga('create', trackerId, 'auto', trackerName);
    return true;
  }

/**
 * Initialize GA. Should be called only once.
 * @param trackedId Google Analytics Tracker ID UA-XXXXXXXXX-1
 * @param isProd link google analytics default true, set false stopping analytics when developing
 */
  initialize(trackedId: string, isProd: boolean = true) {
    this.trackerId = trackedId;
    if (isProd === false) {
      this.isProd = false;
    } else {
      this.addGaScript();
    }
  }

  /**
   * Set Auto Tracking of Pages using Router Navigation End.
   * Only available in version 1.x.x +
   */
  setAutoMode() {
    if (!this.isProd && !this.trackerId) {
      return;
    }
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        ga('set', 'page', ev.url);
        ga('send', 'pageview');
      }
    });
  }

  /**
   * SetPage function
   * useful in applications with no URL change or
   * setting custom name for page
   * @param pageName Name of the page r.g. Register or register.html
   */
  setPage(pageName: string, trackerName: string = null) {
    if (!this.isProd && !this.trackerId) {
      return;
    }
    try {
      if (trackerName && this.additionalTrackers[trackerName]) {
        ga(trackerName + '.set', 'page', '/' + pageName);
        ga(trackerName + '.send', 'pageview');
      } else {
        ga('set', 'page', '/' + pageName);
        ga('send', 'pageview');
      }
    } catch (error) {
      console.error('Error while setting page');
    }
  }

  /**
   * Function to send event to trackerId
   * @param eventParams GAEventOptions
   * @param trackerName optional, to send event to different tracker
   */
  trackEventV2(eventParams: GAEventOptions, trackerName: string = null) {
    if (!this.isProd && !this.trackerId) {
      return;
    }
    try {
      ga((trackerName && this.additionalTrackers[trackerName]) ? trackerName + '.send' : 'send', 'event', eventParams);
    } catch (error) {
      console.error('Error while sending event');
    }
  }

  /**
   * Function to track any event trigger on App (e.g Clicking the Video button)
   * @param eventCategory Typically the object that was interacted with (e.g. 'Video')
   * @param eventAction The type of interaction (e.g. 'play')
   * @param eventLabel Useful for categorizing events (e.g. 'Fall Campaign')
   * @param eventValue 	A numeric value associated with the event (e.g. 42)
   * @deprecated will be removed in next major version
   */
  trackEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = 0) {
    if (!this.isProd && !this.trackerId) {
      return;
    }
    let eventObj = {
      eventCategory: eventCategory,
      eventAction: eventAction
    };

    if (eventLabel) {
      eventObj['eventLabel'] = eventLabel;
    }

    if (eventValue) {
      eventObj['eventValue'] = eventValue;
    }

    try {
      ga('send', 'event', eventObj);
    } catch (error) {
      console.error('Error while sending event');
    }
  }

}
