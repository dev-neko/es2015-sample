import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import Counter from './scripts/components/counter';

const app = (
  <div>
    <h2> React here!! </h2>
    <Counter />
  </div>
)

jQuery(function() {
  ReactDOM.render(
    app,
    document.getElementById('main'),
    () => console.timeEnd('react-app')
  );
})
