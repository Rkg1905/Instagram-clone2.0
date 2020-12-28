import React,{useEffect,createContext, useReducer, useContext} from 'react'
import './App.css';
import { BrowserRouter,Route,Switch,useHistory } from 'react-router-dom'
import NavBar from './components/Navbar'
import Home from './components/screen/Home'
import Profile from './components/screen/Profile'
import Signin from './components/screen/Signin'
import Signup from './components/screen/Signup'
import CreatePost from './components/screen/CreatePost'
import {reducer,initialiState} from './reducers/userReducer'
import UserProfile from './components/screen/UserPorfile'
import SubscribesUserPosts from './components/screen/SubscribesUserPosts'
import Reset from './components/screen/Reset';
import NewPassword from './components/screen/NewPassword';

export const UserContext= createContext();


const Routing =()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route path="/home"><Home/></Route>
      <Route path="/signin"><Signin/></Route>
      <Route path="/signup"><Signup/></Route>
      <Route exact path="/Profile"><Profile/></Route>
      <Route path="/createpost"><CreatePost/></Route>
      <Route path="/Profile/:userid"><UserProfile/></Route>
      <Route path="/myfollowingpost"><SubscribesUserPosts/></Route>
      <Route exact path="/reset"><Reset/></Route>
      <Route path="/reset/:token"><NewPassword/></Route>
    
    </Switch>
  )
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialiState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar/>
      <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
