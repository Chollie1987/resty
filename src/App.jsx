import React, { useEffect, useReducer } from 'react';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const initialState = {
  data: null,
  requestParams: {},
  history: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, history: [...state.history, action.payload] };
      case 'SET_REQUEST_PARAMS':
        return { ...state, requestParams: action.payload };
        default:
          return state;
  }
}

const App = () => {
  const [appState, dispach] = useReducer(reducer, initialState);
    
    };

  // const reducer = (App, action) => {
  //   switch
  // }


useEffect(() => {
  
  if (!appState.requestParams.url) return;
  
  const getData = async () => {
    const url = appState.requestParams.url; 
    const method = appState.requestParams.method;

    try {
      const response = await get(url, { method });
      const data = await response.json();
      dispatchEvent({ type: 'SET_DATA', payload: { data, method, url }});
    } catch (error) {
      console.error('Error getting data', error);
    }

  };

    // const request = {}

    // setAppSate((prev) => ({...prev, data: {} }));
  getData();
}, [appState.requestParams]);


 const callApi = (requestParams) => {
  dispatchEvent({ type: 'SET_REQUEST_PARAMS', payload: requestParams });
      // const data = {
      //   count: 2,
      //   results: [
      //     {name: 'fake thing 1', url: 'http://fakethings.com/1'},
      //     {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      //   ],
      // };
      // setAppState({data: {}, requestParams});
      return (
        <React.Fragment>
      <Header />
      <div>Request Method: {appState.requestParams.method}</div>
      <div>URL: {appState.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={appState.data} />
      <History history={appState.history} onHistoryClick={handleHistoryClick} />
      <Footer />
    </React.Fragment>
  );
};


export default App

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// export default App;
