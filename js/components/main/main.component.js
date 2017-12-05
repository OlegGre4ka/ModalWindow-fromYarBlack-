angular.module('app')
    .component('main', {
        templateUrl: 'js/components/main/main.component.html',
        controller: ["listService", "$uibModal", function(listService, $uibModal) {
            var vm = this;

            vm.list = [];
            vm.listLength = 0;
            vm.isModal = false;
            vm.selectedModelItem = {};

            initController();
            function initController() {
                listService.getList()
                    .then((list) => {
                        vm.list = list.data.slice(0, 5);
                        vm.listLength = vm.list.length;
                        console.log('this', vm);
                    }).catch((err) => {
                        console.log('err', err);
                    })
            }

            vm.showModal = function(item) {
                // item це обєкт з масива який я витягнув
                vm.selectedModelItem = item;
                // vm.isModal = true;

                var modalInstance = $uibModal.open({
                    animation: 'true',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'js/components/main/main.modal.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: 'md',
                    controller: function($scope) {
                        $scope.selectedModelItem = angular.copy(vm.selectedModelItem);
                        $scope.cancel = function () {
                            modalInstance.dismiss('cancel');
                        };
                    }
                  });
                modalInstance.result.then(function () {}, function () {});
            }
            vm.closeModal = function() {
                vm.isModal = false;
                vm.selectedModelItem = {};
            }
        }]
    });