import {Navigate, Outlet} from 'react-router-dom'
import PropTypes from "prop-types";

export const ProtectedRoute = ({children, isAllowed, redirectTo="/login"}) => {

  if(!isAllowed){
    return <Navigate to={redirectTo}/>
  }
  return children ? children : <Outlet />
}

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
  children: PropTypes.element
};