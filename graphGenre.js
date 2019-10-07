queue()
	.defer(d3.json, "/db/genreData")
	.await(makeGraph);

var greyScale = false;
var genreChart;
var generatedColours = [];

function makeGraph(error, genreJson)
{
	//new genre chart
	genreChart = dc.pieChart('#genre-chart');
	var genreData = genreJson;
	var genreCrossfilter = crossfilter(genreData);
	var genreDimension = genreCrossfilter.dimension(function(data) 
	{
			return data.Genre;
	});
	var genreGroup = genreDimension.group().reduceCount();
	for(var counter = 0; counter < 33; counter++)
	{
		var newColour = ThisHackMakesMeHateMyself();
		generatedColours.push(newColour);
	}
	var colourScale = d3.scale.ordinal().range(generatedColours);

	genreChart
		.width(1200)
		.height(600)
		.colors(colourScale)
		.dimension(genreDimension)
		.group(genreGroup)
		.legend(dc.legend());

	genreChart.render();
}

function ThisHackMakesMeHateMyself() //generates random colour. Note to self change name
{
	var text = "";
	var possible = "ABCDEFabcdef0123456789";

	for(var counter = 0; counter < 6; counter++)
	{
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	text = "#" + text;
	return text;
}

function setGreyScale()
{
	if(greyScale === true) //Going from grey scale to full colour
	{
		generatedColours = [];
		for(var counter = 0; counter < 33; counter++)
		{
			var newColour = ThisHackMakesMeHateMyself();
			generatedColours.push(newColour);
		}
		var colourScale = d3.scale.ordinal().range(generatedColours);
		genreChart
			.colors(colourScale)
			.render();
		greyScale = false;
		return;
	}
	else if(greyScale === false) //Going from full colour to grey scale
	{
		generatedColours = [];
		var greyScaleSelection = ["#000000", "#DCDCDC", "#D3D3D3", "#C0C0C0", "#A9A9A9", "#808080", "#696969", "#778899", "#708090", "#2F4F4F","#000000"];
		var greyScalecounterSelection = 1;

		for(var counter = 0; counter < 33; counter++)
		{
			if(greyScalecounterSelection % 10 === 0)
			{
				greyScalecounterSelection = 1;
			}
			generatedColours.push(greyScaleSelection[greyScalecounterSelection]);
			greyScalecounterSelection++;
		}
		var colourScale = d3.scale.ordinal().range(generatedColours);
		genreChart
			.colors(colourScale)
			.render();
		greyScale = true;
		return;
	}
}

function changeGenreWidth() 
{
	var newWidth = document.getElementById('genreResize').offsetWidth;
	genreChart.width(newWidth).transitionDuration(0);
	genreChart.transitionDuration(750);
	genreChart.render();
}