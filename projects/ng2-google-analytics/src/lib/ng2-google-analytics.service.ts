import { Injectable } from '@angular/core';
declare var ga: Function;

@Injectable({
  providedIn: 'root'
})
export class Ng2GoogleAnalyticsService {
  public trackerId: string;
  public isProd: boolean = true;
  constructor() {
  }

  addGaScript() {
    try {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        ga('create', '` + this.trackerId + `', 'auto');
      `;
      document.head.appendChild(script);
      ga('create', this.trackerId);
    } catch (error) {
      console.error('ga script add', error);
    }
  }


  initialize(trackedId: string, isProd: boolean = true) {
    this.trackerId = trackedId;
    if (isProd === false) {
      this.isProd = false;
    } else {
      this.addGaScript();
    }

  }

  setPage(pageName: string) {
    if (!this.isProd) {
      return;
    }
    try {
      ga('set', 'page', '/' + pageName);
      ga('send', 'pageview');
    } catch (error) {
      console.error('Error while setting page');
    }
  }

  trackEvent(eventCategory: string, eventAction: string, eventLabel: string = null, eventValue: number = null) {
    if (!this.isProd) {
      return;
    }
    try {
      ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    } catch (error) {
      console.error('Error while sending event');
    }
  }

}
