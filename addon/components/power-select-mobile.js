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
  // isIos: Ember.computed(function() {
  //   return isIos();
  // }),
  /**
   * API takes keyword multiple as boolean
   * @property powerSelectComponentName
   * @type {String}
   * @default 'power-select'
   */

  powerSelectComponentName: computed(function() {
    return this.get('multiple') ? 'power-select-multiple' : 'power-select';
  }),
  /**
   * Determines if device is mobile
   * @property mobileFallback
   * @type {Boolean}
   */
  mobileFallback: computed('fallback-when', function() {
    return isMobile();
  }),
  /**
   * Mobile component will ignore this.  Used for normal power select
   * @property triggerComponent
   * @type {String}
   * @default 'power-select/trigger'
   */
  triggerComponent: computed(function() {
    return this.get('multiple') ? 'power-select-multiple/trigger' : 'power-select/trigger';
  }),
});
