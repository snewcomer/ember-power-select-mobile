# ember-power-select-mobile - WIP

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

* `labelText` - renders in middle of provided nav component
* `buttonText` - renders in the header to close out ember-power-select-mobile
* `className` - useful for targeting in tests
* `options` - array of JS primitives or array of objects
* `selected` - JS primitive or object that is selected.  May delegate to action if needed.
* `searchEnabled` - shows search box in header
* `onchange` - action to handle selection of option


## Notes
* For examples, see `tests/` folder for dummy app or applicable tests or styling options
* renderInPlace default is set to true so options are not attached to the root of the body

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
