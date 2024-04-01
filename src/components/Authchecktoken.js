import {jwtDecode} from 'jwt-decode';

function AuthCheckToken(token) {
 try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return true;
    } else {
      return false;
    }
 } catch (err) {
    return false;
 }
}


export default AuthCheckToken;