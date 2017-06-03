
sample = sample.replace(/&quot;/g,'"');
uniqueSample=JSON.parse(sample);
function callConfirm(id) {
  var r = confirm("Are you sure you want to delete this sample");
  if (r == true) {
    var http = new XMLHttpRequest();
    var url = "deleteSample";
    var params = "id="+id;
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          alert("Sample Deleted");
      }
    }
    http.send(params);
  } else {
  }
}

for(var key in uniqueSample) {
  uniqueSample[key].icon="<a href=\"editSample?id="+uniqueSample[key]._id+"\"><span class=\"glyphicon glyphicon-edit\" width=\"50%\" aria-hidden=\"true\" ,style=\"margin: 0 20px 0 0\"></a>   </span> <span onClick=\"callConfirm(\'"+uniqueSample[key]._id+"\')\" class=\"glyphicon glyphicon-trash\" width=\"50%\" aria-hidden=\"true\" style=\"margin: 0 0 0 20px\" ></span>";
  uniqueSample[key]._idLink="<p><a href=\"sampleDetails?id="+uniqueSample[key]._id+"\">"+uniqueSample[key]._id+"</a></p>";
}


$(function () {
    $('#investigators_table').bootstrapTable({
        data: uniqueSample
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
