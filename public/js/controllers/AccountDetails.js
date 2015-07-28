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

    $scope.notes = [];
    $scope.logs = [];
    $scope.actions = [];

    $scope.note = "";
    $scope.log = "";

    $scope.logTypes = [
        {name:"Interview"},
        {name:"Titles"},
        {name:"Director"}
    ]

    $scope.noteTypes = [
        {name:"Personnel"},
        {name:"Titles"},
        {name:"Director"}
    ]

    $scope.postLog = function (type) {
        API.postCharacterLog($scope.character.id, type.name, $scope.log);
    }

    $scope.postNote = function (type) {
        API.postCharacterNote($scope.character.id, type.name, $scope.note);
    }

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

    API.getCharacterLogs(698922015)
        .then(function (res) {
            $scope.logs = res.data;
        })

    API.getCharacterNotes(698922015)
        .then(function (res) {
            $scope.notes = res.data;
        })

    API.getCharacterActions(698922015)
        .then(function (res) {
            $scope.actions = res.data;
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