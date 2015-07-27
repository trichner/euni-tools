app.controller('AccountDetailsCtrl',[ '$scope','$http','$location','$interval','$window','API','EveIGB','Notification','EveIMG','Linky',function ($scope,$http,$location,$interval,$window,API,EveIGB,Notification,EveIMG,Linky) {

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

    $scope.character = {};
    $scope.employmentHistory = [];
    $scope.characterDetails = {};
    $scope.thirdPartySearches = [];

    API.getCharacter(698922015)
        .then(function (res) {
            $scope.character = res.data;
            $scope.thirdPartySearches = Linky.urlsThirdPartySearch(res.data);
        })

    API.getCharacterEmploymentHistory(698922015)
        .then(function (res) {
            $scope.employmentHistory = res.data;
        })

    API.getCharacterDetails(698922015)
        .then(function (res) {
            $scope.characterDetails = res.data;
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