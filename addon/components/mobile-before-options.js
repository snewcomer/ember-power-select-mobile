import Ember from 'ember';
import layout from '../templates/components/mobile-before-options';
import { scheduleOnce } from 'ember-runloop';
import isIos from '../utils/is-ios';

/**
 * This is created using the beforeOptionsComponent hook from Ember-Power-Select
 * Used for top nav bar above options list in full screen mobile mode
 * Tagless component
 */
export default Ember.Component.extend({
  layout,
  // tagName: '',
  autofocus: true,

  didInsertElement() {
    this._super(...arguments);

    if (this.get('autofocus')){
      this.focusInput();
    }
  },


  /**
   * For search capabilities, we schedule focus on insert of this element
   * This does not work for IOS
   * @method focusInput
   */
  focusInput() {
    this.input = Ember.$('.ember-power-select-search-input');
    if (this.input) {
      scheduleOnce('afterRender', this.input, 'focus');
    }
  },

  /**
   * @method willDestroyElement
   */
  willDestroyElement() {
    this._super(...arguments);
    if (this.get('searchEnabled')) {
      scheduleOnce('actions', this, this.get('select').actions.search, '');
    }
  },

  /**
   * Ember-Power-Select publicAPI
   * Includes relevant behavior and activity (close, search actions)
   * @property select
   * @type object
  */

  actions: {
    /**
     * Redefining onKeydown so we can close onenter keypress (keyCode 13)
     */
    onKeydown(e) {
      let onKeydown = this.get('onKeydown');
      if (onKeydown(e) === false) {
        return false;
      }
      if (e.keyCode === 13) {
        let select = this.get('select');
        select.actions.close(e);
      }
    },
    /**
     * if IOS, apply a class that 
     * onFocus is an Ember-Power-Select action
     * Android brings up keyboard when trigger power-select-mobile component opens
     * @method mobileOnFocus
     */
    mobileOnFocus() {
      this.onFocus();
      if (isIos()) {
        // still need to figure out how to bring up keyboard on select of power-select
        // Requires an actual device (not simulator)
        // Ember.$('.ember-power-select-options[role="listbox"]').addClass('ember-power-select-options--ios');
        Ember.$('ember-power-select-search-input').trigger('touchstart');
      }
    },
    /**
     * Remove classes applied by Ember-Power-Select-Mobile && close option screen
     * @method done
     */
    done() {
      // remove styles that style the trigger and dropdown ps components
      Ember.$('.wrapper').removeClass('power-select-mobile--open');
      let select = this.get('select');
      select.actions.close();
      // remove the nav
      //this.set('componentOpen', false);
    }
  },

});
