import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import { useCallback } from "react";

const RegisterPage = () => {
  const history = useHistory();

  const onLoginClick = useCallback(() => {
    history.replace({ pathname: paths.login });
  }, [history]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Регистрация</p>
        <Input type="email" placeholder="Имя" />
        <Input type="email" placeholder="E-mail" />
        <PasswordInput />
        <Button size="medium" type="primary">
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
        </p>
        <Button type="secondary" size="medium" onClick={onLoginClick}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
