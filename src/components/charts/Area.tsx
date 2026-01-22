import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

// #region Sample data
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3600,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1290,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2090,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3790,
    pv: 4300,
    amt: 2100,
  },
];

// #endregion
const SimpleAreaChart = () => {
  return (
    <AreaChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="6 8" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Area  dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      <RechartsDevtools />
    </AreaChart>
  );
};

export default SimpleAreaChart;
