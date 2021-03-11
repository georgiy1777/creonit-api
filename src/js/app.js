import TestAPI from "./api.js";

(function($) {
  
  // Функции для работы с API
  const testApi = new TestAPI();

  $(document).ready(function(){
    getCartData()
  })

  // Создание корзины
  const createCart = ({ price, list }) => {
    $("table tbody").empty()
    list.map((element, idx) => {
      const { product: { id, title }, amount, total } = element
      $("table tbody").append(`
        <tr class="cart-item" data-id="${id}">
          <td>${idx + 1}</td>
          <td class="left">${title}</td>
          <td>
            <span class="count">${amount}</span>
          </td>
          <td class>${total}</td>
        </tr>
      `)
    })
    $(".cart-total span").html(price)
  }

  // Создание уведомлений
  const createNotification = (title) => {
    const item = $(`
      <div class="notification">
        <span class="notification-close">X</span>
        <p>Товар "${title}" добавлен в корзину</p>
      </div>
    `)
    $(".notifications").prepend(item)
    setTimeout(function(){
      item.fadeOut(200, function(){
        $(this).remove()
      })
    }, 1500)
  }

  // Получить данные и создать корзину
  const getCartData = () => testApi.getCartItems().done(data => {
    createCart(data)
  })

  // Создание списка категории
  const createCategoryItems = (items) => {
    $(".items-list").html(null)
    items.map((item) => {
      const { id, image_preview, title, price } = item;
      $(".items-list").append(`
        <div class="item" data-id="${id}">
          <img src="${image_preview}" alt="">
          <div class="item-info">
            <p>Название:<br> <span class="name">${title}</span></p>
            <p>Цена: ${price}</p>
          </div>
          <button class="button button-add">Добавить в корзину</button>
        </div>
      `)
    });
  }

  // --- EventListeners

  // Кнопка показа корзины
  $(".button-cart").on("click", function(){
    const cart = $(".cart");
    $(this).hasClass("expanded") ? cart.slideUp() : cart.slideDown()
    $(this).toggleClass("expanded");
  })

  // Закрыть уведомление 
  $(".notifications").on("click", ".notification-close", function(){
    $(this).closest(".notification").remove()
  })

  // Переключение категорий
  $(".categories-buttons").on("click", ".button-category", function(e) {
    if ($(this).hasClass("active")) {
      return false
    } else {
      $(".button-category.active").removeClass("active")
      $(this).addClass("active")
      testApi.getItems($(this).data("category"))
        .done(({ items }) => createCategoryItems(items))
    }
  })
  
  // События при добавлении товара в корзину
  $(".items-list").on("click", ".button-add", function() {
    const itemId = $(this).closest(".item").data("id");
    const itemTitle = $(this).closest(".item").find(".name").text()
    $(this).prop("disabled", true)
    testApi.addItemToCart(itemId).done(() => {
      $(this).prop("disabled", false)
      createNotification(itemTitle)
      getCartData()
    })
  })

})(jQuery)



