import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { filterData } from "../../utils/data";

const api = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = React.useState({
    burgerIngredients: [],
    orderedIngredients: [],
    loading: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(api);
        const data = await res.json();
        const result = filterData(data.data);
        setState({ ...state, burgerIngredients: result, loading: false });
      } catch (err) {
        setState({ ...state, burgerIngredients: [], loading: false });
      }
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
