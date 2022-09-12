import styles from "./styles.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import {Redirect, useHistory} from "react-router-dom";
import {useCallback, useState} from "react";
import {postRestorePassword} from "../../services/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [email, setEmail] = useState('');

  const onLoginClick = useCallback(() => {
    history.replace({ pathname: paths.login });
  }, [history]);

  const inputOnChange = (event) => {
    setEmail(event.target.value);
  }

  const onForgotPasswordClick = async () => {
    const successfulReset = await dispatch(postRestorePassword({ "email": email }));
    if (successfulReset) {
      history.replace({ pathname: paths.resetPassword });
    }
  }

  if (isLogged) {
    return (
        <Redirect to={paths.root}/>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topSide}>
        <p className="text text_type_main-medium">Восстановление пароля</p>
        <Input type="email" placeholder="Укажите e-mail" onChange={inputOnChange} value={email}/>
        <Button size="medium" type="primary" onClick={onForgotPasswordClick}>
          Восстановить
        </Button>
      </div>
      <div className={styles.textWithButton}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button type="secondary" size="medium" onClick={onLoginClick}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
