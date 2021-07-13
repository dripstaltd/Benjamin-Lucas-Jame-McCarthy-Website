export class View {
  constructor(data) {
    this.data = data;
  }

  renderList = listData => {
    listData.forEach(item => {
      let li = document.createElement('li');
      li.textContent = item;
      app.appendChild(li);
    });
  };
}
