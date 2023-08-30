import React, { useState } from 'react';
import { FlexGrid, FlexGridColumn } from '@grapecity/wijmo.react.grid';
import * as wjcCore from '@grapecity/wijmo';
import * as wjcGrid from '@grapecity/wijmo.grid';
import { FlexGridSearch } from '@grapecity/wijmo.react.grid.search';

const Child = function (props) {
  const [data, setData] = useState(props.data);
  const grid = React.createRef();
  const theSearch = React.createRef();

  function initGrid(grid) {
    theSearch.current.control.grid = grid;
    grid.rowHeaders.columns[0].width = 50;

    // get column to be searched, i.e. search within visible columns only
    let columnToBeSearched = ['dataIndex'];
    grid.columns.filter(col => col.visible).forEach(col => columnToBeSearched.push(col.binding));

    // replaces the FlexGridSearch default filter function, with a custom filter function
    grid.collectionView.filters[0] = (item) => {
      for (const property of columnToBeSearched) {
        if (item[property]) {
          let value = item[property].toString().toLowerCase();
          if (value.includes(theSearch.current.control.text.toLowerCase())) {
            return item;
          }
        }
      }
    };

    grid.formatItem.addHandler((s, e) => {
      // show row indices in row headers
      if (e.panel.cellType == wjcGrid.CellType.RowHeader) {
        let row = s.rows[e.row];
        let searchText = theSearch.current.control.text;
        // row header textContent
        let textContent = row.dataItem.dataIndex.toString();

        // to check and highlight, if row header contains searched string
        if (searchText && textContent.includes(searchText)) {
          textContent = textContent.replace(
            searchText,
            `<span class="wj-state-match">${searchText}</span>`
          );
        }
        e.cell.innerHTML = textContent;
      }
    });
  }

  return (
    <div className="Child">
      <FlexGridSearch ref={theSearch} placeholder="FlexGridSearch" />
      <FlexGrid
        clsss="custom-grid"
        ref={props.setRef}
        itemsSource={data}
        initialized={initGrid}
      >
        <FlexGridColumn header="Id" binding="id" width="*" />
        <FlexGridColumn header="Country" binding="country" width="2*" />
        <FlexGridColumn header="Sales" binding="amount" width="*" format="n2" />
        <FlexGridColumn
          header="Active"
          binding="active"
          width="*"
          format="n2"
        />
      </FlexGrid>
    </div>
  );
};

export default Child;
