app.controller('LoginCtrl',[ '$scope','$http','$location','$interval','$window','API','EveIGB','Notification','EveIMG','Linky',function ($scope,$http,$location,$interval,$window,API,EveIGB,Notification,EveIMG,Linky) {

    $scope.me = null;
    $scope.authenticated = false;

    $scope.isIGB = EveIGB.isIGB();
    EveIGB.requestTrust($location.protocol + "//" + $location.host + "/*");
    console.log('You are' + ($scope.isIGB ? '' : ' not') + ' in Eve IGB')

    $scope.window = $window;

    API.login()
        .then(function (res) {
            alert('Logged in!');
        }, function (res) {
            alert('Login failed :(');
        })

    $scope.logout = function () {
        //API.logout()
        //    .then(function () {
        //        Notification.success("Logged out")
        //    })
        //    .then(null,function () {
        //        Notification.error('failed to logout :(');
        //    })
    }

}]);