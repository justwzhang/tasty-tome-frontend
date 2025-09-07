import './styles/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStoreContextProvider } from './store';
import {
  AppBanner,
  Home,
  Recipe,
  EditRecipe,
  Login,
} from './components';
function App() {
  return (
    <BrowserRouter>
      <GlobalStoreContextProvider>
        <AppBanner/>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/view/:id" element={<Recipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </GlobalStoreContextProvider>
    </BrowserRouter>
  );
}

export default App;
