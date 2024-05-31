// import React from '../source/react18.2.0.js';
// import ReactDOM from '../source/react-dom18.2.0.js';

const { useState, useEffect, createElement, Fragment, Component, useLayoutEffect, useTransition } = React;
const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById('root'));

// // component World
// const World = (props) => {
//   let [count, setCount] = useState(0);

//   // btn click
//   const handleClick = () => {
//     // setCount(() => 1);
//     // setCount(() => 2);
//     setCount(1);
//     debugger;
//     console.log('count =', count);
//   };

//   console.log('render world');

//   return createElement(
//     'button',
//     {
//       onClick: handleClick,
//     },
//     count
//   );
// };

// class App extends React.Component {
//   render() {
//     return createElement('div', {}, 1212);
//   }
// }

// // component Hello
// const Hello = (props) => {
//   let [value, setValue] = useState('');

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   useEffect(() => {
//     console.log('use effect');
//   });

//   console.log('render hello');

//   let nodes = createElement(Fragment, {}, [
//     createElement('input', {
//       key: 1,
//       placeholder: '请输入',
//       onChange: handleChange,
//     }),
//     createElement('span', { key: 2 }, value),
//     createElement(World, { key: 3 }),
//     createElement(App, { key: 4 }),
//   ]);

//   // let nodes = createElement('input', { key: '1233', onChange: handleChange, value: value });

//   console.log(nodes);

//   return nodes;
// };

function App() {
  const [show, toggle] = useState(false);
  const handleClick = () => {
    console.trace();
    toggle(!show);
  };
  console.log(show);
  return createElement('div', {}, [
    createElement(AButton, { key: 'button', onClick: handleClick }),
    createElement(ToggleSwitch, { key: 'toggle', show }),
  ]);
}

function AButton({ onClick }) {
  return createElement('button', { onClick }, 'click me');
}

function ToggleSwitch({ show }) {
  return show ? createElement('div', {}, 'SHOW') : null;
}

/* --------------------------------------------- */

const App1 = React.memo(() => {
  const [text, setText] = useState('App1');
  console.log('app1 render');

  // useEffect(() => {
  //   setText('App1 Set');
  // });

  return createElement('button', {}, text);
});

function App2() {
  const [text, setText] = useState('App2');
  console.log('app2 render');

  useEffect(() => {
    setText('App2 Set');
  }, []);

  return createElement('button', {}, text);
}

function AppRender() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(1);
  });
  console.log('app render');
  return createElement(Fragment, {}, [createElement(App1, { key: 'app1' }), createElement(App2, { key: 'app2' })]);
}

/* --------------------------------------------- */

function AppInit() {
  const [text, setText] = useState('Hello');

  useEffect(() => {
    console.trace('use effect');
    setText(() => {
      console.trace('set text');
      return 'World';
    });
  }, []);

  console.trace('render');

  return createElement('div', {}, text);
}

function AppEvent() {
  const [count, setCount] = useState(0);
  const handleButton1 = () => {
    console.trace();
    setCount(count + 1);
  };
  const handleButton2 = () => {
    setCount(count + 2);
  };

  useLayoutEffect(() => {
    console.trace('layout effect');
  });

  const elements = createElement(
    'div',
    {
      onClick: handleButton1,
    },
    [
      createElement(
        'button',
        {
          key: 'btn3',
          // onClick: handleButton1,
        },
        count
      ),
      createElement(
        'button',
        {
          key: 'btn2',
          // onClick: handleButton2,
        },
        count
      ),
    ]
  );

  return elements;
}

function TransitionApp() {
  const [count, setCount] = useState(0);
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      console.trace();
      setCount(count + 1);
    });
  };

  return createElement(
    'button',
    {
      onClick: handleClick,
    },
    count + pending
  );
}

function TestApp() {
  const [bool, setBool] = useState(false);
  useEffect(() => {
    setBool(false);
    setBool(false);
    setBool(true);
  })
  return createElement('div', {}, bool ? 'true' : 'false');
}

const rootElement = createElement(TransitionApp);

root.render(rootElement);
