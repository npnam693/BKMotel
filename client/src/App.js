import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {publicRoutes} from './routes'
import { SnackbarProvider } from 'notistack';
import { styled } from "@mui/material";
import UserProvider from './Context/UserProvider';


const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    font-size: 16px;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
  }
`;

function App() {
  return (
    <UserProvider>
    <StyledSnackbarProvider maxSnack={3}  anchorOrigin={{vertical: 'bottom',horizontal: 'right'}}>
      <Router>
          <Routes>

            {
              publicRoutes.map((route, idx) => {
                let Layout = route.layout
                const Page = route.component
                if(!Layout) Layout = Fragment
                return (<Route key={idx} path={route.path} element={<Layout><Page /></Layout>}/>)
            })}

          </Routes>
      </Router>
    </StyledSnackbarProvider>
    </UserProvider>
  );
}

export default App;