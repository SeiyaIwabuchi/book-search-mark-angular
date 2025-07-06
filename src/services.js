angular.module('myApp')
    .service('NdlSearchService',['$http', function($http) {
        this.searchBooks = function(title, author, count) {
            let baseUrl = "https://ndlsearch.ndl.go.jp/api/opensearch"
            let params = {
                title: title,
                creator: author,
                cnt: count || 8,
            };
            return $http.get(baseUrl, { params: params });
        }
    }]);