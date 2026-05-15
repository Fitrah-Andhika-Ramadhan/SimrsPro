import React from 'react';
import { BarChart2, TrendingUp, Download, PieChart } from 'lucide-react';

const Reports = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Analytics & Reports</h2>
        <button className="btn btn-primary">
          <Download size={18} /> Export PDF
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Revenue Chart Placeholder */}
        <div className="glass-panel card" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="var(--accent-primary)" /> Revenue Overview
            </h3>
            <select className="input-control" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '10%', padding: '1rem 0' }}>
            {/* Simulated Bar Chart */}
            {[40, 70, 45, 90, 65, 80].map((height, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: `${height}%`, 
                  background: `linear-gradient(to top, var(--accent-primary), transparent)`, 
                  borderRadius: '4px 4px 0 0',
                  border: '1px solid var(--accent-primary)',
                  borderBottom: 'none'
                }}></div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>W{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Demographics Placeholder */}
        <div className="glass-panel card" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart size={18} color="var(--accent-secondary)" /> Patient Demographics
            </h3>
          </div>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            {/* Simulated Donut Chart using CSS conic-gradient */}
            <div style={{ 
              width: '150px', height: '150px', 
              borderRadius: '50%', 
              background: 'conic-gradient(var(--accent-primary) 0% 45%, var(--accent-teal) 45% 75%, var(--accent-warning) 75% 100%)',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ width: '100px', height: '100px', background: 'var(--bg-secondary)', borderRadius: '50%' }}></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--accent-primary)', borderRadius: '2px' }}></div>
                Adults (45%)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--accent-teal)', borderRadius: '2px' }}></div>
                Pediatrics (30%)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--accent-warning)', borderRadius: '2px' }}></div>
                Geriatrics (25%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="glass-panel card">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={18} /> Daily Summary
        </h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Patients</th>
                <th>New Admissions</th>
                <th>Discharges</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>May 15, 2026</td>
                <td>145</td>
                <td>12</td>
                <td>8</td>
                <td style={{ color: '#34d399', fontWeight: 600 }}>Rp 45.200.000</td>
              </tr>
              <tr>
                <td>May 14, 2026</td>
                <td>138</td>
                <td>15</td>
                <td>10</td>
                <td style={{ color: '#34d399', fontWeight: 600 }}>Rp 42.150.000</td>
              </tr>
              <tr>
                <td>May 13, 2026</td>
                <td>152</td>
                <td>9</td>
                <td>14</td>
                <td style={{ color: '#34d399', fontWeight: 600 }}>Rp 51.800.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
