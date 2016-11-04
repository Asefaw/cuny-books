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
			str += '<div class=""><a href="/books/'+data[i]._id+'">' + imgSrc + '</a></div>';
			str += '<div><a href="/books/'+data[i]._id+'">Title</a>: ' + data[i].title + ' edition ' + data[i].edition + ' by ' + data[i].author + '</div>';
			str += '<div>Price: ' + data[i].price + '</div>';
			str += '<a class="btn btn-primary" href="/books/'+data[i]._id+'">View Details</a> &nbsp;';
			str += '<div class="btn btn-success offerBtn" data-toggle="modal" data-target="#offerModal">Offer'
			str += '<div style="display:none;">'+ data[i]._id +'</div>'
			str += '</div>'
			str += '</div>';
		}
		str += '</div>';
		str += '<script src="/javascripts/offers.js"></script>'
		
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
	},
	offerBooks: function(data) {
		var data = JSON.parse(JSON.stringify(data));
		              //   <div class='my-listing'>
                //     <div class='col-sm-9 listing-title btn btn-info'>{{this.title}}</div>
                //     <div class='col-sm-3 listing-offer btn btn-primary'><span style='color: lightgreen;'>{{this.offerCount}}</span> Offers</div>
                // </div>
		var str = '<ul class="list-group">';
		if(data.length == 0) {
			str += "<h4>You currently have no book to offer. You can only offer books that is listed</h4>";
		}
		for(var i = 0; i < data.length; i++) {
			str += '<li class="list-group-item">' + '<p>' + data[i].title + '</p>';
			str += '<div style="display:none;">'+ data[i]._id +'</div>';
			str +='</li>';
		}
		str += '</div>';

		return new hbs.SafeString(str);
	}
};