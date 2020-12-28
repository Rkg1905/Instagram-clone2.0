import React, {useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Signin=()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const PostData=()=>{
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#b71c1c red darken-4"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"user signin successfully",classes:"#b71c1c green darken-4"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" onClick={()=>PostData()}>
                    Signin
                </button>
                <h5>
                    <Link to="/signup">Don't have an account</Link>
                </h5>
            </div>

        </div>
    )
};

export default Signin