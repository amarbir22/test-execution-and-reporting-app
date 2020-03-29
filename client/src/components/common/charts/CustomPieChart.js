import React from 'react';
import {
  Cell, Label, Legend, Pie, PieChart
} from 'recharts';
import PropTypes from 'prop-types';

const COLORS = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#0099c6', '#dd4477', '#66aa00', '#b82e2e', '#316395', '#3366cc', '#994499', '#22aa99', '#aaaa11', '#6633cc', '#e67300', '#8b0707', '#651067', '#329262', '#5574a6', '#3b3eac', '#b77322', '#16d620', '#b91383', '#f4359e', '#9c5935', '#a9c413', '#2a778d', '#668d1c', '#bea413', '#0c5922', '#743411'];

const sumOfValues = (data) => {
  let sum = 0;
  data.forEach((d) => {
    sum += d.value;
  });
  return sum;
};

const CustomPieChart = ({ data }) => (
  <div className="align-content-center ml-4">
    <PieChart
      width={300}
      height={230}
      data={data}
    >
      <Legend />
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
        innerRadius={30}
        paddingAngle={5}
        margin={{
          bottom: 5,
          right: 0
        }}
        label
        isAnimationActive={false}
      >
        <Label value={sumOfValues(data)} position="center" style={{ fontSize: '20px' }} />
        {
          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  </div>
);

CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number
  }))
};

CustomPieChart.defaultProps = {
  data: []
};

export default CustomPieChart;
