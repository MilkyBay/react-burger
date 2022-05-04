import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { filterData } from "../../utils/data";
import { checkReponse } from "../../utils/common-functions";

const api = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = React.useState({
    burgerIngredients: [],
    orderedIngredients: [],
    loading: false,
  });

  useEffect(() => {
    const fetchData = () => {
      setState({ ...state, loading: true });
      fetch(api)
        .then((res) => checkReponse(res))
        .then((data) => Promise.resolve(filterData(data.data)))
        .then((res) =>
          setState({ ...state, burgerIngredients: res, loading: false })
        )
        .catch((err) =>
          setState({ ...state, burgerIngredients: [], loading: false })
        );
    };

    fetchData();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.contentWrapper}>
        <BurgerIngredients state={state} setState={setState} />
        <BurgerConstructor state={state} setState={setState} />
      </main>
    </div>
  );
}

export default App;
