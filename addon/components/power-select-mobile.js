import Ember from 'ember';
import layout from '../templates/components/power-select-mobile';
// import isIos from '../utils/is-ios';
// import isAndroid from '../utils/is-android';
// import isWindowsPhone from '../utils/is-windows-phone';
// import isMobile from '../utils/is-mobile';

const { computed } = Ember;

export default Ember.Component.extend({
  layout,
  powerSelectComponentName: computed('multiple', function() {
    return this.get('multiple') ? 'power-select-multiple' : 'power-select';
  }),
  mobileFallback: computed('fallback-when', function() {
    //tmp
    return true;
    // let fallbackStrategy = this.get('fallback-when');
    // switch(fallbackStrategy) {
    //   case 'mobile':
    //     return isMobile();
    //   case 'ios':
    //     return isIos();
    //   case 'android':
    //     return isAndroid();
    //   case 'windows-phone':
    //     return isWindowsPhone();
    //   case undefined:
    //     return false;
    //   case null:
    //     return false;
    //   default:
    //     throw new Error(`Unknown fallback strategy ${fallbackStrategy}`);
    // }
  }),

  actions: {
    mobileOpen() {
      // if already open, then dont do below
      if (!this.$('.wrapper').hasClass('power-select-mobile--open')) {
        this.$('.wrapper').addClass('power-select-mobile--open');
        this.toggleProperty('componentOpen');
      }
    },
    done() {
      this.$('.wrapper').removeClass('power-select-mobile--open');
      // remove the nav
      this.set('componentOpen', false);
    },
    cancel() {
      this.$('.wrapper').removeClass('power-select-mobile--open');
      this.set('componentOpen', false);
    }
  }
});

