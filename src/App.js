import './styles/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStoreContextProvider } from './store';
import {
  AppBanner,
  Recipe 
} from './components';
function App() {
  return (
    <BrowserRouter>
      <GlobalStoreContextProvider>
        <AppBanner/>
        <Routes>
          <Route path="/" element={<Recipe />} />
        </Routes>
      </GlobalStoreContextProvider>
    </BrowserRouter>
  );
}

export default App;
