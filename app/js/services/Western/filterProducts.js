four51.app.factory('FilterProducts', ['$resource', '$rootScope', '$451', 'Security', 'Error', function($resource, $rootScope, $451, Security, Error) {

    var _filter = function(products) {
        var prices = [];
        var sizes = [];

        angular.forEach(products, function(product) {
            product.Price = product.StandardPriceSchedule.PriceBreaks[0].Price;
            if (prices.indexOf(product.Price) == -1) {
                prices.push(product.Price);
            }
            product.Sizes = [];
            if (product.Specs['Size']) {
                angular.forEach(product.Specs['Size'].Options, function(o){
                    product.Sizes.push(o.Value);
                    if (sizes.indexOf(o.Value) == -1) {
                        sizes.push(o.Value);
                    }
                });
            }
        });

        prices.sort(function(a,b){return a-b});

        products.Prices = prices;
        products.Sizes = sizes;
    };

    return {
        filter: _filter
    }
}]);