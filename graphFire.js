queue()
	.defer(d3.json, "/db/fireData")
	.await(makeGraph);

var lowerRange = 1600;
var upperRange = 1700;
var fireChart;

function makeGraph(error, fireJson)
{
	//new book date chart
	fireChart = dc.barChart("#fire-chart");
	var fireData = fireJson;
	var fireCrossfilter = crossfilter(fireJson);
	var fireDimension = fireCrossfilter.dimension(function(data)
	{
		return data.Date;
	});
	var fireGroup = fireDimension.group().reduceCount();

	fireChart
		.width(1280) //1280
		.height(350) 
		.margins({top: 10, right: 40, bottom : 30, left : 40})
		.x(d3.scale.linear().domain([lowerRange, upperRange]))
		.brushOn(false)
		.yAxisLabel("Number of Books Writen in London")
		.xAxisLabel("Year The Books Were Written")
		.dimension(fireDimension)
		.group(fireGroup)
		.transitionDuration(1000);

	fireChart.render();
}

function changeFireWidth()
{
	var newWidth = document.getElementById('dateResize').offsetWidth;
	fireChart.width(newWidth).transitionDuration(0);
	fireChart.transitionDuration(750);
	fireChart.render();
}
