import { Component } from "react";
import './index.css'

class Home extends Component{
    state = {
        page: 'home',     
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        username: '',
        password: '',
        error: ''
    }


    renderSignup = () => {
        this.setState({page: 'signup'})
    }

    renderLogin = () => {
        this.setState({page: 'login'})
    }

    renderHome = () => {
        this.setState({page: 'home'})
    }

    onSignup = async (event) => {
        event.preventDefault();
        const {firstName, lastName, username, email, dob, password} = this.state;
        const data = {
            'first_name': firstName,
            'last_name': lastName, 
            'username': username, 
            'email': email, 
            'dob': dob, 
            'password': password
        }
        const url = 'http://localhost:8000/signup/'
        const options = {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'cors'
        }
        const response = await fetch(url, options);        
        const resp = await response.json();                
        if(response.status === 200){
            this.setState({password: '', page: 'login', error: ''})
        } else {            
            if(resp.msg.includes('username')){
                this.setState({error: 'username not available'})
            } else if(resp.msg.includes('user')) {
                this.setState({error: 'user already exists'})
            } else {
                this.setState({error: 'something went wrong', page: 'home'})
            }
        }        
    }
    
    renderPage = () => {
        const {page, firstName, lastName, username, password, dob, email, error} = this.state;
        if(page === 'home'){
            return (
                <div>
                    <h1>Hello Welcome</h1>
                    <div className="home-input-container">
                        <input className="home-buttons" type="button" value='signup' onClick={this.renderSignup} />
                        <input className="home-buttons" type="button" value='login' onClick={this.renderLogin} />
                        {error && <p className="home-error">{error}</p>}
                    </div>
                </div>
            )
        } else if (page === 'signup') {
            return (
                <form className="inputs-container" onSubmit={this.onSignup}>
                    <h1>Signup</h1>
                    <input required className="home-inputs" type="text" value={firstName} placeholder="enter first name" onChange={e => this.setState({firstName: e.target.value})} />
                    <input required className="home-inputs" type="text" value={lastName} placeholder="enter last name" onChange={e => this.setState({lastName: e.target.value})} />                    
                    <input required className="home-inputs" type="date" value={dob} placeholder="date of birth" onChange={e => this.setState({dob: e.target.value})} />                                                   
                    <input required className="home-inputs" type="email" value={email} placeholder="enter email address" onChange={e => this.setState({email: e.target.value})} />     
                    <input required className="home-inputs" type="text" value={username} placeholder="enter username" onChange={e => this.setState({username: e.target.value})} />         
                    <input required className="home-inputs" type="password" value={password} placeholder="enter password" onChange={e => this.setState({password: e.target.value})} />         
                    <input type="submit" className="home-submit-button" value="Signup" />
                    <input type="button" className="home-back-button" value="Back" onClick={this.renderHome}/>
                    {error && <p className="home-error">{error}</p>}
                </form>
            )
        } else {
            return (
                <form className="inputs-container">
                    <h1>Login</h1>                     
                    <input required className="home-inputs" type="text" placeholder="enter username" onChange={e => this.setState({username: e.target.value})} />                   
                    <input required className="home-inputs" type="password" placeholder="enter password" onChange={e => this.setState({password: e.target.value})} />                                        
                    <input type="submit" className="home-submit-button" value="Login"  />
                    <input type="button" className="home-back-button" value="Back" onClick={this.renderHome}/>
                    {error && <p className="home-error">{error}</p>}
                </form>
            )
        }
    }
    render(){        
        return (
            <div className="home-container">
                <div className="home-card">
                  {this.renderPage()}                  
                </div>
            </div>
        );
    }
}

export default Home;