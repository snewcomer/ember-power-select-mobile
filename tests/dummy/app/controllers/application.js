import Ember from 'ember';

const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'ten',
  'eleven',
  'xone',
  'xtwo',
  'xthree',
  'xfour',
  'dfour',
  'dive',
  'dix',
  'deven',
  'dight',
  'dour',
  'dive',
  'qive',
  'qix',
  'qeven',
  'sight',
  'qour',
  'qive',
  'yight',
  'your',
  'yive',
  'yix',
  'yeven',
  'yight',
];


const nestedNumbers = [
  'zero',
  {
    groupName: 'small',
    options: [
      'one',
      'two',
    ]
  }, {
    groupName: 'medium',
    options: [
      'three',
      'four',
    ]
  },
  'five',
  'six',
  'seven',
  'eight'
];

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mary' },
  { id: 3, name: 'Stuart' },
  { id: 4, name: 'Sarah' },
  { id: 5, name: 'Chris' },
  { id: 6, name: 'Jane' },
  { id: 7, name: 'Mike' },
  { id: 8, name: 'Rose' }
];

export default Ember.Controller.extend({
  numbers,
  users,
  nestedNumbers,
  mustFallback: false,
  // Actions
  actions: {
    toggleFallback() {
      this.toggleProperty('mustFallback');
    },
    selectMe() {
      //
    }
  }
});
