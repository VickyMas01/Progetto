import React from 'react';

export default class OrderBox extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                {this.props.order.lenght === 0 ? <div>Ancora nessun ordine effettuato</div> :
                    <div>
                        <h1>Ordine di {this.props.user}</h1>
                        <p>Prodotti ordinati : {this.props.order.products.map(e =>e.title).join(', ')}</p>
                        <p>Stato dell'ordine: {this.props.order.status}</p>
                        <p>Prezzo totale: {this.props.order.total}</p>
                    </div>}
            </div>
        )
    }
}