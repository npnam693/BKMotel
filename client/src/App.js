import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {publicRoutes} from './routes'

function App() {
  return (
    <Router>
        <Routes>
          {publicRoutes.map((route, idx) => {
            let Layout = route.layout
            const Page = route.component
            if(!Layout){
              Layout = Fragment
            }
            return (
              <Route key={idx} path={route.path} element={<Layout><Page /></Layout>}/>
            )
          })}
        </Routes>
    </Router>
  );
}

export default App;