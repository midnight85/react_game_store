import React, { useState } from 'react'
import { ReactComponent as AddIcon } from '../../assets/img/plus.svg'
import { ReactComponent as CheckIcon } from '../../assets/img/mark.svg'


export default function Card({id, name, imgPath, price, onClickAdd, isInCart }) {

    const [isCartAdded, setIsCartAdded] = useState(isInCart)
    const addClickHandle = () => {
        setIsCartAdded(!isCartAdded)
        onClickAdd({ id, name, imgPath, price }, isCartAdded)
    }

    return (
            <article className="card">
                <div className="card__top">
                    <button className="card__wishlistBtn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9994 19.9072C7.4003 17.2878 4.83525 14.6843 3.59488 12.4254C2.32537 10.1134 2.43614 8.16615 3.14059 6.7841C4.58857 3.94337 8.70616 3.03499 11.2149 6.20797L11.9993 7.20002L12.7837 6.20802C15.2929 3.03491 19.4108 3.94344 20.8587 6.7841C21.5632 8.16613 21.6739 10.1134 20.4043 12.4254C19.1638 14.6843 16.5986 17.2878 11.9994 19.9072ZM11.9994 4.10589C8.47019 0.752278 3.26381 2.13832 1.35872 5.87584C0.313178 7.92706 0.298896 10.5782 1.84178 13.388C3.37099 16.173 6.41989 19.1125 11.5156 21.929L11.9993 22.1964L12.4831 21.9291C17.579 19.1126 20.6281 16.173 22.1574 13.3881C23.7004 10.5782 23.6861 7.92708 22.6406 5.87584C20.7355 2.13825 15.5289 0.752328 11.9994 4.10589Z" fill="#1E212C" />
                        </svg>
                    </button>
                    <div className="card__img">
                        <img src={imgPath} alt="game" />
                    </div>
                </div>
                <div className="card__body">
                    <div className="card__name">{name}</div>
                    <div className="card__actions">
                        <div className="card__price">{price} ₴</div>
                        <button className="card__addBtn"
                            onClick={addClickHandle}
                            style={isCartAdded ? { backgroundColor: '#7cd97f' } : { backgroundColor: '#fff' }}
                        >
                            {isCartAdded ? <CheckIcon /> : <AddIcon />}


                        </button>
                    </div>
                </div>
            </article>




    )
}
