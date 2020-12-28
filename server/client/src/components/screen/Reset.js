import React, {useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Reset=()=>{
    const history=useHistory()
    const [email,setEmail]=useState("")

    const PostData=()=>{
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
            })
        }).then(res=>res.json())
        .then(data=>{
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
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" onClick={()=>PostData()}>
                    Reset password
                </button>
            </div>

        </div>
    )
};

export default Reset