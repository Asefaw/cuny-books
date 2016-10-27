var hbs = require('handlebars');

module.exports = 
{
	showBooks: function(data) {
		var data = JSON.parse(JSON.stringify(data));
		var str = '<div class="">';
		var imgSrc;
		for(var i = 0; i < data.length; i++) {
			str += '<div class="col-sm-3">';
			imgSrc = ' <img src="http://vignette3.wikia.nocookie.net/galaxylife/images/7/7c/Noimage.png/revision/latest?cb=20120622041841" alt="" />';
			if(data.image) {
				imgSrc = '<img src="' + data.image + '"/>';
			}
			str += '<div class="">' + imgSrc + '</div>';
			str += '<div>Title: ' + data[i].title + ' edition ' + data[i].edition + ' by ' + data[i].author + '</div>';
			str += '<div>Price: ' + data[i].price + '</div>';
			str += '<a class="btn btn-primary" href="/book/'+data[i]._id+'/carts">Buy</a> &nbsp;';
			str += '<div class="btn btn-success offerBtn" data-toggle="modal" data-target="#offerModal">Offer'
			str += '<div style="display:none;">'+ data[i]._id +'</div>'
			str += '</div>'
			str += '</div>';
		}
		str += '</div>';

		return new hbs.SafeString(str);
	},
	showListings: function(data) {
		var data = JSON.parse(JSON.stringify(data));
		              //   <div class='my-listing'>
                //     <div class='col-sm-9 listing-title btn btn-info'>{{this.title}}</div>
                //     <div class='col-sm-3 listing-offer btn btn-primary'><span style='color: lightgreen;'>{{this.offerCount}}</span> Offers</div>
                // </div>
		var str = '<div class="my-listing">';
		var color;
		for(var i = 0; i < data.length; i++) {
			color = 'lightgreen';
			str += '<div class="col-sm-9 listing-title btn btn-info">'+data[i].title+'</div>';
			if(data[i].offerCount > 0) {
				color = 'red';
			}
			str += '<div class="col-sm-3 listing-offer btn btn-primary">';
			str += '<span style="color:' + color + '">' + data[i].offerCount + ' Offers</span>';
			str += '</div>';
		}
		str += '</div>';

		return new hbs.SafeString(str);
	}
};