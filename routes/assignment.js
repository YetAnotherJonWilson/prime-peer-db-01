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

router.post('/createData', function(request, response){
  console.log('Creating data');
  var data = request.body;

  //Part 1
  //assignment_number, student_name, score and date_completed.
  var postedAssignment= new Assignment({
    assignment_number: data.assignment_number,
    student_name: data.student_name,
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

router.get('/findWithId/:id', function(request, response){
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

router.put('/editWithId/:id/:assignment_number?', function(request, response){

  var id = request.params.id;
  var assignment_number = request.params.assignment_number;

  if(!assignment_number){
    assignment_number = 0;
  }

  Assignment.findById(request.params.id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {

      assignment.assignment_number = assignment_number;

      assignment.save(function(err){
        if(err){
          console.log('There was an issue saving', err);
          response.sendStatus(500);
        } else {
          console.log('Saved with no problems!');
          response.sendStatus(200);
        }
      });

    }
  })

});

router.delete('/removeWithId/:id', function(request, response){
  var id = request.params.id;

  Assignment.findById(id, function(err, assignment){
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {

      assignment.remove(function(err){
        if(err){
          console.log(err);
        }
      })

      console.log('Assignment deleted');
      response.sendStatus(200);
    }
  })
});

module.exports = router;
