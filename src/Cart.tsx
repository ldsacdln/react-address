import React from "react"
import "./Cart.css"

export default function Cart(props: any){
    const name = props.contact.name;
    const address = props.contact.address;
    const urlPhotho = props.contact.photo; 
    return(
        <div className="cart">
            <div>
                <div className="contact-photo"></div>
            </div>
            <div>
                <div className="contact-name">
                    <h3>Name: </h3>{name}
                </div>
                <div className="contact-address">
                    <h3>Address: </h3> {address}
                </div>
            </div>
        </div>
    )
}