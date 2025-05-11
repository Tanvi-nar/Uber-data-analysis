import React from 'react';
import { Nav } from 'react-bootstrap';
import './ChartSideNav.css';

export default function ChartSideNav({ items, activeKey, onSelect }) {
  return (
    <div className="chart-sidenav py-4">
      <Nav className="flex-column" variant="pills" activeKey={activeKey}>
        {items.map(i => (
          <Nav.Link
            key={i.key}
            eventKey={i.key}
            onClick={() => onSelect(i.key)}
            className="px-3 py-2"
          >
            {i.title}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}
