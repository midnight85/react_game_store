import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../App";
import {Link, NavLink} from "react-router-dom";

export default function Header({onClickCart, cartOpened}) {
    const {cartGames} = useContext(AppContext)
    const totalPrice = cartGames.reduce((sum, game) => game.price + sum, 0)

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__body">
                    <Link to="/" className="header__logo">
                        <img width="50" height="50" className="logo" src="/img/logo.png" alt="logo"/>
                        <span><span className="blue">R</span>eact <span className="blue">G</span>ame <span
                            className="blue">S</span>tore</span>
                    </Link>
                    <div className="header__actions">
                        <button className={"header__actions-item cart " + (cartOpened ? "icon-cart-filled" : "icon-cart")}
                                onClick={onClickCart}>
                            <span className="totalPrice ">{totalPrice} ₴</span>
                        </button>
                        <NavLink to='/wishlist' className={({isActive}) => `header__actions-item wishlist  ${isActive ? "active-page icon-heart-filled" : "icon-heart"}`} >
                        </NavLink>
                        <NavLink to='/profile' className={({isActive}) => `header__actions-item profile ${isActive ? "active-page icon-profile-filled" : "icon-profile-outline"}`} >
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    )
}
