app.controller('AccountDetailsCtrl',[ '$scope','$http','$location','$interval','$window','API','EveIGB','Notification','EveIMG',function ($scope,$http,$location,$interval,$window,API,EveIGB,Notification,EveIMG) {

    //=== Vars
    $scope.waitlists = {waitlists:[]};

    $scope.me = null;
    $scope.authenticated = false;

    $scope.isIGB = EveIGB.isIGB();
    EveIGB.requestTrust($location.protocol + "//" + $location.host + "/*");
    console.log('You are' + ($scope.isIGB ? '' : ' not') + ' in Eve IGB')

    $scope.window = $window;

    $scope.eveimg = EveIMG;
    $scope.eveigb = EveIGB;



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