import Ember from 'ember';
import layout from '../templates/components/mobile-before-options';
import { scheduleOnce } from 'ember-runloop';
import isIos from '../utils/is-ios';

export default Ember.Component.extend({
  layout,
  tagName: '',
  autofocus: true,

  // Lifecycle hooks
  didInsertElement() {
    this._super(...arguments);

    if (this.get('autofocus')){
      this.focusInput();
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('searchEnabled')) {
      scheduleOnce('actions', this, this.get('select').actions.search, '');
    }
  },


  // Actions
  actions: {
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
    mobileOnFocus() {
      this.onFocus();
      if (isIos()) {
        // still need to figure out how to bring up keyboard on select of power-select
        Ember.$('.ember-power-select-options[role="listbox"]').addClass('ember-power-select-options--ios');
      }
    },
    done() {
      // remove styles that style the trigger and dropdown ps components
      Ember.$('.wrapper').removeClass('power-select-mobile--open');
      let select = this.get('select');
      select.actions.close();
      // remove the nav
      //this.set('componentOpen', false);
    },
  },

  // Methods
  focusInput() {
    this.input = Ember.$('.ember-power-select-search-input');
    if (this.input) {
      scheduleOnce('afterRender', this.input, 'focus');
    }
  }
});
