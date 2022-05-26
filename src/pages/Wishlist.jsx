import React from 'react';
import Card from "../components/Card";
import {useContext} from "react";
import {AppContext} from "../App";

const Wishlist = () => {
    const {wishlist,gameInCartHandle,gameInWishlistHandle} = useContext(AppContext)
    return (
        <div className="catalog">
            <div className="catalog__header" style={{minHeight:45}}>
                <h1 className="catalog__title">Список желаний</h1>
            </div>

            <div className="cards">

                {wishlist.length ?
                    wishlist.map((game) => (
                            <Card key={game.id}
                                  id={game.id}
                                  name={game.name}
                                  imgPath={game.imgPath}
                                  price={game.price}
                                  onClickAdd={gameInCartHandle}
                                  onClickWishlist={gameInWishlistHandle}
                            />
                        ))
                        :
                        <div className='notFoundGame'>
                            Список желаний пуст
                        </div>
                }
            </div>

        </div>
    );
};

export default Wishlist;