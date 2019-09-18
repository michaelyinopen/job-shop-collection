import { useReducer, useEffect } from 'react';
import { stableSort, getSorting } from '../functions/sort';

const actionTypes = {
  initializeRows: "initialize-rows",
  requestSort: "request-sort",
  selectAll: "select-all",
  selectOne: "select-one",
  changePage: "change-page",
  changeRowsPerPage: "change-rows-per-page" // keeps the first row of previous render visible, therefore might change page
};

export const actionCreators = {
  initializeRows: rows => ({
    type: actionTypes.initializeRows,
    rows
  }),
  requestSort: property => ({
    type: actionTypes.requestSort,
    property
  }),
  selectAll: () => ({
    type: actionTypes.selectAll,
  }),
  selectOne: id => ({
    type: actionTypes.selectOne,
    id
  }),
  changePage: pageIndex => ({
    type: actionTypes.changePage,
    pageIndex
  }),
  changeRowsPerPage: rowsPerPage => ({
    type: actionTypes.changeRowsPerPage,
    rowsPerPage
  })
};

const orderInitialState = 'desc'; // 'desc' or 'asc'
const orderByInitialState = 'id';
const selectedInitialState = [];
const pageIndexInitialState = 0;
const rowsPerPageInitialState = 10;

const init = rows => {
  const order = orderInitialState;
  const orderBy = orderByInitialState;
  const sortedRows = stableSort(rows, getSorting(order, orderBy));
  return {
    rows: sortedRows,
    order,
    orderBy,
    selected: selectedInitialState,
    pageIndex: pageIndexInitialState,
    rowsPerPage: rowsPerPageInitialState
  };
}

const reducer = (state, action) => {
  if (action.type === actionTypes.initializeRows) {
    const { rows } = action;
    return init(rows);
  }
  if (action.type === actionTypes.requestSort) {
    const { property } = action;
    const isPreviousDesc = state.orderBy === property && state.order === 'desc';
    const order = isPreviousDesc ? 'asc' : 'desc'
    const orderBy = property;
    const rows = stableSort(state.rows, getSorting(order, orderBy))
    return {
      ...state,
      rows,
      order,
      orderBy
    };
  }
  if (action.type === actionTypes.selectAll) {
    if (state.selected.length !== state.rows.length) { // from not-all-selected to all selected
      const selected = state.rows.map(r => r.id);
      return {
        ...state,
        selected
      };
    }
    // from all selected none selected
    if (state.rows.length === 0) {
      return state;
    }
    return {
      ...state,
      selected: []
    };
  }
  if (action.type === actionTypes.selectOne) {
    const { id } = action;
    const selectedSet = new Set(state.selected);
    if (selectedSet.has(id)) {
      selectedSet.delete(id);
    }
    else {
      selectedSet.add(id);
    }
    return {
      ...state,
      selected: [...selectedSet]
    };
  }
  if (action.type === actionTypes.changePage) {
    const { pageIndex } = action;
    if (state.pageIndex === pageIndex) {
      return state;
    }
    return {
      ...state,
      pageIndex
    };
  }
  if (action.type === actionTypes.changeRowsPerPage) {
    const { rowsPerPage } = action;
    if (state.rowsPerPage === rowsPerPage) {
      return state;
    }
    const firstRowIndexOfPreviousState = state.pageIndex * state.rowsPerPage;
    const pageIndex = Math.floor(firstRowIndexOfPreviousState / rowsPerPage);
    return {
      ...state,
      pageIndex,
      rowsPerPage
    };
  }
  return state;
};

const usePage = rows => {
  const [state, dispatch] = useReducer(
    reducer,
    rows,
    init
  );
  useEffect(
    () => {
      dispatch(actionCreators.initializeRows(rows))
    },
    [rows]
  );
  // maybe other props passed to usePage
  // maybe other useEffects to respond to changes of those props
  // e.g.focus a specific row after creation
  // e.g. keep sort and filters?

  // const requestSortCallback = useCallback(
  //   property => dispatch(actionCreators.requestSort(property)),
  //   []
  // );
  // const selectAllCallback = useCallback(
  //   () => dispatch(actionCreators.selectAll()),
  //   []
  // );
  // const selectOneCallback = useCallback(
  //   id => dispatch(actionCreators.selectOne(id)),
  //   []
  // );
  // const changePageCallback = useCallback(
  //   pageIndex => dispatch(actionCreators.changePage(pageIndex)),
  //   []
  // );
  // const changeRowsPerPageCallback = useCallback(
  //   rowsPerPage => dispatch(actionCreators.changeRowsPerPage(rowsPerPage)),
  //   []
  // );

  return [state, dispatch]
};

export default usePage;