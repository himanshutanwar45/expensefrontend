
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import Login from './components/Login';
import { useState } from 'react';
import Expenses from './components/Expenses';
import Profile from './components/Profile';
import Reports from './components/Reports';

function App() {

  const [notify, setNotify] = useState([]);

  const showAlert = (type, message) => {

    switch (type) {
      case 'info':
        return setNotify(toast.info(message))

      case 'error':
        return setNotify(toast.error(message))

      case 'success':
        return setNotify(toast.success(message))

      case 'warning':
        return setNotify(toast.warn(message))

      default:
        return setNotify(toast(message))
    }
  }

  const [progress, setProgress] = useState(0)

  return (
    <>
      <Router>
        <Navbar></Navbar>
        <ToastContainer notify={notify} closeOnClick stacked draggable ></ToastContainer>
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route exact path = '/' element={<Login showAlert={showAlert} setProgress={setProgress}></Login>}></Route>
        <Route exact path = '/expense' element={<Expenses showAlert={showAlert} setProgress={setProgress}></Expenses>}></Route>
        <Route exact path = '/profile' element={<Profile showAlert={showAlert} setProgress={setProgress}></Profile>}></Route>
        <Route exact path = '/reports' element={<Reports setProgress={setProgress}></Reports>}></Route>
      </Routes>
      </Router>
    </>
  );
}

export default App;
