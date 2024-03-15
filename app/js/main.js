$(document).ready(function () {
  $("#btn-open-form").click(function (e) {
    e.preventDefault();
    $(this).hide();
    $("#form").slideDown(1000);
  });

  // Формат записи для телефонного номера
  $("#tel").mask("+7 (999) 999-99-99");
});

Fancybox.bind('[data-fancybox="gallery"]');
