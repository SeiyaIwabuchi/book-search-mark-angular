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
        function init() {
            const savedBookdJson = localStorage.getItem("bookList");
            $scope.books = JSON.parse(savedBookdJson);
        };
        init();
    })
    .controller('SearchController', ["$scope", "NdlSearchService",
        function ($scope, NdlSearchService) {
            $scope.books = [];
            $scope.searchParam = {};
            $scope.search = function () {
                NdlSearchService.searchBooks($scope.searchParam.title, $scope.searchParam.author, 7)
                    .then(function (response) {
                        // DOMParserでXML文字列をパース
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(response.data, "application/xml");

                        // item要素を取得
                        var items = xmlDoc.getElementsByTagName('item');
                        var result = [];
                        for (var i = 0; i < items.length; i++) {
                            var item = items[i];
                            // NodeListを配列に変換し、findでPIDを抽出
                            let identifiers = Array.from(item.getElementsByTagName('dc:identifier'));
                            let titles = Array.from(item.getElementsByTagName('title'));
                            let authors = Array.from(item.getElementsByTagName('dc:creator'));
                            let id = identifiers.map(elem => elem.textContent).join("-") + titles.map(elem => elem.textContent).join("-") + authors.map(elem => elem.textContent).join("-");
                            result.push({
                                id: id,
                                title: item.getElementsByTagName('title')[0]?.textContent || '',
                                author: item.getElementsByTagName('dc:creator')[0]?.textContent || '',
                                checked: false,
                            });
                        }
                        $scope.books = result;
                    }, function () {
                        alert('取得失敗');
                    });
            };
            $scope.searchBooks = function () {
                $scope.search();
            };
            $scope.addBooks = function () {
                const selectedBooks = $scope.books.filter(book => book.checked);
                const booksJson = localStorage.getItem("bookList");
                let savedBooks = [];
                if (booksJson) {
                    books = JSON.parse(booksJson);
                }
                const newSaveBooks = selectedBooks.concat(savedBooks);
                localStorage.setItem("bookList", JSON.stringify(newSaveBooks));
            };
        }]);