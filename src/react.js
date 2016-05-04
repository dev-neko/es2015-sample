import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

const app = (
  <h2> React here!! </h2>
)

jQuery(function() {
  ReactDOM.render(
    app,
    document.getElementById('main'),
    () => console.timeEnd('react-app')
  );
})
