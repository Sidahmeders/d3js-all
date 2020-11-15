const width = window.innerWidth;
const height = window.innerHeight;
const eyeSpacing = 60;

const svg = d3
  .select('svg')
  .style('background-color', '#fdfdfd')
    .attr('width', width)
    .attr('height', height);

const circle = svg
  .append('circle')
    .attr('r', height / 4)
    .attr('cx', width / 2)
    .attr('cy', height / 4)
    .attr('fill', 'orange');

const leftEye = svg
  .append('circle')
    .attr('r', height / 35)
    .attr('cx', width / 2 - eyeSpacing)
    .attr('cy', height / 6)
    .attr('fill', 'black');

const rightEye = svg
  .append('circle')
    .attr('r', height / 35)
    .attr('cx', width / 2 + eyeSpacing)
    .attr('cy', height / 6)
    .attr('fill', 'black');

const smile = svg
  .append('path')
    .attr('transform', `translate(${width / 2}, ${height / 3.7})`)
    .attr('d', d3.arc()({
        innerRadius: 80,
        outerRadius: 100,
        startAngle: 4.2,
        endAngle: Math.PI / 1.5
    }));

const eyebrowGroup = svg
  .append('g');

eyebrowGroup
  .transition().duration(1000)
    .attr('transform', `translate(0, -20)`)
  .transition().duration(1000)
    .attr('transform', `translate(0, 0)`);

const leftEyebrow = eyebrowGroup
  .append('rect')
    .attr('width', 70)
    .attr('height', 10)
    .attr('x', width / 2 - 99)
    .attr('y', height / 9.2);

const rightEyebrow = eyebrowGroup
  .append('rect')
    .attr('width', 70)
    .attr('height', 10)
    .attr('x', width / 2 + 30)
    .attr('y', height / 9.2);
