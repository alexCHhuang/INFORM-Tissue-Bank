$(function () {
    $('#searchResults_table').bootstrapTable({
        data: data
    });

    $(".mybtn-top").click(function () {
        $('#searchResults_table').bootstrapTable('scrollTo', 0);
    });
    
    $(".mybtn-row").click(function () {
        var index = +$('.row-index').val(),
            top = 0;
        $('#searchResults_table').find('tbody tr').each(function (i) {
        	if (i < index) {
            	top += $(this).height();
            }
        });
        $('#searchResults_table').bootstrapTable('scrollTo', top);
    });
    
    $(".mybtn-btm").click(function () {
        $('#searchResults_table').bootstrapTable('scrollTo', 'bottom');
    });
    
});