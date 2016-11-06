
module.exports =  {
	index(req, res){
		if(req.user){
			res.render('checkout');
		}else{
			res.render('login');
		}
		 
	}
}