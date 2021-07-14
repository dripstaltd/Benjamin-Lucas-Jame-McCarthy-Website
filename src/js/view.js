export default class View {
  _data;

  render(data, render = true) {
    if (!data) return console.log('ERROR RENDERING');
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '<button class="close-modal">&times;</button>';
  }

  renderList = listData => {
    listData.forEach(item => {
      let li = document.createElement('li');
      li.textContent = item;
      app.appendChild(li);
    });
  };
}
