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
