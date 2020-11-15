const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3
  .select('svg')
    .attr('width', width)
    .attr('height', height);

const colorScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range(['#d44', '#dd4']);

const radiusScale = d3.scaleOrdinal()
  .domain(['apple', 'lemon'])
  .range([50, 40]);

let selectedFruit = null;

const onFruitClick = id => {
  selectedFruit = id;
  render(svg, fruits);
};

const render = (selection, props) => {
  
  const circles = selection.selectAll('circle').data(props, d => d.id);
  circles
    .enter().append('circle')
      .attr('cx', (d, i) => i * 120 + width / 3)
      .attr('cy', 90)
      .attr('r', 0)
    .merge(circles)
    .on('mouseover', d => onFruitClick(d.id))
    .on('mouseout', () => onFruitClick(null))
    .transition().duration(1000)
      .attr('cx', (d, i) => i * 120 + width / 3)
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type))
      .attr('stroke-width', 5)
      .attr('stroke', d => d.id === selectedFruit ? "#028" : "#fff0");
  circles
    .exit().transition().duration(1000)
      .attr('r', 0)
    .remove();

  const texts = selection.selectAll('text').data(props, d => d.id);
    texts
      .enter().append('text').text(d => d.type)
        .attr('x', (d, i) => i * 120 + width / 3)
        .attr('y', 90)
    texts.text(d => d.type).transition().duration(1000)
      .attr('x', (d, i) => i * 120 + width / 3)
      .attr('y', 90);
    texts
      .exit().remove();
};

function uniqueId(){
  return new Date().getTime().toString() + Math.floor(Math.random() * 10000);
};

const makeFruit = type => ({type, id: uniqueId()});
const fruits = d3.range(5).map(() => makeFruit('apple'));

render(svg, fruits);

const changeFruits = (method, time, fruitIndex, fruitType) => { 
  setTimeout(() => {
    fruits[method]();
    fruits[fruitIndex].type = fruitType;
    render(svg, fruits);
  }, time);
};

changeFruits('pop', 1500, 1, 'apple');
changeFruits('slice', 3000, 1, 'lemon');

setTimeout(() => {
  fruits.shift();
  render(svg,fruits);
}, 4000);
