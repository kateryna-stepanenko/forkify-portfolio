import icons from 'url:../../img/icons.svg'; //Parcel 2

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Katja S
   * @todo Finish implememntation
   */
  render(data, render = true) {
    //we schow the Error if results not exist or empty array
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //Updating DOM, where text and attributed actually chang without reloading
  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();

    this._data = data;
    //just string
    const newMarkup = this._generateMarkup();

    //this method convert string into real DOM object
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElements);
    // console.log(newElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //compare oldDOM and newDOM HTML code (cueEl and newEl)
      // console.log(curEl, newEl.isEqualNode(curEl));

      //Updates changed TEXT
      // if newEl different, than we will change the text of the current el to the new content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
        //afte && - el that actually text: new el select first child, which return a node, we need to select the child, that containst the text. and this text schuld be not empty
      ) {
        // console.log('🎉🎉🎉🎉🎉🎉', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      //Updates changed ATTRIBUTES
      //simply replace all the attributes in the current el by the attributes coming from the new element
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  //Spinner loading
  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
          </div> 
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
          `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
