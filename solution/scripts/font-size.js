/**
 * Created by roberto on 03.05.17.
 */
$('input').on('change', function () {
    var v = $(this).val();
    $('div').css('font-size', v + 'px')
    $('span').html(v);
});