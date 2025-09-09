import './styles/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GlobalStoreContextProvider } from './store';
import { AuthContextProvider } from './auth';
import { FormCollectionProvider } from './form';
import { SnackbarProvider } from 'notistack';
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
      <FormCollectionProvider>
        <SnackbarProvider>
          <AuthContextProvider>
            <GlobalStoreContextProvider>
              <AppBanner/>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/view/:id" element={<Recipe />} />
                <Route path="/edit/:id" element={<EditRecipe />} />
              </Routes>
            </GlobalStoreContextProvider>
          </AuthContextProvider>
        </SnackbarProvider>
      </FormCollectionProvider>
    </BrowserRouter>
  );
}

export default App;
