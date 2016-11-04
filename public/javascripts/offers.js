/**Error in including this javascript file **/
/* Each function declare in this file will trigger twice upon action */

$(document).ready(function() {

	$(".offerBtn").on('click', function() {
		//Clear previous book_id
		$("input").remove("#hide_book_id");

		$('#offerForm').val("");
		var book_id = $(this).children('div').html();
		$("#offerForm").append('<input type="hidden" id="hide_book_id" name="book_id" value="'+ book_id +'">');
		console.log($("#offerForm").html());
	});

	$("#offer").keyup(function(event) {
		code = $("#offer").val();
		if(code.length > 5) {
			code = code.slice(code.length-5);
		}
		if(code == "book:") {
			console.log(" Event trigger");
			$("#bookModal").modal('show');
		}
		console.log($("#offer").prop("selectionStart"));
	});

  $('.list-group li').click(function(e) {
    e.preventDefault()
    
    $(this).parent().find('li').removeClass('active');
    $(this).addClass('active');
  });

  $('#offerBook-btn').unbind('click').click(function(e) {				//Unbind the prev assign click event since it will get call twice.
  	console.log($('.modal-body .list-group .active p').text());

  	var replaceBook = '[' + $('.modal-body .list-group .active p').text() + ']';
  	var code = $("#offer").val();
  	var caretPos = $("#offer").prop("selectionStart");

  	var replaceVal = code.slice(0, caretPos-5) + replaceBook + code.slice(caretPos);

  	$("#offer").val(replaceVal);
  });

  $('.listing-offer').click(function() {
  	
  });
});