queue()
	.defer(d3.json, "/db/returnData")
	.await(makeGraph);

var returnChart;

function makeGraph(error, returnJson)
{
	returnChart = dc.pieChart('#return-chart');
	var returnData = returnJson;
	var returnCrossfilter = crossfilter(returnData);
	var returnDimension = returnCrossfilter.dimension(function(data)
	{
		return data.return_status;
	})
	var returnGroup = returnDimension.group().reduceCount();

	returnChart
		.width(600)
		.height(350)
		.dimension(returnDimension)
		.group(returnGroup)
		.legend(dc.legend());
	returnChart.render();
}

function changeReturnWidth() 
{
	var newWidth = document.getElementById('returnResize').offsetWidth;
	returnChart.width(newWidth).transitionDuration(0);
	returnChart.transitionDuration(750);
	returnChart.render();
}