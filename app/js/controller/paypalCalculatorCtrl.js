(function () {
    var app = angular.module('paypalCalculatorApp');

    app.controller('paypalCalculatorCtrl', [PaypalCalculatorCtrl]);

    function PaypalCalculatorCtrl() {
        var vm = this;

        vm.gainedValue = 0;
        vm.paypalFee = 0;
        vm.youGetValue = 0;

        vm.paypalFeeString = 0;
        vm.youGetValueString = 0;

        vm.fixedFeeValue = 0.35;
        vm.fixedFeePercentValue = 0.019;

        vm.restValue = 0;
        vm.buyerHasToPayValue = 0;
        vm.buyerPaypalFee = 0;

        vm.buyerHasToPayValueString = 0;

        vm.calculatePaypalFee = function () {
            if (!vm.gainedValue || vm.gainedValue <= 0) {
                vm.paypalFeeString = 0;
                vm.youGetValueString = 0;

            } else {
                vm.gainedValuetmp = (vm.gainedValue.replace(',', '.'));

                vm.paypalFee = (vm.gainedValuetmp * vm.fixedFeePercentValue) + vm.fixedFeeValue;
                vm.paypalFee = round(vm.paypalFee, 2);
                vm.paypalFee = vm.paypalFee.toFixed(2);

                vm.youGetValue = vm.gainedValuetmp - vm.paypalFee;
                vm.youGetValue = round(vm.youGetValue, 2);
                vm.youGetValue = vm.youGetValue.toFixed(2);

                vm.buyerHasToPayValue = vm.gainedValuetmp;
                vm.buyerHasToPayValue = round(vm.buyerHasToPayValue, 2);
                vm.buyerHasToPayValue = vm.buyerHasToPayValue.toFixed(2);

                vm.restValue = vm.youGetValue;

                vm.paypalFeeString = ('' + vm.paypalFee).replace('.', ',');
                vm.youGetValueString = ('' + vm.youGetValue).replace('.', ',');
                vm.buyerHasToPayValueString = ('' + vm.buyerHasToPayValue).replace('.', ',');
            }
        };

        vm.calculateRestValue = function () {
            if (!vm.restValue || vm.restValue <= 0) {
                vm.buyerHasToPayValueString = 0;
            } else {
                vm.restValuetmp = Number(vm.restValue.replace(',', '.'));

                vm.paypalFee = (vm.restValuetmp * vm.fixedFeePercentValue) + vm.fixedFeeValue;
                vm.paypalFee = round(vm.paypalFee, 2);
                vm.paypalFee = vm.paypalFee.toFixed(2);

                vm.buyerHasToPayValue = vm.restValuetmp + Number(vm.paypalFee);
                vm.buyerHasToPayValue = round(vm.buyerHasToPayValue, 2);
                vm.buyerHasToPayValue = vm.buyerHasToPayValue.toFixed(2);

                vm.youGetValue = vm.restValuetmp;
                vm.youGetValue = round(vm.youGetValue, 2);
                vm.youGetValue = vm.youGetValue.toFixed(2);

                vm.gainedValue = vm.buyerHasToPayValue;

                vm.paypalFeeString = ('' + vm.paypalFee).replace('.', ',');
                vm.buyerHasToPayValueString = ('' + vm.buyerHasToPayValue).replace('.', ',');
                vm.youGetValueString = ('' + vm.youGetValue).replace('.', ',');
            }
        };

        function round(num, places) {
            if(!places){
                return Math.round(num);
            }

            var val = Math.pow(10, places);
            return Math.round(num * val) / val;
        }
    }
})();