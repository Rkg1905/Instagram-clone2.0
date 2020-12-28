import React,{useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup=()=>{
    const history=useHistory()
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [image,setImage]= useState("")
    const [url,setUrl]=useState(undefined)

    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","rkg1905")
        fetch("https://api.cloudinary.com/v1_1/rkg1905/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)

        }).catch(err=>{
            console.log(err)
        })

    }

    const uploadFields=()=>{
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html:"invalid email",classes:"#b71c1c red darken-4"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password,
                pic:url
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
    const PostData=()=>{
        if(image){
            uploadPic()
        }
        else{
            uploadFields()
        }

    }

    return (
        <div>
            <div className="card auth-card">
                <h2>Instagram</h2>
                <input type="text" placeholder="username" value={name} onChange={(e)=>setName(e.target.value)} />
                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <div className="file-field input-field">
                <div className="btn #42a5f5 blue darken-1">
                    <span>Upload pic</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper ">
                        <input className="file-path validate" type="text"/>
                </div>
                </div>
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" onClick={()=>PostData()}>
                    Signup
                </button>
                <h5>
                    <Link to="/signin">Already have an account</Link>
                </h5>
            </div>

        </div>
    )
};

export default Signup