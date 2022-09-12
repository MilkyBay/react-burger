import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getIngredients } from "../../services/slices/slices";
import {useDispatch, useSelector} from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/login-page/login";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ProfilePage from "../../pages/profile/profile";
import RegisterPage from "../../pages/register-page/register";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import Page404 from "../../pages/page-404/page-404";
import { paths } from "../../utils/paths";
import {ProtectedRoute} from "../protected-route/protected-route";

function App() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <Router>
      <React.StrictMode>
        <div className={styles.app}>
          <AppHeader />
          <Switch>
            <Route exact path={paths.root}>
              <DndProvider backend={HTML5Backend}>
                <main className={styles.contentWrapper}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </main>
              </DndProvider>
            </Route>
            <Route path={paths.login}>
              <LoginPage />
            </Route>
            <Route path={paths.register}>
              <RegisterPage />
            </Route>
            <Route path={paths.forgotPassword}>
              <ForgotPasswordPage />
            </Route>
            <Route path={paths.resetPassword}>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path={paths.profile} isLogged={isLogged}>
              {/*<Route path={paths.profile}>*/}
                <ProfilePage />
              {/*</Route>*/}
            </ProtectedRoute>
            <Route path={paths.ingredientInfo}></Route>
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </div>
      </React.StrictMode>
    </Router>
  );
}

export default App;
