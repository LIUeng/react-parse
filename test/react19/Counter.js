import React, { useState } from 'react';

const { createElement, Fragment } = React;

export default function Counter() {
  const [count, setCount] = useState(0);
  return createElement(Fragment, {}, [
    createElement('h1', { key: 'h1' }, count),
    createElement('button', { key: 'button', onClick: () => setCount(count + 1) }, 'ADD'),
  ]);
}
