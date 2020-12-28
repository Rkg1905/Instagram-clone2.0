import React, {useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
import M from 'materialize-css'

const Signin=()=>{
    const history=useHistory()
    const [password,setPassword]=useState("")
    const {token}=useParams()
    console.log(token)
    const PostData=()=>{
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html:data.error,classes:"#b71c1c red darken-4"})
            }
            else{

                M.toast({html:data.message,classes:"#b71c1c green darken-4"})
                history.push('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="password" placeholder="Enter a new password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" onClick={()=>PostData()}>
                    Update Password
                </button>
                
            </div>

        </div>
    )
};

export default Signin