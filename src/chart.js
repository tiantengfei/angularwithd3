/**
 * Created by user on 2015/8/2.
 */

var myChart = angular.module("myChart", []);
myChart.factory("d3", function(){

    /*config information  here*/

    return d3;
}).directive("myScatterChart", ["d3", function(d3){

   var draw = function(svg, width, height, data){

        var margin = 20;
        svg.attr("width", width)
            .attr("height", height);

        var max = d3.max(data, function(d){
            return d.x;

        });

        var min = d3.min(data, function(d ){
            return d.x;
        });


       var xLinear = d3.time.scale()
           .domain([min,max])
           .range([0, width - margin]);

       var XAxes = d3.svg.axis()
           .scale(xLinear)
           .orient("bottom")
           .tickFormat(d3.format("f"));

       svg.select("g.x-axis")
          .attr("transform", function(){
               return "translate(" + margin + "," + (height-margin) + ")";
           })
          .call(XAxes);

        var yMax = d3.max(data, function(d){
            return d.y;
        });

        var yLinear = d3.time.scale()
            .domain([yMax,0])
            .range([-(height - margin * 2), 0]);

        var yAxes = d3.svg.axis()
            .scale(yLinear)
            .orient("left")
            .tickFormat(d3.format("f"));


        svg.select("g.y-axis")
            .attr("transform", function(){
                return "translate(" + margin + "," + (height-margin) + ")";
            }).call(yAxes);


        svg.select(".data")
            .attr("transform", function(){
              return   "translate(" +   margin + ","+(height - margin) + ")";
            })
            .selectAll("circle").data(data).enter()
            .append("circle");

            svg.select(".data").selectAll("circle").data(data)
                .attr("class", "circle").attr("r", function(){
                    return 2.5;
                })
            .attr("cx", function(d){

                return xLinear(d.x);

            }).attr("cy", function(d){

                return  yLinear(d.y);
            });

        svg.selectAll("p").data(data).enter().append("p")
            .text(function(d){
                return min;
            });

 /*      svg
           .attr('width', width)
           .attr('height', height);
// code continues here
// Define a margin
       var margin = 30;
// Define x-scale
       var xScale = d3.time.scale()
           .domain([
               d3.min(data, function(d) { return d.time; }),
               d3.max(data, function(d) { return d.time; })
           ])
           .range([margin, width-margin]);
// Define x-axis
       var xAxis = d3.svg.axis()
           .scale(xScale)
           .orient('top')

           .tickFormat(d3.time.format('%S'));
// Define y-scale
       var yScale = d3.time.scale()
           .domain([0, d3.max(data, function(d) { return d.visitors; })])
           .range([margin, height-margin]);
// Define y-axis
       var yAxis = d3.svg.axis()
           .scale(yScale)
           .orient('left')
           .tickFormat(d3.format('f'));
// Draw x-axis
       svg.select('.x-axis')
           .attr("transform", "translate(0, " + margin + ")")
           .call(xAxis);
// Draw y-axis
       svg.select('.y-axis')
           .attr("transform", "translate(" + margin + ")")
           .call(yAxis);


       svg.select('.data')
           .selectAll('circle').data(data)
           .enter()
           .append('circle');
// Updated all data points
       svg.select('.data')
           .selectAll('circle').data(data)
           .attr('r', 2.5)
           .attr('cx', function(d) { return xScale(d.time); })
           .attr('cy', function(d) { return yScale(d.visitors); });
*/
    };



    return {
      restrict:'E',
        scope:{
            data: '='
        },
        compile: function(element, attrs, transclude){ //compile function

            var svg = d3.select(element[0]).append("svg");

            svg.append("g").attr("class", "data");
            svg.append("g").attr("class", "x-axis axis");
            svg.append("g").attr("class", "y-axis axis");

            var width = 600;
            var height = 400;
            //link function
            return function(scope, element, attrs ){


                scope.$watch('data',function(oldValue, newValue, scope){

                    var data = scope.data.map(
                        function(d){
                            return {
                                x: d.time,
                                y: d.visitors
                            };
                        }
                    );
                    draw(svg, width, height,data);

                }, true);

            };

        }
    };



}]);

