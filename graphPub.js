queue()
	.defer(d3.json, "/db/pubData")
	.await(makeGraph);

var pubChart;
var pubGroup;
var pubGroupFiltered;

function makeGraph(error, pubJson)
{
	pubChart = dc.barChart("#publication-chart");
	var pubData = pubJson;
	var pubCrossfilter = crossfilter(pubJson);
	var pubDimension = pubCrossfilter.dimension(function(data)
	{	
		return data.PlaceOfPub; //will read in all occurances of publication. Cannot be acted upon
	});
	pubGroup = pubDimension.group().reduceCount();
	pubGroupFiltered = filterOutLondon(pubGroup);

	pubChart
		.width(1280)
		.height(350)
		.margins({top: 10, right: 40, bottom : 30, left : 40})
		.x(d3.scale.ordinal().domain(["Amsterdam", "Cambridge", "Dublin", "Edinburgh", "Unknown", "Geneva", "Glasgow", "London", "Lugano", "Oxford", "Paris", "The Hague"]))
		.y(d3.scale.linear().domain([10, 5000]))
		.xUnits(dc.units.ordinal)
		.brushOn(false)
		.yAxisLabel("Number of Books Written in Country")	
		.xAxisLabel("Cities")
		.dimension(pubDimension)
		.group(pubGroup)
		.transitionDuration(1000);
		
	pubChart.render();
}

function changePubWidth()
{
	var newWidth = document.getElementById('pubResize').offsetWidth;
	pubChart.width(newWidth).transitionDuration(0);
	bookDateChart.transitionDuration(750);
	pubChart.render();
}

function filterOutLondon(source_group) 
{
	return {
        all:function () {
            return source_group.all().filter(function(d) {
                if(d.value > 10 && d.value < 3000)
                {
					return d.value;
                }
            });
        }
    };
}

function moveRangePub(buttonSource)
{
	if(buttonSource === 1) //London Included
	{
		pubChart
			.x(d3.scale.ordinal().domain(["Amsterdam", "Cambridge", "Dublin", "Edinburgh", "Unknown", "Geneva", "Glasgow", "London", "Lugano", "Oxford", "Paris", "The Hague"]))
			.y(d3.scale.linear().domain([10, 5000]))
			.group(pubGroup)		
			.render();
	}
	else if(buttonSource === 2) //London Not Included
	{
		pubChart
			.x(d3.scale.ordinal().domain(["Amsterdam", "Cambridge", "Dublin", "Edinburgh", "Unknown", "Geneva", "Glasgow", "Lugano", "Oxford", "Paris", "The Hague"])) 
			.y(d3.scale.linear().domain([10, 800]))
			.group(pubGroupFiltered)
			.render();		
	}
}