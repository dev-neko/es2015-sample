import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import test from 'ava';
import Counter from '../src/scripts/components/counter.js';

test("Should contain counter classes.", t => {
  const wrapper = shallow(<Counter />);

  t.plan(2);
  t.truthy(wrapper.find('.counter-value').length === 1);
  t.truthy(wrapper.find('.counter-ui').length === 1);
});
