import React from 'react';
import { Provider } from "react-redux";
import Form from './containers/Form';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Form />
      </div>
    </Provider>
  );
}

export default App;
