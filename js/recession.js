// root svg element

const margin = { top: 28, right: 22, bottom: 8, left: 22 },
      width = 595 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

const svg = d3.select('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .style('background', '#D5E4EB');


// red corner rect

svg.append('rect')
  .attr('width', 10)
  .attr('height', 28)
  .style('fill', '#EA1928');

const marginG = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);


// title

const title = 'Number of newspaper articles mentioning &ldquo;recession&rdquo;';

const titleG = marginG.selectAll('g.title').data([title]);

const titleGX = 0, titleGY = 0;

titleG
  .enter()
    .append('g')
    .attr('class', 'title')
    .attr('transform', `translate(${titleGX}, ${titleGY})`)
    .append('text')
    .style('font-family', "'ITC Officina Sans', sans-serif")
    .style('font-size', 16)
    .style('font-weight', '900')
    .style('fill', '#444')
  .merge(titleG)
    .html(d => d);


// subtitle

const subtitleG = marginG.selectAll('g.subtitle').data(d3.range(1));

const subtitleGX = 0, subtitleGY = 18;

const text = subtitleG
  .enter()
    .append('g')
    .attr('class', 'title')
    .attr('transform', `translate(${subtitleGX}, ${subtitleGY})`)
    .append('text')
    .style('font-family', "'ITC Officina Sans', sans-serif")
    .style('font-size', 12)
    .style('fill', '#666')
    .append('tspan');

text.append('tspan').text('In the ')
text.append('tspan').text('Financial Times').attr('font-style', 'italic')
text.append('tspan').text(' and the ')
text.append('tspan').text('Wall Street Journal').attr('font-style', 'italic')


// footer

const footerG = marginG.append('g')
  .attr('transform', `translate(0,${height})`);

const footerLeft = footerG.append('text').append('tspan')
  .style('font-family', "'ITC Officina Sans', sans-serif")
  .style('font-size', 10)
  .style('fill', '#666')

footerLeft.append('tspan').text('Sources: Factiva; ')
footerLeft.append('tspan').text('Financial Times').attr('font-style', 'italic')
footerLeft.append('tspan').text('; National Bureau of Economic Research')

const footerRight = footerG.append('text')
  .text('*Q3 2011, extrapolated from September 12th')
  .style('font-family', "'ITC Officina Sans', sans-serif")
  .style('font-size', 10)
  .style('fill', '#444')

footerRight.attr('x', 15 + width - footerRight.node().getComputedTextLength())


// legend

const legend = [{
  color: '#AFCAD5',
  label: 'US recessions according to NBER'
}];

const legendGX = 0, legendGY = 36;

// const legendG = g.selectAll('g.legend').data(d3.range(1));

const legendG = marginG.append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(${legendGX}, ${legendGY})`)

legendG
  .selectAll('g')
  .data(legend)
  .enter()
    .append('g')
    .each(function(d, i) {
      const g = d3.select(this);

      g.append('rect')
        .attr('x', 0)
        .attr('y', i * 16)
        .attr('width', 20)
        .attr('height', 10)
        .style('fill', d.color);

      g.append('text')
        .attr('x', 24)
        .attr('y', i * 16 + 9)
        .attr('height', 30)
        .attr('width', 100)
        .style('font-family', "'ITC Officina Sans', sans-serif")
        .style('font-size', 12)
        .style('fill', '#666')
        .html(d.label);
    });


// line chart

let style = document.createElement('style');

style.innerHTML = `.y-axis path {
  stroke-width: 0;
}

.y-axis .tick text {
  fill: #777;
font-weight: bold;
  font-size: 8px;
}

.y-axis .tick:nth-child(2) line {
  display: none;
}
`;

document.body.appendChild(style);

const chartMargin = { top: 66, left: 0, bottom: 0, right: 0 }
const chartWidth = width - margin.right,
      chartHeight = height - margin.top - margin.bottom - chartMargin.top;

const chartG = marginG.append('g')
  .attr('transform', `translate(0,${chartMargin.top})`)
  .attr('width', chartWidth)
  .attr('height', chartHeight)

chartG.append('rect')
  .attr('transform', `translate(0,${chartMargin.top})`)
  .attr('width', chartWidth)
  .attr('height', chartHeight)
  .style('fill', 'white')
  .style('fill-opacity', 0.1)

const data = [
  { date: '01/01/1990', value: 500 },
  { date: '07/01/1990', value: 1000 },
  { date: '01/01/1991', value: 2600 },
  { date: '07/01/1991', value: 2250 },
  { date: '01/01/1992', value: 2000 },
  { date: '07/01/1992', value: 2250 },
  { date: '01/01/1993', value: 1600 },
  { date: '07/01/1993', value: 1500 },
  { date: '01/01/1994', value: 900 },
  { date: '07/01/1994', value: 850 },
  { date: '01/01/1995', value: 700 },
  { date: '07/01/1995', value: 600 },
  { date: '01/01/1996', value: 700 },
  { date: '07/01/1996', value: 600 },
  { date: '01/01/1997', value: 550 },
  { date: '07/01/1997', value: 400 },
  { date: '01/01/1998', value: 750 },
  { date: '07/01/1998', value: 1250 },
  { date: '01/01/1999', value: 500 },
  { date: '07/01/1999', value: 450 },
  { date: '01/01/2000', value: 400 },
  { date: '07/01/2000', value: 1000 },
  { date: '01/01/2001', value: 1300 },
  { date: '07/01/2001', value: 1500 },
  { date: '01/01/2002', value: 800 },
  { date: '07/01/2002', value: 700 },
  { date: '01/01/2003', value: 500 },
  { date: '07/01/2003', value: 400 },
  { date: '01/01/2004', value: 300 },
  { date: '07/01/2004', value: 250 },
  { date: '01/01/2005', value: 300 },
  { date: '07/01/2005', value: 250 },
  { date: '01/01/2006', value: 200 },
  { date: '07/01/2006', value: 150 },
  { date: '01/01/2007', value: 100 },
  { date: '07/01/2007', value: 500 },
  { date: '01/01/2008', value: 1750 },
  { date: '07/01/2008', value: 1000 },
  { date: '01/01/2009', value: 4250 },
  { date: '07/01/2009', value: 3000 },
  { date: '01/01/2010', value: 2000 },
  { date: '07/01/2010', value: 1500 },
  { date: '01/01/2011', value: 1100 },
  { date: '07/01/2011', value: 1000 },
  { date: '01/01/2012', value: 1500 }
];

data.forEach(datum => datum.date = new Date(datum.date));


// x-axis

const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([0, chartWidth])

style = document.createElement('style');

style.innerHTML = `.x-axis .tick text {
  font-family: 'ITC Officina Sans',
  sans-serif; font-size: 12px;
  fill: #444;
}

.x-axis .tick.major line {
  stroke-width: 2px;
  stroke: #666;
}

.x-axis .tick.minor line {
  stroke-dasharray: 5,3;
}

.x-axis .tick:last-child {
  display: none;
}
`;

document.body.appendChild(style);

const xAxis = d3.axisBottom().scale(xScale)

xAxis.tickSize(8);
//xAxis.tickSizeInner(5);
xAxis.tickSizeOuter(0);
xAxis.tickPadding(5);
xAxis.ticks(100);

function isMajorTick(d) {
  const month = d.getMonth();
  return month === 0;
}

xAxis.tickFormat(d => {
  if (!isMajorTick(d)) return '';
  const year = d.getFullYear().toString();
  return year % 10 === 0 ? year : year.substring(2)
});

const xAxisG = chartG.append('g')
  .attr('transform', `translate(0,${chartHeight})`)
  .attr('class', 'x-axis')
  .call(xAxis)

xAxisG.selectAll('g')
  .filter(d => isMajorTick(d))
  .classed('major', true);

xAxisG.selectAll('g')
  .filter(d => !isMajorTick(d))
  .classed('minor', true);


// y-axis

style = document.createElement('style');

style.innerHTML = `.y-axis .tick text {
  font-family: 'ITC Officina Sans', sans-serif;
  font-size: 12px;
}

.y-axis .tick line {
  stroke: white;
  stroke-width: 2px;
  stroke-opacity: 0.85;
}`;

document.body.appendChild(style);

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value)])
  .range([chartHeight, 0]);

const yAxis = d3.axisRight().scale(yScale);

yAxis.ticks(10)
yAxis.tickSize(chartWidth);

const yAxisG = chartG.append('g')
  //.attr('transform', `translate(0,${height-chartHeight-margin.bottom-margin.top})`)
  .attr('class', 'y-axis')
  .call(yAxis);


// lines

const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.value))

const curvedLine = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.value))
  .curve(d3.curveCatmullRom)

chartG.append('path')
  .attr('d', curvedLine(data))
  .attr('stroke', '#004A61')
  .attr('stroke-width', 3)
  .attr('fill', 'none')

/*
chartG.append('path')
  .attr('d', line(data))
  .attr('stroke', 'blue')
  .attr('stroke-width', 3)
  .attr('fill', 'none')
*/

d3.selection.prototype.moveToFront = function() {
  return this.each(function() {
    this.parentNode.appendChild(this);
  });
};

d3.selection.prototype.moveToBack = function() {
  return this.each(function() {
    var firstChild = this.parentNode.firstChild;
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild);
    }
  });
};

chartG.moveToFront();

// recession bars

const recessionData = [
  { start: new Date('07/01/1990'), end: new Date('03/01/1991') },
  { start: new Date('11/01/2000'), end: new Date('07/01/2001') },
  { start: new Date('07/01/2007'), end: new Date('01/01/2009') }
];

const barsG = chartG.append('g')

barsG.moveToBack()

barsG.selectAll('rect')
  .data(recessionData)
  .enter()
    .append('rect')
    .style('fill', '#AFCAD5')
    .attr('width', d => xScale(d.end) - xScale(d.start))
    .attr('height', chartHeight)
    .attr('x', d => xScale(d.start))

// star

const lastData = data[data.length - 1];

chartG.append('g')
  .attr('transform', `translate(${xScale(lastData.date)-4},${yScale(lastData.value)})`)
  .append('text')
  .text('*')
