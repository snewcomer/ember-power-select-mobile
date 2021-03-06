import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from '../../helpers/ember-power-select';
import { click, findAll, find } from 'ember-native-dom-helpers';

const singleLabelText = 'Single';
const singleButtonText = 'Done1';

moduleForComponent('power-select-mobile', 'Integration | Component | power select mobile', {
  integration: true
});

// NOTES -- mobileFallback = true is patched to ensure render mobile

// SINGLE NO SEARCH

test('single select power-select component with and can select an option [SINGLE NO SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(find('.t-single .ember-power-select-trigger').textContent.trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(findAll('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(find('[data-test-id=ember-power-select-mobile-nav--done]').textContent, singleButtonText);
  assert.equal(find('[data-test-id=ember-power-select-mobile-nav--title]').textContent, singleLabelText);
  let options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(find('.t-single .ember-power-select-trigger').textContent.trim(), 'two', 'Value has been selected');
  options = findAll('.ember-power-select-option');
  assert.equal(options.length, 0, 'Select closed');
  assert.equal(findAll('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(findAll('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
});

test('can click done to close nav and close power select after selecting a number [SINGLE NO SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  click('.ember-power-select-option');
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
  // click done after selecting a number
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav after select');
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'done closes power select after select');
});

test('can click done to close nav and close power select when not selecting a number [SINGLE NO SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  // click done w/o selecting a number
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav');
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'done closes power select');
});

test('can use custom action [SINGLE NO SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.customAction = function() {
    this.set('number', 'custom');
  };
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      onchange=(action customAction)
      searchEnabled=false
      as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
  let options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.t-single .ember-power-select-trigger').text().trim(), 'custom', 'Value has been selected');
  options = findAll('.ember-power-select-option');
  assert.equal(options.length, 0, 'Select closed');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
});


// SINGLE SEARCH

test('single select power-select component with and can select an option [SINGLE SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), ''); // no title shows up b/c search input takes over
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--search-input]').attr('placeholder'), singleLabelText);
  let options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.t-single .ember-power-select-trigger').text().trim(), 'two', 'Value has been selected');
  options = findAll('.ember-power-select-option');
  assert.equal(options.length, 0, 'Select closed');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
});

test('can click done to close nav and close power select after selecting a number [SINGLE SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  click('.ember-power-select-option');
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
  // click done after selecting a number
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav after select');
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'done closes power select after select');
});

test('can click done to close nav and close power select when not selecting a number [SINGLE SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  // click done w/o selecting a number
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav');
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'done closes power select');
});

test('can use custom action [SINGLE SEARCH]', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.customAction = function() {
    this.set('number', 'custom');
  };
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-single'
      onchange=(action customAction)
      as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), '');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--search-input]').attr('placeholder'), singleLabelText);
  let options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.t-single .ember-power-select-trigger').text().trim(), 'custom', 'Value has been selected');
  options = findAll('.ember-power-select-option');
  assert.equal(options.length, 0, 'Select closed');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
});


// MULTIPLE NO SEARCH

test('it renders the multiple select power-select component with nav and can select an option', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-multiple'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/, ''), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 1, 'Dropdown present on open');
  assert.equal(Ember.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/g, ''), 'one', 'Values has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--count]').text(), '1');
  let options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 1, 'Dropdown still present after selection');
  options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  assert.equal(Ember.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/g, ''), 'onetwo', 'Values has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--count]').text(), '2');
});

test('can click done to close nav and close power select after selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-multiple'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, '').slice(1), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 0, 'done closes power select after select');
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 1, 'done closes power select after select');
  const options = findAll('.ember-power-select-option');
  click(options[1]);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 1, 'done closes power select after select');
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav after select');
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 0, 'done closes power select after select');
});

test('can click done to close nav and close power select when not selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-multiple'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, ''), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav');
});


// MULTIPLE SEARCH 

test('it renders the multiple select power-select component with nav and can select an option', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-multiple'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/, ''), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 1, 'Dropdown present on open');
  assert.equal(Ember.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/g, ''), 'one', 'Values has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), '');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--count]').text(), '1');
  let options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.power-select-mobile__dropdown').length, 1, 'Dropdown still present after selection');
  options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  assert.equal(Ember.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/g, ''), 'onetwo', 'Values has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), '');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav--count]').text(), '2');
});

test('can click done to close nav and close power select after selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-multiple'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, '').slice(1), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 0, 'done closes power select after select');
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 1, 'done closes power select after select');
  const options = findAll('.ember-power-select-option');
  click(options[1]);
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 1, 'done closes power select after select');
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav after select');
  assert.equal(Ember.$('.ember-power-select-dropdown').length, 0, 'done closes power select after select');
});

test('can click done to close nav and close power select when not selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      mobileFallback=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      className='t-multiple'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, ''), 'one', 'Value has been selected');
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  Ember.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(Ember.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav');
});
