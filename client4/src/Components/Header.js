import React from 'react'
import Authorize from '../Services/services'
import style from '../Styles/navbar.module.css'

class Header extends React.Component{
        constructor(props){
                super(props)
                this.state = {
                        agent: this.props.username,
                        isAdmin:this.props.isAdmin,
                        isChef: this.props.isChef,
                }
                this.handleClick=this.handleClick.bind(this);
        }


        handleClick(){
            Authorize.endLog()
                .then(() => {
                    sessionStorage.removeItem('utente')
                    window.history.pushState({}, "", '/');
                    const pop = new PopStateEvent('popstate');
                    window.dispatchEvent(pop);
                })
        }


        render(){
                return(
                        <div className={style.contenitore}>
                        <ul className={style.navbar}>
                            <li className={style.logo}/>
                            <li className={style.client}>
                                    {this.state.isAdmin ? <span>Bentornato, {this.state.agent} - Admin</span> :
                                     this.state.isChef ? <span>Bentornato Chef {this.state.agent}</span> :
                                     <span>Bentornato, {this.state.agent}</span>
                                    }
                            </li>
                            <li>
                            {this.state.isAdmin ? <button className={style.ordine} onClick={this.handleOrdini}>Ultimi ordini</button> : 
                               this.state.isChef ? <button className={style.ordine} onClick={this.handleOrdini}>Ordini in arrivo</button> :
                               <span />
                               }
                            </li>
                            <li><button className={style.logout} onClick={this.handleClick}>Logout </button></li>
                        </ul>
                </div>
                )
        }




}

export default Header