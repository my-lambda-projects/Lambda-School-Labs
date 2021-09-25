// Set up columns for agGrid
export const initialState = {
  rowData: [],
  columnDefs: [
    {
      headerName: 'ID',
      field: 'id',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
      // cellRendererFramework: CellRenderer
      //
      // You can attach custom renderering components to cells to customize processing / formatting of the contents
      // See https://www.ag-grid.com/javascript-grid-cell-rendering-components/
    },
    {
      headerName: 'Country',
      field: 'country',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Market',
      field: 'market',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Source',
      field: 'source',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Category',
      field: 'product_cat',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Aggregator',
      field: 'product_agg',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Product',
      field: 'product',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Retail',
      field: 'retail',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Wholesale',
      field: 'wholesale',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Currency',
      field: 'currency',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Unit',
      field: 'unit',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Date',
      field: 'date',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    },
    {
      headerName: 'Udate',
      field: 'udate',
      resizable: true,
      sortable: true,
      cellStyle: { textAlign: 'right' }
    }
  ],
  gridStyle: {
    width: '100%',
    marginTop: 15
  }
}

// Update grid state
export const reducer = (state = { rowData: [] }, action) => {
  switch (action.type) {
    case 'SET_ROW_DATA':
      return {
        ...state,
        rowData: action.payload
      }
    default:
      return state
  }
}
