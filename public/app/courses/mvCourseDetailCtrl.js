angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams, mvCourse) {
    var found = false;
  mvCachedCourses.query().$promise.then(function(collection) {
    collection.forEach(function(course) {
      if(course._id === $routeParams.id) {
          found = true;
        $scope.course = course;
      }
    });
   
   if(!found){
       $scope.course = mvCourse.get({_id:$routeParams.id});
   }    
  })
});