import View from '../view.js';

class ModalView extends View {
  _parentElement = document.querySelector('.modal');
  _errorMessage = ';)';
  _message = '';
  _overlay = document.querySelector('.overlay');
  _btnsOpenModal = document.querySelectorAll('.show-modal');

  openCloseModal() {
    for (let i = 0; i < this._btnsOpenModal.length; i++) {
      this._btnsOpenModal[i].addEventListener('click', () => {
        console.log(`Button clicked`);
        this._parentElement.classList.remove('hidden');
        this._overlay.classList.remove('hidden');
      });
    }
    document.querySelector('.close-modal').addEventListener('click', () => {
      this._parentElement.classList.add('hidden');
      this._overlay.classList.add('hidden');
    });
  }

  _generateMarkup() {
    const { title, profile } = this._data;
    return `
      <h2 class="markup-title">${title}</h2>
      <p class="markup-profile">${profile}</p>
      
    `;
  }
}

export default new ModalView();
