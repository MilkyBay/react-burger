import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { paths } from "../../utils/paths";
import {Redirect, useHistory} from "react-router-dom";
import {useCallback, useState} from "react";
import {postSaveNewPassword} from "../../services/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const [newPassword, setNewPassword] = useState('');
  const [token, setToken] = useState('');

  const onLoginClick = useCallback(() => {
    history.replace({ pathname: paths.login });
  }, [history]);

  const onPasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  const onTokenChange = (event) => {
    setToken(event.target.value);
  }

  const onSaveClick = () => {
    dispatch(postSaveNewPassword({ "password": newPassword, "token": token }));
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
        <PasswordInput onChange={onPasswordChange} value={newPassword}/>
        <Input type="email" placeholder="Введите код из письма" onChange={onTokenChange} value={token}/>
        <Button size="medium" type="primary" onClick={onSaveClick}>
          Сохранить
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

export default ResetPasswordPage;
