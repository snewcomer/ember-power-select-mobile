# Ember-power-select-mobile

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

## API

* nav title - renders in middle of provided nav component
* nav button text - can be a string or i18n translation string 
* className - useful for targeting in tests
* options - array of JS primitives or array of objects
* selected - JS primitive or object that is selected.  May delegate to action if needed.
* mobileTagName - "div" or whatever wrapper element you want around the power select component.  This is needed for className to work properly
* searchEnabled - ...
* done action title, e.g. "Done" or "done.button" for i18n strings
* navMobileComponent - replace default component with a dark blue background. 


## Notes
* For examples, see `tests/` folder for dummy app or applicable tests
* renderInPlace default is set to true so options are not attached to the root of the body

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
