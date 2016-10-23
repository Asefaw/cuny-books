var hbs = require('handlebars');

module.exports = 
{
	showBooks: function(data) {
		var data = JSON.parse(JSON.stringify(data));
		console.log(data);
		var str = '<div class="">';
		var imgSrc;
		for(var i = 0; i < data.length; i++) {
			str += '<div class="col-sm-3">';
			imgSrc = ' <img src="http://vignette3.wikia.nocookie.net/galaxylife/images/7/7c/Noimage.png/revision/latest?cb=20120622041841" alt="" />';
			if(data.image) {
				str += '<img src="' + data.image + '"/>';
			}
			str += '<div class="">' + imgSrc + '</div>';
			str += '<div>Title: ' + data[i].title + ' edition ' + data[i].edition + ' by ' + data[i].author + '</div>';
			str += '<div>Price: ' + data[i].price + '</div>';
			str += '<div class="btn btn-primary">Buy</div>';
			str += '<div class="btn btn-success">Offer</div>'
			str += '</div>';
		}
		str += '</div>';

		return new hbs.SafeString (str);;
	}
};