four51.app.controller('UserEditCtrl', ['$scope', '$location', '$sce', 'User',
    function ($scope, $location, $sce, User) {
        $scope.loginasuser = {};
        $scope.actionMessage = null;

        var codes = ['PasswordSecurityException'];

        $scope.loginMessage = null;
        $scope.buttonText = "Logon";
        $scope.$on('event:auth-loginFailed', function(event, message) {
            $scope.loginMessage = message;
        });

        if($scope.user.Type != 'TempCustomer')
            $scope.user.TempUsername = $scope.user.Username

        $scope.save = function() {
            $scope.actionMessage = null;
            $scope.securityWarning = false;
            $scope.user.Username = $scope.user.TempUsername;
            $scope.displayLoadingIndicator = true;
            if($scope.user.Type == 'TempCustomer')
                $scope.user.ConvertFromTempUser = true;

            User.save($scope.user,
                function(u) {
                    $scope.securityWarning = false;
                    $scope.displayLoadingIndicator = false;
                    $scope.actionMessage = 'Your changes have been saved';
                    $scope.user.TempUsername = u.Username;
                },
                function(ex) {
                    $scope.displayLoadingIndicator = false;
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.securityWarning = true;
                    else
                        $scope.actionMessage = $sce.trustAsHtml(ex.Message);
                }
            );
        };
        $scope.loginExisting = function(){
            User.login({Username: $scope.loginasuser.Username, Password:  $scope.loginasuser.Password, ID: $scope.user.ID, Type: $scope.user.Type},function(u){
                $location.path("/catalog");

            }, function(err){
                $scope.loginAsExistingError = err.Message;
            });
        };

        $scope.login = function() {
            $scope.loginMessage = null;
            // need to reset any error codes that might be set so we can handle new one's
            angular.forEach(codes, function(c) {
                $scope[c] = null;
            });
            User.login($scope.credentials,
                function(data) {
                    if ($scope.credentials.Email) {
                        $scope.loginMessage = data.LogonInfoSent;
                        $scope.EmailNotFoundException = false;
                        $scope.showEmailHelp = false;
                        $scope.credentials.Email = null;
                        $scope.credentials.Username = null;
                        $scope.credentials.Password = null;
                    }
                },
                function(ex) {
                    $scope.credentials = {};
                    $scope[ex.Code.text] = true;
                    $scope.loginMessage = "User name and password not found.";
                    if (ex.Code.is('PasswordSecurity'))
                        $scope.loginMessage = $sce.trustAsHtml(ex.Message);
                    if (ex.Code.is('EmailNotFoundException') && $scope.credentials.Email)
                        $scope.loginMessage = $sce.trustAsHtml(ex.Detail);
                    $scope.credentials.Username = null;
                    $scope.credentials.Password = null;
                    $scope.credentials.CurrentPassword = null;
                    $scope.credentials.NewPassword = null;
                    $scope.credentials.ConfirmPassword = null;
                }
            );
        };
    }]);