import React, {useContext, useEffect, useState} from 'react'
import CartItem from '../CartItem/CartItem'
import {AppContext} from "../../App";

export default function Drawer({ onClickClose, onGameRemove }) {
    // const [cartItem, setcartItem] = useState([

    //     {
    //         name: 'God of war',
    //         imgPath: '/img/games/god_of_war.webp',
    //         price: 1199
    //     },
    //     {
    //         name: 'Red Dead Redemption 2',
    //         imgPath: '/img/games/RDR2.jpg',
    //         price: 899
    //     },
    //     {
    //         name: 'STAR WARS Jedi: Fallen Order',
    //         imgPath: '/img/games/SWJFO.webp',
    //         price: 1199
    //     },
    //     {
    //         name: 'Days Gone',
    //         imgPath: '/img/games/days_gone.webp',
    //         price: 999
    //     },

    // ])
    const {cartGames} = useContext(AppContext)
    const totalPrice=cartGames.reduce((sum,game)=>game.price + sum,0)
    return (
        <div className="overlay">
            <div className="drawer">
                <div className="drawer__header">
                    <div className="drawer__title">
                        Корзина
                    </div>
                    <button className="close__btn" onClick={onClickClose}>
                        <svg className="crossIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#1E212C" />
                        </svg>
                    </button>
                </div>
                {cartGames.length ?
                    <>
                        <div className="drawer__body">
                            {
                                cartGames.map((game) => (
                                    <CartItem key={game.name}
                                        id={game.id}
                                        name={game.name}
                                        imgPath={game.imgPath}
                                        price={game.price}
                                        onGameRemove={onGameRemove}
                                    />))
                            }
                        </div>
                        <div className="drawer__footer">
                            <div className="drawer__totalPrice"><span>Общая сумма:</span><b>{totalPrice} ₴</b></div>
                            <button className="drawer__orderBtn">Оформить заказ</button>
                        </div>
                    </>
                    :
                    <div className='drawer__empty'>
                        <span>Корзина пустая!</span>
                    </div>
                }
            </div>
        </div>
    )
}
