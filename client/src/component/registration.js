import './registration.scss'
import {useState} from 'react';

function Register({setLogin}){

 
 const [saveName,setSaveName] = useState(null);
 const [savePasssword,setSavePassword] = useState(null);
 const [saveAge,setSaveAge] = useState(null);
 const [saveEmail,setSaveEmail] = useState(null);
 const [savePhone,setSavePhone] = useState(null);


 async function HandleSave(){

    try{
        await fetch(`http://localhost:5000/api/users`,
        {
            method : "POST",
            body : JSON.stringify({
            name : saveName,
            password : savePasssword,
            age : saveAge,
            email : saveEmail,
            phone : savePhone,
            }),
            headers : {"Content-type": "application/json; charset=UTF-8"}
        }
        ).then(response => response.json()).then(json => console.log(json))

        setLogin()
    }
    catch(error){
        console.log(error)
    }
 }

 const handeLogin = ()=>{
  setLogin()
 }

        return(
        <div className="form">
      <div className="title">Welcome</div>
      <div className="subtitle">Let's create your account!</div>
      <p onClick={()=>handeLogin()}>I have an account, I'll login</p>
      <div className="input-container ic1">
        <input id="firstname" className="input" type="text" placeholder=" " onChange={(e) =>  setSaveName(e.target.value)} />
        <div className="cut"></div>
        <label  className="placeholder">Name</label>
      </div>
      <div className="input-container ic1">
        <input id="firstname" className="input" type="password" placeholder=" " onChange={(e) =>  setSavePassword(e.target.value)} />
        <div className="cut"></div>
        <label  className="placeholder">Password</label>
      </div>
      <div className="input-container ic2">
        <input id="lastname" className="input" type="number" placeholder=" " onChange={(e) => setSaveAge(e.target.value)} />
        <div className="cut"></div>
        <label  className="placeholder">Age</label>
      </div>
      <div className="input-container ic2">
        <input id="email" className="input" type="text" placeholder=" " onChange={(e) => setSaveEmail(e.target.value)} />
        <div className="cut cut-short"></div>
        <label  className="placeholder">Email</label>
      </div>
      <div className="input-container ic2">
        <input id="email" className="input" type="text" placeholder=" " onChange={(e) => setSavePhone(e.target.value)} />
        <div className="cut cut-short"></div>
        <label  className="placeholder" >Phone</label>
      </div>
      <button type="text" className="submit" onClick={() => HandleSave()}>submit</button>
    </div>
    )
}

export default Register