queue()
	.defer(d3.json, "/db/occupationData")
	.await(makeGraph);

var occupationChart;
var occupationGroupFiltered;
var occupationDateGroup;

function makeGraph(error, occupationJson)
{
	occupationChart = dc.pieChart("#occupation-chart");
	var occupationData = occupationJson;
	var occupationCrossfilter = crossfilter(occupationJson);
	var occupationDimension = occupationCrossfilter.dimension(function(data)
	{
		return data.borrower_occupation;
	});
	var occupationGroup = occupationDimension.group().reduceCount();
	occupationGroupFiltered = groupFilter(occupationGroup); //occupation filter dimension 

	occupationChart
			.width(1280)
			.height(800)
			.dimension(occupationDimension)
			.group(occupationGroupFiltered)
			.legend(dc.legend());

	occupationChart.render();
}

function groupFilter(source_group) 
{
    return {
        all:function () {
            return source_group.all().filter(function(d) {
                if(d.value > 10 && d.value < 6000)
                {
                	return d.value;
                }
            });
        }
    };
}

function changeOccupationWidth()
{
	var newWidth = document.getElementById('occupationResize').offsetWidth;
	occupationChart.width(newWidth).transitionDuration(0);
	occupationChart.transitionDuration(750);
	occupationChart.render();
}



