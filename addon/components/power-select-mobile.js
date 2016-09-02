import Ember from 'ember';
import layout from '../templates/components/power-select-mobile';
import EmberPowerSelect from 'ember-power-select/components/power-select';
// import isIos from '../utils/is-ios';
// import isAndroid from '../utils/is-android';
// import isWindowsPhone from '../utils/is-windows-phone';
import isMobile from '../utils/is-mobile';

const { computed } = Ember;

export default EmberPowerSelect.extend({
  layout,
  powerSelectComponentName: computed('multiple', function() {
    return this.get('multiple') ? 'power-select-multiple' : 'power-select';
  }),
  mobileFallback: computed('fallback-when', function() {
    return isMobile();
  }),
  actions: {
    mobileOnFocus(){
    },
  }
});
