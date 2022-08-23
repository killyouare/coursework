const mongoose = require("mongoose");

class Connector {
	_url;
	_options;

	constructor(url, options) {
		this._url = url;
		this._options = options;
	}

	async connect() {
		await mongoose.connect(this._url, this._options);
	}
}

module.exports = Connector