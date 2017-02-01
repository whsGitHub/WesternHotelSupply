four51.app.filter('onproperty', ['$451', function($451) {
	var defaults = {
		'OrderStats': 'Type',
		'Message': 'Box'
	};

	return function(input, query) {
		if (!input || input.length === 0) return;
		if (!query) return input;
		query.Property = query.Property || defaults[query.Model];
		return $451.filter(input, query);
	}
}]);

four51.app.filter('kb', function() {
	return function(value) {
		return isNaN(value) ? value : parseFloat(value) / 1024;
	}
});

four51.app.filter('r', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key == value) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rc', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value);
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('rl', ['$sce', 'WhiteLabel', function($sce, WhiteLabel) {
	return function(value) {
		var result = value, found = false;
		angular.forEach(WhiteLabel.replacements, function(c) {
			if (found) return;
			if (c.key.toLowerCase() == value.toLowerCase()) {
				result = $sce.trustAsHtml(c.value.toLowerCase());
				found = true;
			}
		});
		return result;
	}
}]);

four51.app.filter('noliverates', function() {
	return function(value) {
		var output = [];
		angular.forEach(value, function(v) {
			if (v.ShipperRateType != 'ActualRates')
				output.push(v);
		});
		return output;
	}
});

four51.app.filter('paginate', function() {
	return function(input, start) {
		if (typeof input != 'object' || !input) return;
		start = +start; //parse to int
		return input.slice(start);
	}
});

//WHS Filters -------------------
four51.app.filter('wpShippers', function() {
	return function(shippers, country, state) {
		if (shippers && country && state) {
			var results = [];

			if (country == "US") {
				if(state != "AK" && state !="HI") {
					angular.forEach(shippers, function(shipper){
						if (shipper.Name.indexOf('Flat Rate Service - Canada') == -1 && shipper.Name.indexOf('Flat Rate Service - AK & HI') == -1) {
							results.push(shipper);
						}
					});
				}
				else {
					angular.forEach(shippers, function(shipper){
						if (shipper.Name.indexOf('Flat Rate Ground Service') == -1 && shipper.Name.indexOf('Flat Rate Service - Canada') == -1) {
							results.push(shipper);
						}
					});
				}
			}
			if (country == "CA") {
				angular.forEach(shippers, function(shipper){
					if (shipper.Name.indexOf('Flat Rate Service - Canada') > -1) {
						results.push(shipper);
					}
				});
			}
			else {
				angular.forEach(shippers, function(shipper){
					if (shipper.Name.indexOf('International') > -1 || shipper.Name.indexOf('Alternate Shipper') > -1) {
						results.push(shipper);
					}
				});
			}

			return results;
		}
	}
});

four51.app.filter('freeUPS', function() {
	return function(value, order) {
		var output = [];
		angular.forEach(value, function(v) {
			if (order.Subtotal >= 250){
				if(v.Name != 'UPS Ground'){
					output.push(v);
				}
			}
			else {
				output.push(v);
			}
		});
		return output;
	}
});


four51.app.filter('westernNames', function() {
    return function(name) {
        var newname = name.replace('<br />',' ').replace('<br>',' ').replace('<BR>',' ');
        return newname;
    }
});

four51.app.filter('hideSpecs', function() {
	return function(value) {
		var output = [];
		var filtered = [];
		angular.forEach(value, function(v){
			if (v.Name == 'Logo' && value.Color.Value && value.Color.Value.toUpperCase().includes('NO LOGO')){
				filtered.push(v);
			}
			else {
				output.push(v);
			}
		});
		return output;
	}
});