import './registration.scss'
import React , {useState} from 'react';


function Login({setSignIn}){
    const [saveName, setSaveName] = useState(null);
    const [savePassword,setSavePassword] = useState(null);

    async function onSubmit(){
        try{
            const response = await fetch('http://localhost:5000/login',{
                method : "POST",
                body : JSON.stringify({
                    name: saveName,
                    password: savePassword
                }),
                headers : {"Content-type" : "application/json"}
            });
            
            const json = await response.json();
    
            if (response.ok){
                setSignIn();
            }
        }
        catch(error){
            console.log(error);
        }
    }
    

    return(
        <div className="form">
      <div className="title">Login</div>
      <div className="subtitle">Login your account</div>
      <div className="input-container ic1">
        <input id="firstname" className="input" type="text" placeholder=" " onChange={(e) =>  setSaveName(e.target.value)} />
        <div className="cut"></div>
        <label  className="placeholder">Name</label>
      </div>
      <div className="input-container ic1">
        <input id="firstname" className="input" type="password" placeholder=" "  onChange={(e) =>  setSavePassword(e.target.value)}  />
        <div className="cut"></div>
        <label  className="placeholder">Password</label>
      </div>
      <button type="text" className="submit" onClick={() => onSubmit()}>submit</button>
      </div>
    )
}

export default Login