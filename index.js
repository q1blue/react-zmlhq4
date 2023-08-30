import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import Child from './Hello';
import '@grapecity/wijmo.styles/wijmo.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as wjcCore from '@grapecity/wijmo';

const App = function(prop) {
  const data = getData(10000);
  const child = React.createRef();
  return (
    <div className="App">
    <Child data={data} setRef={child} />
    <br /><br />
    </div>
  )
}

function getData(count) {
		var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),
			data = [];
		for (var i = 0; i < count; i++) {
			data.push({
				dataIndex: i+1,
				id: i,
				country: countries[i % countries.length],
				date: new Date(2014, i % 12, i % 28),
				amount: (Math.random() * 10000).toFixed(2),
				active: i % 4 == 0
			});
		}
		return data;
	}

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
