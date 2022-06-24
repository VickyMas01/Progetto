import React from 'react';
import Authorize from '../Services/services'
import style from '../Styles/registration.module.css'

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            isAdmin:'',
            isChef:''
        };

        this.handleChange=this.handleChange.bind(this);
        this.handleRegister=this.handleRegister.bind(this);
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    handleRegister(e){
        e.preventDefault();
        const user= {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            isAdmin: false,
            isChef: false
        };
        Authorize.registerUser(user)
            .then(() => {
                window.history.pushState({}, "", '/');
                const pop = new PopStateEvent('popstate');
                window.dispatchEvent(pop);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
             <p className={style.logo}/>
            
            <div className={style.container}>
               <h1 className={style.title}>Registrati subito ed effettua il tuo primo ordine !</h1>
                
                <form onSubmit={this.handleRegister}>
                    <div className={style.name} >
                        <label htmlFor='username'>Username </label><br/>
                        
                        <input className={style.nIn} placeholder="Username" type="text" required
                                onChange={this.handleChange} value={this.state.username} name="username"/>
                    </div>
                   
                    <div>
                        <label className={style.email}htmlFor='email'>Email </label><br/>
                        
                        <input className={style.eIn}  placeholder="Email" type="text" required
                                onChange={this.handleChange} value={this.state.email} name="email"/>
                    </div>
                    
                    <div>
                        <label className={style.password} htmlFor='password'>Password: </label>
                        <br/>
                        <input className={style.pIn} placeholder="Password" type="password" required
                               onChange={this.handleChange} value={this.state.password} name="password"/>
                    </div>
                    
                    <div>
                        <input className={style.submit} type="submit" value="Registrati" /><br/>
                        <a href="/" onClick={this.handleReturn}>Torna al login</a>
                    </div>
                </form>

                
           
            </div>
            </>
        );
    }
}

export default Registration;