import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'


const CreatePost = ()=>{
    const history=useHistory();
    const[title,setTitle]=useState("");
    const[body,setBody]=useState("");
    const[image,setImage]=useState("");
    const[url,setUrl]=useState("");
    React.useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    image:url
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"#b71c1c red darken-4"})
                }
                else{
                    M.toast({html:"created post",classes:"#b71c1c green darken-4"})
                    history.push('/')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const postDetails=()=>{
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


    return(
        <div className="card input-field">
            <input type="text"  placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" placeholder="body"value={body} onChange={(e)=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn #42a5f5 blue darken-1">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper ">
                        <input className="file-path validate" type="text"/>
                </div>
                <button className="btn waves-effect waves-light #42a5f5 blue darken-1" onClick={()=>postDetails()}>
                    Post it!
                </button>
            </div>

        </div>
    )
}

export default CreatePost