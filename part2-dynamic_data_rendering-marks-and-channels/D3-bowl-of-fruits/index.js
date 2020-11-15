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

const render = (selection, props) => {

  const bowl = selection.selectAll('rect').data([null])
    .enter()
      .append('rect')
        .attr('width', width / 2)
        .attr('height', 200)
        .attr('x', width / 4)
        .attr('fill', '#0856');
  
  const circles = selection.selectAll('circle').data(props, d => d.id);
  circles
    .enter().append('circle')
      .attr('cx', (d, i) => i * 120 + width / 3)
      .attr('cy', 90)
      .attr('r', 0)
    .merge(circles).transition().duration(1000)
      .attr('cx', (d, i) => i * 120 + width / 3)
      .attr('r', d => radiusScale(d.type))
      .attr('fill', d => colorScale(d.type));
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

const makeFruit = type => ({type, id: Math.random()});
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
changeFruits('pop', 3000, 1, 'apple');
changeFruits('slice', 4000, 1, 'lemon');

setTimeout(() => {
  fruits.shift();
  render(svg,fruits);
}, 5000);
