
const width = window.innerWidth - 200;
const height = window.innerHeight - 120;

const svg = d3.select('svg')
  .style('background-color', "#f9f9f9")
  .attr('width', width)
  .attr('height', height);

let cerealMap = [];

const renderData = data => {
  const selectBox = d3.select('.main').append('select').data([null]);
  const option = selectBox.selectAll('option').data(data);
  option.enter().append('option')
    .text(d => d)
    .attr('value', d => d);
};


d3.csv('data.csv', data => {
  let loadedData = [data];
    
  loadedData.forEach(item => {
    cerealMap.push(item.cereal);
  });

});

  renderData(cerealMap);

// console.log(cerealMap);
// console.log(nutritionFields);

//* calories
//* carbs 
//* fat
//* fiber
//* potassium 
//* protein
//* sodium
//* sugars
//* vitamins
