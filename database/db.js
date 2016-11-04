const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://adminuser:adminuser@ds035766.mlab.com:35766/cunybooks');
