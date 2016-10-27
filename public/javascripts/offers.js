$(".offerBtn").on('click', function() {
	$("input").remove("#hide_book_id");
	var book_id = $(this).children('div').html();
	$("#offerForm").append('<input type="hidden" id="hide_book_id" name="book_id" value="'+ book_id +'">');
	console.log($("#offerForm").html());
});