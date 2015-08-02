/**
 * Created by user on 2015/8/2.
 */

var chartApp = angular.module("chartApp",["myChart"]);
myChart.controller("mainCtrl", ["$interval", function($interval){

    var self = this;

    var date = new Date('2014-01-01 00:00:00 +0100');
    function randPoint(){
        var random = Math.random;
        return {
            time:random() * 100,//date,
            visitors: random() * 100
        };
    }

    self.logs = [randPoint()];

    $interval(function(){

        date.setSeconds(date.getSeconds() + 1);

        self.logs.push(randPoint());
    }, 1000);

}]);

