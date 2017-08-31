var app = angular.module("contactList", []); 
app.controller("myCtrl", function($scope) {
    $scope.products = ["Kévin Pham", "Adrien Boucaud", "Nina Tubau"];
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.products.indexOf($scope.addMe) == -1) {
            $scope.products.push($scope.addMe);
        } else {
            $scope.errortext = "Name already in the contacts List.";
        }
        addContact($scope.addMe);
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.products.splice(x, 1);
    }
});
