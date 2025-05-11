import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  Title, 
  PointElement 
} from 'chart.js';
import { 
  Card, 
  Button, 
  ButtonGroup, 
  Row, 
  Col 
} from 'react-bootstrap';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  Title, 
  PointElement
);

const chartConfig = data => [
  { key: 'category', title: 'Category Distribution',    type: 'bar',  dataset: data.category_counts,    isMonth: false },
  { key: 'purpose',  title: 'Purpose Distribution',     type: 'bar',  dataset: data.purpose_counts,     isMonth: false },
  { key: 'daynight', title: 'Day–Night Distribution',   type: 'bar',  dataset: data.day_night_counts,   isMonth: false },
  { key: 'weekday',  title: 'Trips / Weekday',          type: 'bar',  dataset: data.day_counts,         isMonth: false },
  { key: 'monthly',  title: 'Monthly Trip Count',       type: 'line', dataset: data.monthly_trip_counts, isMonth: true  },
  { key: 'maxmiles', title: 'Monthly Max Miles',        type: 'line', dataset: data.monthly_max_miles,  isMonth: true  },
];
const commonOpts = {
  responsive: true,
  maintainAspectRatio: false   // <-- lets canvas stretch freely
};
const buildChartData = (label, dataset, isMonthChart = false) => {
  const monthOrder = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const labels = isMonthChart
    ? monthOrder.filter(m => m in dataset)
    : Object.keys(dataset);

  return {
    labels,
    datasets: [{
      label,
      data: labels.map(l => dataset[l]),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor:     'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      tension: 0.4
    }]
  };
};

const Charts = ({ data, overrideKey }) => {
  const configs = chartConfig(data);
  const [selectedKey, setSelectedKey] = useState(
        overrideKey || configs[0].key
      );
    
      /* when parent changes key, sync */
      React.useEffect(() => {
        if (overrideKey) setSelectedKey(overrideKey);
      }, [overrideKey]);
  const selected = configs.find(c => c.key === selectedKey);
  return (
    <>


      <Row>
        <Col md={{ span: 8, offset: 2 }}>
        <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title>{selected.title}</Card.Title>
              <div className="chart-wrap">
                {selected.type === 'bar' 
                   ? <Bar
                   data={buildChartData(selected.title, selected.dataset, selected.isMonth)}
                   options={commonOpts}
                   height={350}                  // <‑‑ any pixel height you like
                 />
               : <Line
                   data={buildChartData(selected.title, selected.dataset, selected.isMonth)}
                   options={commonOpts}
                   height={350}
                 />
                }
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Charts;
