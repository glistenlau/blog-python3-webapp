var app = angular.module('blog', [])

app.controller('paginationController', function ($scope, $log) {

  $scope.currentPage = 4;
    getJSON('/api/blogs', {page: {{ page_index }}}, function (err, results) {
      if (err) {
        return fatal(err);
      }
      $scope.currentPage = results.page.page_index;
    });

  $scope.totalItems = 64;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
});
