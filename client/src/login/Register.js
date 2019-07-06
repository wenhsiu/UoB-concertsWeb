import React from 'react';
import './sidebar.css';
import Datepicker from './Datepicker';

class Register extends React.Component{

    state = {
        account: "",
        password: "",
        hint:""
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    handleClick = (e) => {
        e.preventDefault()					
        axios.post('/UserRegister', this.state)
        .then(function(response){
            console.log(response);
            
            if(response.status === 200) {//add username into cookie
                let d = new Date();
                d.setTime(d.getTime() + (24*60*60*1000));
                let expire = "expires=" + d.toUTCString();
                document.cookie = "username=" + response.data + ";" + expire + "path=/;";

                window.location.href="/mainpage.html";
            }
        })
        .catch(function(error){
            window.location.reload();
            console.log(error);
        });

        
    }
    handleACChange = (e) => {
        this.setState({account: e.target.value})						
    }
    handlePWChange = (e) => {
        this.setState({password: e.target.value})						
    }
    handleHTChange = (e) => {
        this.setState({hint: e.target.value})                       
    }
    render(){
        return(
            <div className="box">					
                <header>
                    <h1 className="title">Register</h1>
                </header>
                
                <div className="Userinfo">
                    <form onKeyPress={this.handleKeyPress}>
                        <input className="username" type="text" placeholder="Username" onChange={this.handleACChange}/>
                        <i className="fas fa-user username_icon "></i>
                    </form>
                    <form onKeyPress={this.handleKeyPress}>
                        <input className="password" type="password" placeholder="Password" onChange={this.handlePWChange}/>
                        <i className="fas fa-lock password_icon"></i>
                    </form>
                    <form onKeyPress={this.handleKeyPress}>
                        <input className="hint" type="text" placeholder="Password hint" onChange={this.handleHTChange}/>
                        <i className="fas fa-bell hint_icon"></i>
                    </form>
                    <div>
                        <input className="button" type="button" value="Join" onClick={this.handleClick} />
                    </div>
                </div>
                
                <div className="old_member">
                    <span>Already a member?</span>
                    <a href="login.html">Sign in!</a>
                </div>
            </div>
        )
    }
}

export default Register;
