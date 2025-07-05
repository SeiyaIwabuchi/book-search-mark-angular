angular.module('myApp')
    .controller('ListController', function ($scope, $location) {
        $scope.books = [
            { id: 1, author: "作者", title: "タイトル" },
            { id: 2, author: "作者", title: "タイトル" },
            { id: 3, author: "作者", title: "タイトル" },
        ];
        $scope.delete = function (bookId) {
            $scope.books = $scope.books.filter(book => book.id != bookId);
        };
        $scope.showDeleteModal = false;
        $scope.openDeleteModal = function (bookId) {
            $scope.showDeleteModal = true;
            $scope.deleteBookId = bookId;
        };
        $scope.closeDeleteModal = function () {
            $scope.showDeleteModal = false;
        };
        $scope.handleDeleteModalBack = function () {
            $scope.closeDeleteModal();
        }
        $scope.handleDeleteModalDelete = function () {
            $scope.delete($scope.deleteBookId);
            $scope.closeDeleteModal();
        };
        $scope.deleteBookId = -1;
        $scope.goToSearch = function () {
            $location.path("/search");
        };
    })
    .controller('SearchController', function ($scope, $location) {
        $scope.books = [
            { id: 1, author: "作者", title: "タイトル" },
            { id: 2, author: "作者", title: "タイトル" },
            { id: 3, author: "作者", title: "タイトル" },
        ];
    })
    ;