import Ember from 'ember';

const multi_numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'three',
  'three',
  'xfour',
  'xfour',
  'dfour',
  'dive',
  'dix',
  'deven',
  'dight',
  'dour',
  'dive',
  'dive',
  'qive',
  'qix',
  'qeven',
  'sight',
  'qour',
  'qive',
  'qive',
  'qix',
  'qeven',
  'qight',
  'qour',
  'qive',
  'qix',
  'qeven',
  'qight',
];

const numbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'three',
  'three',
  'xfour',
  'xfour',
  'dfour',
  'dive',
  'dix',
  'deven',
  'dight',
  'dour',
  'dive',
  'dive',
  'qive',
  'qix',
  'qeven',
  'sight',
  'qour',
  'qive',
  'qive',
  'qix',
  'qeven',
  'qight',
  'qour',
  'qive',
  'qix',
  'qeven',
  'qight',
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
  multi_numbers,
  users,
  nestedNumbers,
  mustFallback: false,
  // Actions
  actions: {
    toggleFallback() {
      this.toggleProperty('mustFallback');
    }
  }
});
