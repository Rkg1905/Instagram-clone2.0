import React, { useEffect,useContext } from 'react';
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App';
const NavBar=()=>{
    const {state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const renderList=()=>{

        if(state){
            return[
                <li><Link to="/myfollowingpost">following posts</Link></li>,
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/createpost">Create Post</Link></li>,
                <li><button className="btn blue" 
                    onClick={()=>{localStorage.clear()
                    dispatch({type:"CLEAR"}); history.push('/singin')}} >Logout</button>                   
                </li>
            ]
        }
        else{
            return[
                <li><Link to="/signin">signin</Link></li>,
                <li><Link to="/signup">signup</Link></li>
            ]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
            <Link to={state?"/":"/signin"} className="brand-logo left">instagram</Link>
            <ul id="nav-mobile" className="right">
                {renderList()}              
            </ul>
            </div>
        </nav>
    )
}

export default NavBar