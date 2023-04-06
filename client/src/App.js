import './App.css';
import Register from './component/registration';
import Login from './component/login';
import { useState } from 'react';

function App() {
  const [loginTrue, setLoginTrue] = useState(false)
  const [signIn,setSignIn] = useState(false)

const login = ()=>{
setLoginTrue(true)
}
const handleSignIn=() =>{
  setSignIn(true)
}


  return (
    <div className="App">
      {
        loginTrue ? <Login setSignIn={handleSignIn}/> :   <Register setLogin={login}/>
      }
      {
        setSignIn && <div>Logged in</div>
      }
         
    </div>
  );
}

export default App;
