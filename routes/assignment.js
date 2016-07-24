var router = require('express').Router();

var Assignment = require('../models/assignments');


router.get('/', function(request, response){
  Assignment.find({}, function(err, assignments){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      response.send(assignments);
    }
  })
});

router.get('/findwithid/:id', function(request, response){
  console.log(request.params.id);
  // response.sendStatus(200);

  Assignment.findById(request.params.id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      response.send(assignment);
    }
  })

});

router.post('/createdata', function(request, response){
  console.log('Creating data');
  var data = request.body;

  //Part 1
  //assignment_number, student_name, score and date_completed.
  var postedAssignment= new Assignment({
    assignment_number: data.assignmentNumber,
    student_name: data.studentName,
    score: data.score,
    date_completed: new Date
  });

  //Part 2
  postedAssignment.save(function(err){
    if(err) {
      console.log('Save err', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

module.exports = router;
