import { renderToString } from 'react-dom/server';
import Counter from './Counter.js';
import { createElement } from 'react';

console.log(renderToString(createElement(Counter)));