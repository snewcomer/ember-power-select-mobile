import Ember from 'ember';

const numbers = [
  'zero',
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
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
  'twenty-one',
  'twenty-two',
  'twenty-three',
  'twenty-four',
  'twenty-five',
  'twenty-six',
  'twenty-seven',
  'twenty-eight',
  'twenty-nine',
  'thirty',
  'thirty-one',
  'thirty-two',
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
});
