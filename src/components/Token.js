
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

let userData = token ? jwtDecode(token) : null;

export {userData}