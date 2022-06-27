import React from 'react'
import Services from '../Services/services'
import Order from '../Components/Order'



let counter=0;

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders1: [],
            orders2: [],
            hideComplete:true
        }


        this.handleShow = this.handleShow.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.handleShow()
    }

    handleShow() {
        Services.getOrders()
            .then(data => {
                    let p1 = [];
                    let o1 = [];
                    let o2 = [];
                    let p2 = [];
                    console.log(data)
                    data.forEach((el) => {
                        console.log(el)
                        if (el.taken === 'pending') {
                            o1.push(el)
                            p1 = el.products.map(e => e.title)
                        } else {
                            o2.push(el);
                            p2 = el.products.map(e => e.title)
                        }
                    })
                    this.setState({
                        orders1: [o1.map(e => <>
                                <Order user={e.user} products={p1} status={e.taken} price={e.total} id={e._id}
                                       onChange1={this.props.onChange1} onChange2={this.props.onChange2} acceptor={true}/>
                            </>
                        )],
                        orders2: [o2.map(e => <>
                            <Order user={e.user} products={p2} status={e.taken} price={e.total} id={e._id} onChange3={this.props.onChange3} acceptor={false}/>
                        </>)]
                    })
                }
            )
            .catch(e => console.log(e))
    }


    handleClick() {
        counter++
        const op = counter % 2;
        if (op === 1) {
            this.setState({hideComplete: false});
        } else {
            this.setState({hideComplete: true});

        }

    }


    render() {
        return (
            <div>
                {this.state.orders1.length > 0 ?
                this.state.orders1 :
                <p>Nessun ordine nuovo</p>}
                <button onClick={this.handleClick}>Mostra ordini da completare ed eliminare</button>
                {this.state.hideComplete ? <></> :
                this.state.orders2.length > 0 ?
                    this.state.orders2 :
                    <p>Nessun ordine da confermare</p>}
            </div>

        )
    }
}

