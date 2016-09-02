import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { nativeMouseDown } from '../../tests/helpers/ember-power-select';

const singleLabelText = "Single";
const singleButtonText = "Done1";

moduleForAcceptance('Acceptance | index');

test('visiting /index and power-select single with ember-power-select-mobile nav component works as expected', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  });
  andThen(() => {
    nativeMouseDown('.t-single .ember-power-select-trigger');
    andThen(() => {
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 1);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
    });
    selectChoose('.t-single', 'one');
    andThen(function() {
      assert.equal(find('.t-single .ember-power-select-trigger').text().trim(), 'one', 'Value has been selected');
      assert.equal($('.ember-power-select-options').length, 0, 'Select closed');
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 0);
    });
  });
});

test('visiting /index and power-select multiple with ember-power-select-mobile nav component works as expected', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  });
  andThen(() => {
    nativeMouseDown('.t-multi .ember-power-select-trigger');
    andThen(() => {
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 1);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
    });
    selectChoose('.t-multi', 'one');
    andThen(function() {
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 1);
      assert.equal(find('.t-multi .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, '').slice(1), 'one', 'Value has been selected');
      assert.equal($('.ember-power-select-options').length, 1, 'Select still open');
    });
  });
});

// focus out triggers power select to close

test('power-select single closes when hit done', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  });
  andThen(() => {
    nativeMouseDown('.t-single .ember-power-select-trigger');
    andThen(() => {
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 1);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
    });
    click('[data-test-id=ember-power-select-mobile-nav--done]');
    andThen(() => {
      assert.equal(find('.power-select-mobile__dropdown').length, 0, 'done closes power select');
    });
  });
});

test('power-select multi closes when hit done', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 0);
  });
  andThen(() => {
    nativeMouseDown('.t-multi .ember-power-select-trigger');
    andThen(() => {
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 1);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--title]').text(), singleLabelText);
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav--done]').text(), singleButtonText);
    });
    selectChoose('.t-multi', 'one');
    andThen(function() {
      assert.equal(find('.t-multi .ember-power-select-trigger').text().trim().replace(/[\s\n]+/, '').slice(1), 'one', 'Value has been selected');
      assert.equal($('.ember-power-select-options').length, 1, 'Select closed');
      assert.equal(find('[data-test-id=ember-power-select-mobile-nav]').length, 1);
    });
    click('[data-test-id=ember-power-select-mobile-nav--done]');
    andThen(() => {
      assert.equal(find('.power-select-mobile__dropdown').length, 0, 'done closes power select');
    });
  });
});
