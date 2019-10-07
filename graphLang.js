queue()
	.defer(d3.json, "/db/langData")
	.await(makeGraph);

var langChart;
var langGroup;
var langGroupFiltered;

function makeGraph(error, langJson)
{
	//new book date chart

	langChart = dc.barChart("#lang-chart")
	var langData = langJson;
	var langCrossfilter = crossfilter(langJson)
	var langDimension = langCrossfilter.dimension(function(data)
	{
		return data.Language;
	});
	langGroup = langDimension.group().reduceCount();
	langGroupFiltered = groupFilter(langGroup);	

	langChart
		.width(1280) //1280
		.height(350) 
		.margins({top: 10, right: 40, bottom : 30, left : 40})
		.x(d3.scale.ordinal().domain(["English", "Unknown", "French", "Latin", "Scots", "French/Latin", "Hebrew", "Italian", "Latin/Greek", "Greek", "Latin/English", "German/Italian", "Spanish"]))
		.y(d3.scale.linear().domain([0, 7000]))
		.xUnits(dc.units.ordinal)
		.brushOn(false)
		.yAxisLabel("Number of Books Writen in Language")
		.xAxisLabel("Language Books Were Written in")
		.dimension(langDimension)
		.group(langGroup)
		.transitionDuration(1000);

	langChart.render();
}

function changeLangWidth()
{
	var newWidth = document.getElementById('pubResize').offsetWidth;
	langChart.width(newWidth).transitionDuration(0);
	langChart.transitionDuration(750);
	langChart.render();
}

function groupFilter(source_group) 
{
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                if(d.value < 6000)
                {
                	return d.value;
                }
            });
        }
    };
}

function moveRangeLang(buttonSource)
{
	if(buttonSource === 1)
	{
		langChart
			.x(d3.scale.ordinal().domain(["English", "Unknown", "French", "Latin", "Scots", "French/Latin", "Hebrew", "Italian", "Latin/Greek", "Greek", "Latin/English", "German/Italian", "Spanish"]))
			.y(d3.scale.linear().domain([0, 7000]))		
			.group(langGroup)	
			.render();
	}
	else if(buttonSource === 2)
	{
		langChart
			.x(d3.scale.ordinal().domain(["Unknown", "French", "Latin", "Scots", "French/Latin", "Hebrew", "Italian", "Latin/Greek", "Greek", "Latin/English", "German/Italian", "Spanish"]))
			.y(d3.scale.linear().domain([0, 300]))
			.group(langGroupFiltered)
			.render();		
	}
}

