import test from 'ava';
import {getUser} from '../src/scripts/sample.js';


test('getUsers', t => {
  const first = 'Hanamichi';
  const last  = 'Sakuragi';
  const fullName = `${first} ${last}`;
  const age   = 16;
  const user1 = getUser(first, last, age);

  t.deepEqual(user1, {first, last, fullName, age});
});

test('getOdds', t => {
  const evens = [0, 2, 4, 6, 8];
  const odds  = [1, 3, 5, 7, 9];

  t.deepEqual(evens.map(v => v + 1), odds);
});
