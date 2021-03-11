export default class TestAPI {

  _apiBase = "http://vue-tests.dev.creonit.ru/api"

  // Получить содержимое категории
  getItems = (category) => {
    return $.ajax({
      type: "GET",
      dataType: "json",
      url: `${this._apiBase}/catalog/${category}`
    })
  }

  // Получить содержимое корзины
  getCartItems = () => {
    return $.ajax({
      type: "GET",
      dataType: "json",
      url: `${this._apiBase}/cart/list`
    })
  }

  // Добавить элемент в корзину
  addItemToCart = (id) => {
    return $.ajax({
      type: "POST",
      url: `${this._apiBase}/cart/product/${id}`
    })
  }

  // Обновить количество элемента
  updateAmountItem = (id, amount) => {
    return $.ajax({
      type: "PUT",
      url: `${this._apiBase}/cart/product/${id}amount=${amount}`
    })
  }

  // Удалить элемент из корзины
  removeItemFromCart = (id) => {
    return $.ajax({
      type: "DELETE",
      url: `${this._apiBase}/cart/product/${id}`
    })
  }
}
