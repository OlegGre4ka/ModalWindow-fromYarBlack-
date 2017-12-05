angular.module('app')
    .service('listService', function($http) {
        this.getList = function( ) {
            return $http.get('https://jsonplaceholder.typicode.com/photos');
        }
    });