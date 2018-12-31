queue() //queue j.s library we loaded in our script is to load the contents from the csv file
    .defer(d3.csv, "data/Salaries.csv") //we'll call its defer() method with 2 arguments. 1st one being the format of the data we want to load, 2nd argument is the path csv file
    .await(makeGraphs);//The await method() takes 1 argument, which is the name of a function that we want to call when the data has been downloaded. in this case its makegraphs, but it can be called anything we wanted
    
//The first is error and the second is a variable that the data from the CSV file will be passed into by queue.js.

function makeGraphs(error, salaryData) { 
    
    var ndx = crossfilter(salaryData);
    
    show_gender_balance(ndx);
    
    dc.renderAll();

}

function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck("sex"));
    var group = dim.group();
    
    dc.barChart("#gender-balance")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
        
}

/*

queue()
    .defer(d3.csv, "data/Salaries.csv")
    .await(makeGraphs);
    
function makeGraphs(error, salaryData) {
    var ndx = crossfilter(salaryData);
    
    show_gender_balance(ndx);
    
    dc.renderAll();
}

function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('sex'));
    var group = dim.group();
    
    dc.barChart("#gender-balance")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
}

*/