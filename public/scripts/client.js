angular.module('assApp', []);

angular.module('assApp').controller("AssignmentController", function($http){
  var vm = this;

  vm.message = 'Assignments List';

    var sendData = {};

    $http.get('/ass').then(function(response){
      vm.assignments = response.data;
    }, function(response){
      console.log('err', response);
    });

    vm.doAction = function(){

      sendData.assignmentNumber = vm.assignmentNumber;
      sendData.studentName = vm.studentName;
      sendData.score = vm.score;
      sendData.date = vm.date;

      console.log('Clicked');
    $http.post('ass/createdata', sendData)
  }

    vm.findBy = function(){
      //define data to sendData
      sendData.id = vm.id;
      //http get
      $http.get('ass/findwithid/' + vm.id)
        .then(function(response){
        console.log('success', response);
        vm.singleAssignment = response.data;
        }, function(response){
        console.log('err', response);
        });
    };



  });
