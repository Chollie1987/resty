import React, { useEffect, useReducer } from 'react';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';
import axios from 'axios';

const initialState = {
  data: null,
  requestParams: {},
  history: [],
};

const reducer = (state, action) => {
  if (action.type === 'addResults') {
    return {
      ...state,
      data: action.data,
      history: [...state.history, action.history],
    };
  } else if (action.type === 'addParams') {
    return { ...state, requestParams: action.requestParams, data: {} };
  }
  return state;
};


const App = () => {
  const [appState, dispatch] = useReducer(reducer, initialState);


useEffect(() => {
  const getData = async () => {
    if (!appState.requestParams.url) return;

    if (appState.data && Object.keys(appState.data).length) return;
    console.log('we made it')
    const {url, method} = appState.requestParams;
    // const method = appState.requestParams.method;

    try {
      const response = await axios.get(url);
      console.log(response);
      // const data = await response.json();
      const historyObj = { url, method, results: response.data };
      const action = {
        type: 'addResults',
        data: response.data,
        history: historyObj,
      };
      dispatch(action);
      dispatch({ type: 'SET_DATA', payload: { data, method, url } });
    } catch (error) {
      console.error('Error getting data', error);
    }

};
getData();
},[])

const callApi = (requestParams) => {
  dispatch({ type: 'addParams', requestParams: requestParams });
};


  return (
    <React.Fragment>
      <Header />
      {console.log(appState)}
      <div>Request Method: {appState.requestParams.method}</div>
      <div>URL: {appState.requestParams.url}</div>
      {appState.requestParams.body && (
        <div>Body: {appState.requestParams.body}</div>
      )}
      <Form handleApiCall={callApi} />
      <Results data={appState.data} />
      <History history={appState.history} onHistoryClick={(item) => console.log(item)} />
      <Footer />
    </React.Fragment>
  );


};
export default App;

