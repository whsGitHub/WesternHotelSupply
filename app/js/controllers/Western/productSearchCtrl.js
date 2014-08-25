four51.app.controller('ProductSearchCtrl', ['$scope', 'Product', '$routeParams', '$location','FilterProducts',
    function($scope, Product, $routeParams, $location, FilterProducts) {
        if($routeParams.searchTerm){
            $scope.searchLoading = true;
            $scope.searchTerm = $routeParams.searchTerm;
            Product.search(null, $scope.searchTerm, null, function(products) {
                $scope.products = products;
                $scope.fullProducts = [];
                for (var p = 0; p < products.length; p++) {
                    Product.get(products[p].InteropID, function(p) {
                        $scope.fullProducts.push(p);
                        if ($scope.fullProducts.length == $scope.products.length) {
                            FilterProducts.filter($scope.fullProducts);
                        }
                    });
                }
                $scope.searchLoading = false;
            }, 1, 100);
        }

        $scope.search = function(){
            $location.path('/search/' + $scope.searchTerm);
        }


    }]);