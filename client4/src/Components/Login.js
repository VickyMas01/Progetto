import React from 'react';
import Authorize from '../Services/services'
import style from '../Styles/login.module.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            error:'',
        };

        this.handleChange=this.handleChange.bind(this);
        this.onClick=this.onClick.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }



    handleLogin(e){
        e.preventDefault()
        const user={
            username: this.state.username,
            password: this.state.password
        }
        Authorize.requestLogin(user)
            .then((res => {
                if(!res.ok){
                    this.setState({error:true})
                    throw new Error('Http error' + res.status) }
                return res.json()
            }))
            .then(data => data)
            .then(data => {
                sessionStorage.setItem('utente',JSON.stringify(data));
                if (data.isAdmin && !data.isChef){
                    window.history.pushState({}, "", '/admin');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
                } else if (data.isChef && !data.isAdmin) {
                    window.history.pushState({}, "", '/chef');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
                }else if(!data.isChef && !data.isAdmin) {
                    window.history.pushState({}, "", '/client');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
            }
        })
            .catch(err => console.log(err));

    }




    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }



    onClick(e){
        e.preventDefault();
        window.history.pushState({}, "", '/registration');
        const pop = new PopStateEvent('popstate');
        window.dispatchEvent(pop);
    }



    render() {
        return (
            <>
                  <p className={style.logo} />
            
            <div className={style.container}>
                
            <h1 className={style.title}>Benvenuto, effettua l'accesso: </h1> 
                <form onSubmit={this.handleLogin}>
                    <div >
                        <label className={style.name} htmlFor='username'>Username </label>
                        <br/>
                        <input className={style.nIn} placeholder="Username" type="text" required
                               onChange={this.handleChange} value={this.state.username} name="username"/>
                    </div>
                    <br/>
                    <div>
                        <label className={style.password} htmlFor='password'>Password </label>
                        <br/>
                        <input className={style.pIn} placeholder="Password" type="password" required
                               onChange={this.handleChange} value={this.state.password} name="password"/>
                    </div>
                    <br/>
                    <div>
                        <input className={style.submit} type="submit" value="Accedi" />
                    </div>
                    <br/>
                    {(this.state.error) &&
                     <p  className={style.error}>Utente o Password incorretti, riprova </p>}

                    <p>Se non sei ancora registrato: &nbsp;
                        <a href='/registration' onClick={this.onClick}>Clicca qui</a>
                    </p>
                    <br/>
                        
                   
                </form>

            </div>
            </>
        );
    }
}

export default Login;




