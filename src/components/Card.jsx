import React, {useContext, useEffect, useState} from 'react'
import {ReactComponent as AddIcon} from '../assets/img/plus.svg'
import {ReactComponent as CheckIcon} from '../assets/img/mark.svg'
import {ReactComponent as Heart} from '../assets/img/heart.svg'
import {ReactComponent as HeartFilled} from '../assets/img/heart-filled.svg'
import {AppContext} from "../App";


export default function Card({id, name, imgPath, price, onClickAdd, onClickWishlist}) {

    const {cartGames, wishlist} = useContext(AppContext)
    const [isCartAdded, setIsCartAdded] = useState()
    const [isWishlistAdded, setIsWishlistAdded] = useState()

    useEffect(() => {
        const isGameInCart = (cartGames.some((item) => item.id === id))
        setIsCartAdded(isGameInCart)

        const isGameInWishlist = (wishlist.some((item) => item.id === id))
        setIsWishlistAdded(isGameInWishlist)
    })
    const addClickHandle = () => {
        onClickAdd({id, name, imgPath, price}, isCartAdded)
    }
    const wishlistClickHandle = () => {
        onClickWishlist({id, name, imgPath, price}, isWishlistAdded)
    }

    return (
        <article className="card">
            <div className="card__top">
                {
                    onClickWishlist &&
                    <button className="card__wishlistBtn"
                            onClick={wishlistClickHandle}
                            style={isWishlistAdded ? {backgroundColor: '#eca7b2'} : {backgroundColor: 'rgba(255,255,255,0.3)'}}
                    >
                        {isWishlistAdded ? <HeartFilled/> : <Heart/>}
                    </button>
                }

                <div className="card__img">
                    <img src={imgPath} alt="game"/>
                </div>
            </div>
            <div className="card__body">
                <div className="card__name">{name}</div>
                <div className="card__actions">
                    <div className="card__price">{price} ₴</div>
                    {
                        onClickAdd &&
                        <button className="card__addBtn"
                                onClick={addClickHandle}
                                style={isCartAdded ? {backgroundColor: '#7cd97f'} : {backgroundColor: '#fff'}}
                        >
                            {isCartAdded ? <CheckIcon/> : <AddIcon/>}
                        </button>
                    }

                </div>
            </div>
        </article>


    )
}
