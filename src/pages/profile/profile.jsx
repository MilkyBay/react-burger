import styles from "./styles.module.css";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, useHistory} from "react-router-dom";
import { paths } from "../../utils/paths";
import clsx from "clsx";
import { Route, Switch } from 'react-router-dom';
import {getUserInfo, patchUserInfo, postLogout} from "../../services/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.auth.email);
  const name = useSelector((state) => state.auth.name);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const [password, setPassword] = useState(''); // ???

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  }

  const handlePasswordInput = (event) => { // ???
    setPassword(event.target.value);
  }

  const handleLogout = async () => {
    const successfulLogout = await dispatch(postLogout());
    if (successfulLogout) {
      history.replace({ pathname: paths.login });
    }
  }

  const handleSaveChanges = () => {
    dispatch(patchUserInfo({ name: newName, email: newEmail }));
  }

  const handleDiscardChanges = () => {
    setNewName(name);
    setNewEmail(email);
  }

  useEffect(() => {
    dispatch(getUserInfo()); //todo нужно ли?
  }, []);

  useEffect(() => {
    setNewName(name);
    setNewEmail(email);
  }, [name, email]);

  console.log('PFORILE!');

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <NavLink
          className={clsx(styles.navButton, "text text_type_main-medium")}
          to={paths.profile}
          activeClassName={styles.buttonsActive}
          exact
        >
          Профиль
        </NavLink>
        <NavLink
          className={clsx(styles.navButton, "text text_type_main-medium")}
          to={paths.orders}
          activeClassName={styles.buttonsActive}
          exact
        >
          История заказов
        </NavLink>
        <a
          className={clsx(styles.navButton, "text text_type_main-medium")}
          onClick={handleLogout}
        >
          Выход
        </a>
        <p
          className={clsx(styles.note, "text text_type_main-default", "mt-20")}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <Switch>
        <Route path={paths.profile} exact>
          <div className={styles.formsWrapper}>
            <Input type="text" placeholder="Имя" value={newName} onChange={handleNameChange}/>
            <Input type="email" placeholder="E-mail" value={newEmail} onChange={handleEmailChange}/>
            <PasswordInput value={password} onChange={handlePasswordInput}/>
            <div className={styles.changeButtons}>
              <Button size="medium" type="primary" onClick={handleDiscardChanges}>Отменить</Button>
              <Button size="medium" type="primary" onClick={handleSaveChanges}>Сохранить</Button>
            </div>
          </div>
        </Route>
        <Route path={paths.orders} exact>
          <div>orders</div>
        </Route>
      </Switch>
    </div>
  );
};

export default ProfilePage;
