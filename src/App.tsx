import React from 'react';
import {Router} from 'react-router-dom'
import { createBrowserHistory } from 'history';
import HomePage from './pages/TodosPage';

const history = createBrowserHistory();

function App() {
  return (
    <main>
       <Router history={history}>
             <HomePage/>
       </Router>
    </main>
 )
}

export default App;
