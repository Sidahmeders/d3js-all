export const renderSelectionBox = (slection, data, setOption) => {
    const dataArray = Object.keys(data[0]);
    const  selectedData = dataArray.filter(item => {
       return item !== 'year' && 
              item !== 'name' && 
              item !== 'origin';
    });
    const carInfo = dataArray.filter(item => {
        return item === "name" && item === "origin";
    });
    
    let dropDown = slection.selectAll('select').data([null]);
     dropDown = dropDown.enter().append('select').merge(dropDown);
     dropDown.on('change', setOption)

    let options = dropDown.selectAll("option").data(selectedData);
    options.enter().append('option').merge(options)
        .text(d => d)
        .attr('value', d => d);
};