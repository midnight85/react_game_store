import React,{useContext, useEffect, useState} from 'react'
import {AppContext} from "../App";
import {Link} from "react-router-dom";

export default function Header({onClickCart}) {
    const {cartGames} = useContext(AppContext)
    const totalPrice=cartGames.reduce((sum,game)=>game.price + sum,0)

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__body">
                    <Link to="/" className="header__logo">
                        <img width="50" height="50" className="logo" src="/img/logo.png" alt="logo" />
                        <span><span className="blue">R</span>eact <span className="blue">G</span>ame <span className="blue">S</span>tore</span>
                    </Link>
                    <div className="header__actions">
                        <button className="header__actions-item cart" onClick={onClickCart}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.1416 3.00802C3.04394 3.00066 2.90841 3 2.65424 3H1C0.447715 3 0 2.55229 0 2C0 1.44772 0.447715 1 1 1H2.65424C2.66367 1 2.6731 1 2.68252 1C2.89719 0.999976 3.10972 0.99995 3.29187 1.01367C3.49456 1.02895 3.73005 1.06482 3.97366 1.17349C4.31651 1.32642 4.60939 1.57276 4.81881 1.88434C4.96761 2.10573 5.0433 2.33159 5.09308 2.52866C5.13781 2.70576 5.1742 2.91516 5.21095 3.12665C5.21257 3.13594 5.21418 3.14523 5.2158 3.15452L5.45407 4.52459L18.4681 4.90982C18.978 4.9249 19.4188 4.93793 19.7817 4.9779C20.1654 5.02015 20.5457 5.0996 20.9106 5.29398C21.4634 5.58852 21.9102 6.04874 22.1883 6.61008C22.3718 6.98053 22.4399 7.36306 22.4708 7.74778C22.5 8.11176 22.5 8.55266 22.5 9.06286V9.13661C22.5 9.61608 22.5 10.032 22.4732 10.3769C22.4447 10.7426 22.3819 11.1059 22.2143 11.4619C21.9593 12.0037 21.5479 12.4568 21.0332 12.7628C20.695 12.9639 20.3395 13.0614 19.9782 13.125C19.6375 13.185 19.2235 13.225 18.7463 13.2712L9.01239 14.2132C8.5232 14.2605 8.09935 14.3015 7.74572 14.3078C7.37105 14.3144 6.99541 14.2853 6.61828 14.1467C6.05271 13.939 5.5628 13.5657 5.21236 13.0756C4.97869 12.7487 4.85092 12.3943 4.75782 12.0313C4.66995 11.6887 4.59701 11.2692 4.51282 10.785L3.24537 3.4972C3.20182 3.24679 3.17795 3.11338 3.15397 3.01842C3.15312 3.01505 3.15229 3.01185 3.1515 3.00881C3.14837 3.00855 3.14507 3.00828 3.1416 3.00802ZM5.80385 6.53582L6.47694 10.4061C6.56924 10.9368 6.62925 11.2776 6.69512 11.5344C6.75794 11.7794 6.80763 11.8681 6.83929 11.9123C6.9561 12.0757 7.11941 12.2001 7.30793 12.2694C7.35903 12.2882 7.45772 12.3125 7.71054 12.3081C7.97562 12.3034 8.32011 12.2708 8.85632 12.2189L18.5177 11.2839C19.0411 11.2333 19.3768 11.2001 19.6316 11.1553C19.8743 11.1126 19.9649 11.0712 20.0111 11.0438C20.1826 10.9417 20.3198 10.7907 20.4048 10.6101C20.4277 10.5615 20.4601 10.4673 20.4792 10.2216C20.4993 9.96369 20.5 9.62638 20.5 9.10051C20.5 8.54201 20.4993 8.18214 20.4772 7.90781C20.4562 7.64531 20.4204 7.5469 20.3961 7.49781C20.3034 7.3107 20.1545 7.15729 19.9702 7.05911C19.9218 7.03336 19.8245 6.99471 19.5628 6.96588C19.2892 6.93575 18.9295 6.92435 18.3713 6.90783L5.80385 6.53582Z" fill="#1E212C" />
                                <path d="M8.5 17.5C7.94772 17.5 7.5 17.9477 7.5 18.5C7.5 19.0523 7.94772 19.5 8.5 19.5C9.05228 19.5 9.5 19.0523 9.5 18.5C9.5 17.9477 9.05228 17.5 8.5 17.5ZM5.5 18.5C5.5 16.8431 6.84315 15.5 8.5 15.5C10.1569 15.5 11.5 16.8431 11.5 18.5C11.5 20.1569 10.1569 21.5 8.5 21.5C6.84315 21.5 5.5 20.1569 5.5 18.5Z" fill="#1E212C" />
                                <path d="M18 17.5C17.4477 17.5 17 17.9477 17 18.5C17 19.0523 17.4477 19.5 18 19.5C18.5523 19.5 19 19.0523 19 18.5C19 17.9477 18.5523 17.5 18 17.5ZM15 18.5C15 16.8431 16.3431 15.5 18 15.5C19.6569 15.5 21 16.8431 21 18.5C21 20.1569 19.6569 21.5 18 21.5C16.3431 21.5 15 20.1569 15 18.5Z" fill="#1E212C" />
                            </svg>
                            <span className="totalPrice">{totalPrice} ₴</span>
                        </button>
                        <Link to={'/wishlist'} className="header__actions-item wishlist">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9994 19.9072C7.4003 17.2878 4.83525 14.6843 3.59488 12.4254C2.32537 10.1134 2.43614 8.16615 3.14059 6.7841C4.58857 3.94337 8.70616 3.03499 11.2149 6.20797L11.9993 7.20002L12.7837 6.20802C15.2929 3.03491 19.4108 3.94344 20.8587 6.7841C21.5632 8.16613 21.6739 10.1134 20.4043 12.4254C19.1638 14.6843 16.5986 17.2878 11.9994 19.9072ZM11.9994 4.10589C8.47019 0.752278 3.26381 2.13832 1.35872 5.87584C0.313178 7.92706 0.298896 10.5782 1.84178 13.388C3.37099 16.173 6.41989 19.1125 11.5156 21.929L11.9993 22.1964L12.4831 21.9291C17.579 19.1126 20.6281 16.173 22.1574 13.3881C23.7004 10.5782 23.6861 7.92708 22.6406 5.87584C20.7355 2.13825 15.5289 0.752328 11.9994 4.10589Z" fill="#1E212C" />
                            </svg>
                        </Link>
                        <button className="header__actions-item profile">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0001 3.25C10.0671 3.25 8.50009 4.817 8.50009 6.75C8.50009 8.683 10.0671 10.25 12.0001 10.25C13.9331 10.25 15.5001 8.683 15.5001 6.75C15.5001 4.817 13.9331 3.25 12.0001 3.25ZM6.50009 6.75C6.50009 3.71243 8.96252 1.25 12.0001 1.25C15.0377 1.25 17.5001 3.71243 17.5001 6.75C17.5001 9.78757 15.0377 12.25 12.0001 12.25C8.96252 12.25 6.50009 9.78757 6.50009 6.75Z" fill="#1E212C" />
                                <path d="M6.10415 15.25C5.41083 15.25 4.86892 15.5876 4.64895 16.0726C4.34449 16.7439 4.06879 17.5432 4.00373 18.3012C3.97464 18.64 4.11593 18.8897 4.31061 19.0107C5.33977 19.65 7.72448 20.75 12.0001 20.75C16.2757 20.75 18.6604 19.65 19.6896 19.0107C19.8842 18.8897 20.0255 18.64 19.9964 18.3012C19.9314 17.5432 19.6557 16.7439 19.3512 16.0726C19.1313 15.5876 18.5894 15.25 17.896 15.25H6.10415ZM2.82752 15.2466C3.43546 13.9061 4.793 13.25 6.10415 13.25H17.896C19.2072 13.25 20.5647 13.9061 21.1727 15.2466C21.5218 16.0165 21.8965 17.0515 21.9891 18.1301C22.0734 19.1124 21.6652 20.1379 20.7449 20.7096C19.3914 21.5504 16.6397 22.75 12.0001 22.75C7.36049 22.75 4.60879 21.5504 3.25525 20.7096C2.33499 20.1379 1.92675 19.1124 2.01105 18.1301C2.10363 17.0515 2.47833 16.0165 2.82752 15.2466Z" fill="#1E212C" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}