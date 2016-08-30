import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger, nativeMouseUp } from '../../helpers/ember-power-select';

const singleLabelText = "Single";
const singleButtonText = "Done1";

moduleForComponent('power-select-mobile', 'Integration | Component | power select mobile', {
  integration: true
});

test('it renders the single select power-select component with ember-power-select-mobile nav and can select an option', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-single"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(this.$('.ember-power-select-option').length, 3);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
  nativeMouseUp('.ember-power-select-option:eq(1)');
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'two', 'Value has been selected');
  assert.equal(this.$('.ember-power-select-options').length, 0, 'Select closed');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
});

test('can click done to close nav', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-single"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  this.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
});

test('can click done to close nav and close power select after selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-single"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  nativeMouseUp('.ember-power-select-option:eq(0)');
  assert.equal(this.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
  this.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav after select');
  assert.equal(this.$('.power-select-mobile__dropdown').length, 0, 'done closes power select after select');
});

test('can click done to close nav and close power select when not selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-single"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  // click done w/o selecting a number
  this.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav');
  // need focusout to trigger power select to close
  // assert.equal(this.$('.power-select-mobile__dropdown').length, 0, 'done closes power select');
});

test('can use custom action', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.customAction = function() {
    this.set('number', 'custom');
  };
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-single"
      onchange=(action customAction)
      as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(this.$('.ember-power-select-option').length, 3);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
  nativeMouseUp('.ember-power-select-option:eq(1)');
  assert.equal(this.$('.t-single .ember-power-select-trigger').text().trim(), 'custom', 'Value has been selected');
  assert.equal(this.$('.ember-power-select-options').length, 0, 'Select closed');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('.power-select-mobile__dropdown').length, 0, 'Selection closes power select dropdown');
});

// Multiple

test('it renders the multiple select power-select component with nav and can select an option', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      navMobileComponent="nav-mobile"
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-multiple"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/, ''), 'one', 'Value has been selected');
  clickTrigger();
  assert.equal(this.$('.power-select-mobile__dropdown').length, 1, 'Dropdown present on open');
  assert.equal(this.$('.ember-power-select-option').length, 3);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/g, ''), 'one', 'Values has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
  nativeMouseUp('.ember-power-select-option:eq(1)');
  assert.equal(this.$('.power-select-mobile__dropdown').length, 1, 'Dropdown still present after selection');
  assert.equal(this.$('.ember-power-select-option').length, 3);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n\W]+/g, ''), 'onetwo', 'Values has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
});

test('can click done to close ember-power-select-mobile nav', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-multiple"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, '').slice(1), 'one', 'Value has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('.power-select-mobile__dropdown').length, 1, 'Dropdown present on open');
  this.$('[data-test-id=ember-power-select-mobile-nav--done]').focus().click();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  // need focusout to trigger power select to close
  // assert.equal(this.$('.power-select-mobile__dropdown').length, 0, 'Dropdown should be closed after done');
});

test('can click done to close nav and close power select after selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      multiple=true
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-multiple"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, '').slice(1), 'one', 'Value has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  assert.equal(this.$('.ember-power-select-dropdown').length, 0, 'done closes power select after select');
  clickTrigger();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('.ember-power-select-dropdown').length, 1, 'done closes power select after select');
  nativeMouseUp('.ember-power-select-option:eq(1)');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  assert.equal(this.$('.ember-power-select-dropdown').length, 1, 'done closes power select after select');
  this.$('[data-test-id=ember-power-select-mobile-nav--done]').click().focusout();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav after select');
  // need focusout to trigger power select to close
  // assert.equal(this.$('.ember-power-select-dropdown').length, 0, 'done closes power select after select');
});

test('can click done to close nav and close power select when not selecting a number', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      mustFallback="mobile"
      selected=number
      className="t-multiple"
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, ''), 'one', 'Value has been selected');
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  clickTrigger();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 1);
  this.$('[data-test-id=ember-power-select-mobile-nav--done]').click();
  assert.equal(this.$('[data-test-id=ember-power-select-mobile-nav]').length, 0, 'done closes the nav');
});
