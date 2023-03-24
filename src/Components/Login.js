import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const getEdit3 = () => {
  let edit2 = localStorage.getItem("login");
 if(edit2){
  return edit2 = JSON.parse(edit2)
 }else{
  return []
}
}
const Login = ({time}) => {
  const [login, setLogin] = useState(getEdit3());
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [number, setNumber] = useState('');
  
  const [errors, setErrors] = useState({
    errorPwd: '',
    
  });
  const navigate = useNavigate();
  
  const handleSubmit = () => {
   
    const strongRegExp = /[a-z](?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    
    // console.log(">>.", lg);
    
    const strongPassword = strongRegExp.test(password);

    
    if (password.trim().length === 0) {
      errors.errorPwd = 'Required'
    } else if (password.length >= 8 && strongPassword) {
      delete errors.errorPwd
    } else {
      errors.errorPwd = 'Need Strong Password'
    }
    
    setErrors({ ...errors })
    // console.log("is error", errors)
    if (Object.keys(errors).length > 0) return
    
    setPassWord('');
    
 
  
  // e.preventDefault();
  let login1=JSON.parse(localStorage.getItem("login")) || []
  let lg=login1.filter((item)=> item.username == username && item.password == password);
  if(lg[0]?.username == username && lg[0]?.password == password){
    return navigate(`/todo/:${lg[0]?.id}`)
  }else{
    setLogin([{ username: username, password: password ,id:time}, ...login])
    
  }
}
  
  setTimeout(() => {
    
    navigate(`/todo/:${time}`);
  }, 10000);
  
  useEffect(() => {
    // if(localStorage.getItem("username")&& localStorage.getItem("password")){
    // navigate("/todo");
    const getData = async () => {
      await localStorage.setItem("login", JSON.stringify(login));
    }
  
    getData();
  }, [username, password, login]);



  return (
    <div className=''>
  <div className="my-5" style={{width: "50%", marginLeft: "300px"}}>
        <form  onSubmit={(event)=>event.preventDefault()}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username}
                 onChange={(e)=> setUserName(e.target.value)} />
            </div>
            <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="text" className="form-control" id="password" value={password} onChange={(e) => setPassWord(e.target.value)} title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' />
          {errors.errorPwd && <span style={{ color: 'red' }}>{errors.errorPwd}</span>}
        </div>
            {/* <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e)=> setPassWord(e.target.value)}/>
            </div> */}
            {/* <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div> */}
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
       {/* { <button type="button" className="btn btn-primary" onClick={submitFormHandler}><Link style={{color: "white", textDecoration: "none"}} to="/todo">Submit</Link></button> } */}
        </form>
    </div>
    </div>

  )
}

export default Login  