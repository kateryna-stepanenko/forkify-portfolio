class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    //call method
    const query = this._parentEl.querySelector('.search__field').value;
    //clear input field
    this._clearInput();
    return query;
  }

  //clear Input field after search
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
