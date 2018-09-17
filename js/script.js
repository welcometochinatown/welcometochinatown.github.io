var contactsButton = document.querySelector(".contacts-button");
var modalFeedback = document.querySelector(".modal-feedback");
var modalClose = document.querySelector(".modal-close");
var modalOverlay = document.querySelector(".modal-overlay");
var feedbackName = modalFeedback.querySelector("[name=feedback-name]");
var feedbackMail = modalFeedback.querySelector("[name=feedback-mail]");
var feedbackMessage = modalFeedback.querySelector("[name=feedback-message]");
var form = modalFeedback.querySelector("form");
var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("feedbackName");
} catch (err) {
  isStorageSupport = false;
}

contactsButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFeedback.classList.add("modal-show-bounce");
  modalOverlay.classList.add("modal-show");

  if (storage) {
    feedbackName.value = storage;
    feedbackMail.focus();
  }
  else {
    feedbackName.focus();
  }
});

modalClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal-show-bounce");
  modalOverlay.classList.remove("modal-show");
  modalFeedback.classList.remove("modal-error");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains("modal-show-bounce") && modalOverlay.classList.contains("modal-show")) {
      evt.preventDefault();
      modalFeedback.classList.remove("modal-show-bounce");
      modalOverlay.classList.remove("modal-show");
      modalFeedback.classList.remove("modal-error");
    }
  }
});

form.addEventListener("submit", function (evt) {
  if (!feedbackName.value || !feedbackMail.value || !feedbackMessage.value) {
    evt.preventDefault();
    modalFeedback.classList.remove("modal-error");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add("modal-error");
  }
  else {
    if (isStorageSupport) {
      localStorage.setItem("feedbackName", feedbackName.value);
    }
  }

});

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.939411, 30.329513],
            zoom: 15.5
        }, {
            searchControlProvider: 'yandex#search'
        }),

        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {

        }, {
            iconLayout: 'default#image',
            iconImageHref: '',
            iconImageSize: [80, 104],
            iconImageOffset: [-30, -68]
        }),

        myPlacemarkWithContent = new ymaps.Placemark([59.938631, 30.323055], {

        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: 'img/pin.svg',
            iconImageSize: [80, 140],
            iconImageOffset: [-45, -130],
            iconContentOffset: [0, 0],
            iconContentLayout: MyIconContentLayout
        });

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemarkWithContent);
});
