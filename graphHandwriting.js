queue()
	.defer(d3.json, "/db/handwritingData") //grab the data from this route
	.await(makeGraph); //start building shit. 

var handwritingChart;

function makeGraph(error, handwritingJson)
{
	//handwriting chart
	handwritingChart = dc.pieChart('#handwriting-chart');
	var handwritingData = handwritingJson;
	var handwritingCrossFilter = crossfilter(handwritingData);
	var handwritingDimension = handwritingCrossFilter.dimension(function(data) 
	{
		if(data.handwriting === "")
		{
			return "Handwriting Owner Not Known";
		}
		else
		{
			return data.handwriting;
		}
	});
	var handwritingGroup = handwritingDimension.group().reduceCount();
	handwritingChart
			.width(600)
			.height(350)
			.dimension(handwritingDimension)
			.group(handwritingGroup)	
			.colors(d3.scale.category10())
			.legend(dc.legend());
			
	handwritingChart.render();
}

function changeHandwritingWidth() 
{
	var newWidth = document.getElementById('handwritingResize').offsetWidth;
	handwritingChart.width(newWidth).transitionDuration(0);
	handwritingChart.transitionDuration(750);
	handwritingChart.render();
}