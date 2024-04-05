const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


function init() {
    d3.json(url).then(function(data){
        let dropdownMenu = d3.select("#selDataset");
        let names = data.names;

        names.forEach(function(id){
            dropdownMenu.append("option").text(id).property("value", id);
        });

        BarChart(names[0])
        BubblePlot(names[0])
        MetaData(names[0])
    });
}

function BarChart(selected_data){
    d3.json(url).then(function(data) {
        let current_data = data.samples;
        let filtered = current_data.filter(item => item.id === selected_data)[0];
        let sample_values = filtered.otu_ids;
        let otu_ids = filtered.otu_ids;
        let otu_labels = filtered.otu_labels;

        let yticks = otu_ids.slice(0,10).reverse();
        for (i =0; i<10; i++) {
          yticks[i] = "OTU " + yticks[i];
        }

        let input = [{
            y: yticks,
            x: sample_values.reverse().slice(0,10),
            text: otu_labels.reverse(),
            type: "bar",
            orientation: "h"
          }];

        Plotly.newPlot("bar", input); 
    });

}

function BubblePlot(selected_data){
    d3.json(url).then(function(data) {
        let current_data = data.samples;
        let filtered = current_data.filter(item => item.id === selected_data)[0];
        let sample_values = filtered.sample_values;
        let otu_ids = filtered.otu_ids;
        let otu_labels = filtered.otu_labels;

        let input = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values, 
                color: otu_ids
            }
          }];
        
        Plotly.newPlot("bubble", input);
    });

}

function MetaData(selected_data){
    d3.json(url).then(function(data) {
        let current_data = data.metadata;
        let object = current_data.filter(thing => thing.id == selected_data)[0];
        let display = d3.select("#sample-metadata").html("");
        display.append("h6").text(`id: ${object.id}`)
        display.append("h6").text(`ethnicity: ${object.ethnicity}`)
        display.append("h6").text(`gender: ${object.gender}`)
        display.append("h6").text(`age: ${object.age}`)
        display.append("h6").text(`location: ${object.location}`)
        display.append("h6").text(`bbtype: ${object.bbtype}`)
        display.append("h6").text(`wfreq: ${object.wfreq}`)
    });
}

function optionChanged(newdata){
   BarChart(newdata)
   BubblePlot(newdata)
   MetaData(newdata)
}

init();

