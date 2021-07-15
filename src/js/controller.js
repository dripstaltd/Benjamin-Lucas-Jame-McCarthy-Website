'use strict';
import * as model from './model.js';
import modalView from './views/modalView.js';
import canvasView from './views/canvasView.js';
/*
const data = model.data1;
const newData = data.map(item => item * 7);
const app = document.getElementById('app');
newData.forEach(item => {
  let li = document.createElement('li');
  li.textContent = item;
  app.appendChild(li);
});
*/
// console.log(model.person);
// console.log(model.profile);
// console.log(model.expertise);

modalView.render(model.profile);
modalView.openCloseModal();

// Creating a new player

const init = () => {
  canvasView.init();
};

init();
