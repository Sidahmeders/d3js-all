const margin = {top: 40, right: 0, left: 60, bottom: 30};
const innerWidth = window.innerWidth - margin.right - margin.left;
const innerHeight = window.innerHeight - margin.top - margin.bottom -80;

export const renderScatterPlot = (selection, data, selectedOption) => {
    const xValue = d => d.year;
    const yValue = d => d[selectedOption];

    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, innerWidth - margin.left * 1.5])
    .nice();

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([0, innerHeight - 30]);

    const g = selection.append('g')
    .attr('transform', `translate(${margin.left + 30}, ${margin.top})`);

    g.append('text')
    .text(selectedOption)
    .attr('class', 'side-text');

    g.append('text')
    .text(xValue.toString().slice(7))
    .attr('class', 'bottom-text');

    const yAxis = g.append('g');
    yAxis
    .call(d3.axisLeft(yScale)
      .tickSize(-innerWidth + 90)
      .tickPadding(15)
    )
     .attr('class', 'yy')
    .merge(yAxis)
    .selectAll('.domain ').remove()
    .selectAll('.yy').remove();

    const xAxis = g.append('g');
    xAxis
    .call(d3.axisBottom(xScale)
    .tickSize(- innerHeight + 35)
    .tickPadding(15)
    )
      .attr('class', 'xx')
    .merge(xAxis)
    .attr('transform', `translate(${0}, ${innerHeight - 30})`)
    .select('.domain').remove()
    .selectAll('.xx').remove();

    const circles = g.selectAll('circle').data(data);
    circles
      .enter().append('circle')
      .attr('class', 'cr')
      .merge(circles)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', 10)
      .selectAll('.cr').remove();
};
