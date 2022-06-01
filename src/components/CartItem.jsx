import React from 'react'

export default function CartItem({id, name, imgPath, price, onGameRemove }) {
    return (
        <article className="cartItem">
            <div className="cartItem__img">
                <img src={process.env.PUBLIC_URL + imgPath} alt='game-img' />
            </div>
            <div className="cartItem__body">
                <div className="cartItem__name">{name}</div>
                <div className="cartItem__price">{price} ₴</div>
            </div>
            <button className="cartItem__removeBtn"
                onClick={() => {
                    onGameRemove({ id, name, imgPath, price })
                }}>
                <svg className="crossIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#1E212C" />
                </svg>
            </button>
        </article>
    )
}
