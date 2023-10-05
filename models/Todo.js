const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		
	},
	complete: {
		type: Boolean,
		default: false
	},
	pri:{
		type:Number,
	},
	date:{
		type:String,
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;