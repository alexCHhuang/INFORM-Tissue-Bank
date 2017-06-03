$(function () {
    $('#investigators_table').bootstrapTable({
        data: data
    });

    $(".mybtn-top").click(function () {
        $('#investigators_table').bootstrapTable('scrollTo', 0);
    });
    
    $(".mybtn-row").click(function () {
        var index = +$('.row-index').val(),
            top = 0;
        $('#investigators_table').find('tbody tr').each(function (i) {
        	if (i < index) {
            	top += $(this).height();
            }
        });
        $('#investigators_table').bootstrapTable('scrollTo', top);
    });
    
    $(".mybtn-btm").click(function () {
        $('#investigators_table').bootstrapTable('scrollTo', 'bottom');
    });
    
});