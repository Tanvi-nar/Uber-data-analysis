import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Charts from './components/Charts';
import ChartSideNav from './components/ChartSideNav';

export default function ChartsPage() {
  const { state } = useLocation();
  if (!state?.data) return <p className="p-5 text-center">No data – upload first.</p>;

  /* ---------- same config helper used by Charts.js ---------- */
  const chartConfig = data => [
    { key: 'category', title: 'Category Distribution',    type: 'bar',  dataset: data.category_counts,    isMonth: false },
    { key: 'purpose',  title: 'Purpose Distribution',     type: 'bar',  dataset: data.purpose_counts,     isMonth: false },
    { key: 'daynight', title: 'Day–Night Distribution',   type: 'bar',  dataset: data.day_night_counts,   isMonth: false },
    { key: 'weekday',  title: 'Trips / Weekday',          type: 'bar',  dataset: data.day_counts,         isMonth: false },
    { key: 'monthly',  title: 'Monthly Trip Count',       type: 'line', dataset: data.monthly_trip_counts, isMonth: true  },
    { key: 'maxmiles', title: 'Monthly Max Miles',        type: 'line', dataset: data.monthly_max_miles,  isMonth: true  },
  ];
  const configs = chartConfig(state.data);

  /* lift selection state here so sidebar can control it */
  const [selectedKey, setSelectedKey] = useState(configs[0].key);

  return (
    <div className="d-flex">
      {/* ⬅ sidebar only for chart switching */}
      <ChartSideNav
        items={configs}
        activeKey={selectedKey}
        onSelect={setSelectedKey}
      />

      {/* main chart area */}
      <main className="chart-area flex-grow-1 p-4">
        <p className="lead mb-3">
            <strong>Dataset:</strong> {state.data.shape[0]} rows × {state.data.shape[1]} columns
        </p>

        <div className="chart-card shadow-sm">
            <Charts data={state.data} overrideKey={selectedKey} />
        </div>
        </main>
    </div>
  );
}
