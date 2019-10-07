queue()
	.defer(d3.json, "/db/bookDateData")
	.await(makeGraph);

var lowerRange = 1500;
var upperRange = 1800;
var bookDateChart;

function makeGraph(error, bookDateJson) 
{
	//new book date chart
	bookDateChart = dc.barChart("#dates-chart");
	var bookDateData = bookDateJson;
	var bookDateCrossfilter = crossfilter(bookDateJson)
	var bookDateDimension = bookDateCrossfilter.dimension(function (data) 
	{
		return data.Date;
	})
	var bookDateGroup = bookDateDimension.group().reduceCount();

	bookDateChart
		.width(1280) //1280
		.height(350)
		.margins({
			top: 10,
			right: 40,
			bottom: 30,
			left: 40
		})
		.x(d3.scale.linear().domain([lowerRange, upperRange]))
		.brushOn(false)
		.yAxisLabel("Number of Books Writen")
		.xAxisLabel("Decade Books Were Written")
		.dimension(bookDateDimension)
		.group(bookDateGroup)
		.transitionDuration(1000);

	bookDateChart.render();
}

function changeDateWidth() {
	var newWidth = document.getElementById('dateResize').offsetWidth;
	bookDateChart.width(newWidth).transitionDuration(0);
	bookDateChart.transitionDuration(750);
	bookDateChart.render();
}

function moveRangeDate(buttonSource) 
{
	if (buttonSource === 1) 
	{
		lowerRange = 1500;
		upperRange = 1600;
		bookDateChart
			.x(d3.scale.linear().domain([lowerRange, upperRange]))
			.y(d3.scale.linear().domain([0, 30]))
			.render();
	} 
	else if (buttonSource === 2) 
	{
		lowerRange = 1600;
		upperRange = 1700;
		bookDateChart
			.x(d3.scale.linear().domain([lowerRange, upperRange]))
			.y(d3.scale.linear().domain([0, 100]))
			.render();
	} 
	else if (buttonSource === 3) 
	{
		lowerRange = 1700;
		upperRange = 1800;
		bookDateChart
			.x(d3.scale.linear().domain([lowerRange, upperRange]))
			.y(d3.scale.linear().domain([0, 300]))
			.render();
	} 
	else if (buttonSource === 4) 
	{
		lowerRange = 1500;
		upperRange = 1800;
		bookDateChart
			.x(d3.scale.linear().domain([lowerRange, upperRange]))
			.y(d3.scale.linear().domain([0, 300]))
			.render();
	}
}