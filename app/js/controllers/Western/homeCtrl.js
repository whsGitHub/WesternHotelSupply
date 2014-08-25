four51.app.controller('HomeCtrl', ['$scope', 'Product', '$routeParams', '$location','Resources',
function($scope, Product, $routeParams, $location, Resources) {

    $scope.siteList = Resources.siteList;

}]);