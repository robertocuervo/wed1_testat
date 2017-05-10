/**
 * Created by roberto on 03.05.17.
 */
$("input").on('change', function () {
    var v = $(this).val();
    $('html').css('font-size', v + 'px')
    $('#font-size').html(v);
});