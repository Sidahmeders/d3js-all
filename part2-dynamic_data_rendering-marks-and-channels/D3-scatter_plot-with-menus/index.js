import { renderSelectionBox } from './selectbox.js';
import { renderScatterPlot } from './scatterplot.js';

const svg = d3.select('svg')
  .style('background-color', '#ddd')
    .attr('width', window.innerWidth - 30)
    .attr('height', window.innerHeight - 80);

let data;
let selectedOption = "mpg";

function setSelectedOption(option) {
  selectedOption = option;
  console.log(this.value);
  renderScatterPlot(svg, data, selectedOption);
};

d3.csv('auto-mpg.csv').then(loadedData => {
    loadedData.forEach(d => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
    });
    data = loadedData;
    renderSelectionBox(d3.select('#menus'), data, setSelectedOption);
    renderScatterPlot(svg, data, selectedOption);
});
