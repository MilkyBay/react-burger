import {Redirect, Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {paths} from "../../utils/paths";
import {getUserInfo} from "../../services/slices/authSlice";

export function ProtectedRoute({ children, ...rest }) {
    // const isAuth = useSelector((state) => state.auth.email);
    const dispatch = useDispatch();
    // const [isAuth, setIsAuth] = useState(false);

    const init = async () => {
        await dispatch(getUserInfo());
        // const isLogged = await dispatch(getUserInfo());
        // if (isLogged.success) {
        //     setIsAuth(true);
        // }
    }

    useEffect(() => {
        init();
    }, []);

    // if (!rest.isLogged) {
    //     return null;
    // }

    console.log('!protected route!', children);
    console.log('isLogged', rest.isLogged);

    return (
        <Route
            {...rest}
            render={({location}) => rest.isLogged
                ? (children)
                // : (<Redirect to={paths.login} />)
                : (<Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }} />)
            }
        />
    );
}
