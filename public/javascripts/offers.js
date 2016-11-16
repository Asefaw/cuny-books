/**Error in including this javascript file **/
/* Each function declare in this file will trigger twice upon action */

$(document).ready(function() {


	$(".offerBtn").on('click', function() {
		//Clear previous book_id
		$("input").remove("#hide_book_id");

    linkBooks = [];
		$('#offer').val("");
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

    var curLinkBooks = $('#linkBooks').val();

    $('#linkBooks').val( curLinkBooks + ',' + replaceBook );

  	$("#offer").val(replaceVal);
  });

  $('.listing-offer').click(function() {
  	
  });

  $('.showOfferBtn').click(function() {
  	var book_id = $(this).find('span').html();
  	console.log(book_id);
  	$.ajax({
  		url: "/api/offers?book_id=" + book_id,
  	}).done(function(result) {
  		console.log(result);
      var display = '';

      for(var i=0; i < result.length; i++) {
        display += '<div>';
        display += '<div>' + result[i].message + '</div>';
        display += '<a href="/books/' + result[i].book_id + '">Link to book</a>';
        display += '<span>' + result[i].user + '</span>';
        display += '</div>';
        console.log(display);
      }

      $('#showOffer-body').html(display);
      
  		// for(var i = 0; i < result.length; i++) {
  		// 	console.log(result[i].message, result[i].message.match(/\[(.*?)\]/g));
  		// }
  	});
  });

});