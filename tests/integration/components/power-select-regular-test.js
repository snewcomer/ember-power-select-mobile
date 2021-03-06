import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { clickTrigger } from '../../helpers/ember-power-select';
import { click, findAll } from 'ember-native-dom-helpers';

const singleLabelText = 'Single';
const singleButtonText = 'Done1';

moduleForComponent('power-select', 'Integration | Component | power select', {
  integration: true
});

// NOTES -- to ensure compatibility with normal ember-power-select, I do not force it to be mobile

// SINGLE NO SEARCH

test('single select power-select component works w/o mobile', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      class='t-single'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.ember-power-select-trigger .ember-power-select-selected-item').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.throws(Ember.$('.ember-power-select-search-input'));
  const options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.ember-power-select-trigger .ember-power-select-selected-item').text().trim(), 'two', 'Value has been selected');
});

// SINGLE SEARCH

test('single select power-select w/ search works w/o mobile', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = 'one';
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      labelText=singleLabelText
      buttonText=singleButtonText
      options=numbers
      selected=number
      class='t-single'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.ember-power-select-trigger .ember-power-select-selected-item').text().trim(), 'one', 'Value has been selected');
  clickTrigger();
  assert.ok(Ember.$('.ember-power-select-search-input'));
  const options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.ember-power-select-trigger .ember-power-select-selected-item').text().trim(), 'two', 'Value has been selected');
});

// MULTIPLE NO SEARCH

test('it renders the multiple select power-select component with nav and can select an option', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      multiple=true
      options=numbers
      selected=number
      class='t-multiple'
      searchEnabled=false
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-multiple-option').text().trim().replace(/[\s\n\W]+/, ''), 'one', 'Value has been selected');
  clickTrigger();
  const options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.t-multiple .ember-power-select-multiple-option').text().trim().replace(/[\s\n\W]+/g, ''), 'onetwo', 'Values has been selected');
});

// MULTIPLE SEARCH 

test('it renders the multiple select power-select component with nav and can select an option', function(assert) {
  this.numbers = ['one', 'two', 'three'];
  this.number = ['one'];
  this.singleLabelText = singleLabelText;
  this.singleButtonText = singleButtonText;
  this.render(hbs`
    {{#power-select-mobile
      multiple=true
      options=numbers
      selected=number
      class='t-multiple'
      onchange=(action (mut number)) as |num|}}
      {{num}}
    {{/power-select-mobile}}
  `);
  assert.equal(this.$('.t-multiple .ember-power-select-multiple-option').text().trim().replace(/[\s\n\W]+/, ''), 'one', 'Value has been selected');
  clickTrigger();
  const options = findAll('.ember-power-select-option');
  assert.equal(options.length, 3);
  click(options[1]);
  assert.equal(Ember.$('.t-multiple .ember-power-select-multiple-option').text().trim().replace(/[\s\n\W]+/g, ''), 'onetwo', 'Values has been selected');
});
