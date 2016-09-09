# ember-power-select-mobile - WIP - Version 0.0.1

## Installation

* `ember install ember-power-select-mobile`

## Notes

* Power select will render w/ mobile styles and search box in the header if it detects it is in an IOS/Android/Windows environment.  Support for an API that allows the user to specify what type of phone to render this component in is planned.
* Has the same API as `ember-power-select`: http://www.ember-power-select.com/docs/api-reference.
* Forces `renderInPlace` false in order to put dropdown-content in the `ember-basic-dropdown-wormhole` and leave the trigger in the background.
* Contains default styling for the header component with a title and button.
* clone this repository and run `ember s` to see possible styling options.
* For examples, see `tests/` folder for dummy app or applicable tests

## Definition
  ```
  import Ember from 'ember';
  import EmberPowerSelectMobile from 'ember-power-select-mobile/components/power-select-mobile';
  
  export default EmberPowerSelectMobile.extend({
    i18n: Ember.inject.service(),
    loadingMessage: Ember.computed('i18n.locale', function() {
      return this.get('i18n').t('selects.loading');
    }),
    searchMessage: Ember.computed('i18n.locale', function() {
      return this.get('i18n').t('selects.searchMessage');
    }),
    searchPlaceholder: Ember.computed('i18n.locale', function() {
      return this.get('i18n').t('selects.searchPlaceholder');
    }),
    noMatchesMessage: Ember.computed('i18n.locale', function() {
      return this.get('i18n').t('selects.noMatchesMessage');
    }),
    placeholder: Ember.computed('i18n.locale', function() {
      return this.get('i18n').t('power.select.select');
    }),
  });
  ```

## Usage

* Single without search
  ```
  {{#power-select-mobile
    class="t-role-role-type"
    tagName="div"
    options=role_types
    selected=role.role_type
    onchange=(action "selected")
    searchEnabled=false
    labelText=labelText
    buttonText=buttonText
    as |option|
  }}
    {{t option.name}}
  {{/power-select-mobile}}
  ```

* Multiple with search
  ```
  {{#power-select-mobile
    multiple=true
    class="t-store-locations"
    tagName="div"
    options=options
    selected=store.locations
    onchange=(action "selected")
    labelText=labelText
    buttonText=buttonText
    as |option|
  }}
    {{t option.name}}
  {{/power-select-mobile}}
  ```
  
## API - ember-power-select-mobile

* `labelText` - renders in middle of provided nav component
* `buttonText` - renders in the header to close out ember-power-select-mobile
* `searchEnabled` - shows search box in header
* `multiple` - render `power-select-multiple`
