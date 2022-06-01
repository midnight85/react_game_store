import React, {useContext} from 'react';
import Card from "../components/Card";
import {AppContext} from "../App";
import Loader from "../components/UI/Loader/Loader";

const Wishlist = () => {
    const {isLoading, wishlist, gameInCartHandle, gameInWishlistHandle} = useContext(AppContext)


    return (
        <div className="catalog">
            <div className="catalog__header catalog__header_flex">
                <h1 className="catalog__title">Список желаний</h1>
            </div>

            {isLoading ?
                <Loader/>
                :
                <>
                    {wishlist.length ?
                        <div className="cards">
                            {wishlist.map((game) => (
                                <Card key={game.id}
                                      id={game.id}
                                      name={game.name}
                                      imgPath={game.imgPath}
                                      price={game.price}
                                      onClickAdd={gameInCartHandle}
                                      onClickWishlist={gameInWishlistHandle}
                                />
                            ))
                            }
                        </div>

                        : <div className='notFoundGame'>
                            Список желаний пуст
                        </div>
                    }
                </>

            }

        </div>
    );
};

export default Wishlist;