import React, {useEffect, useState} from 'react';
import Card from "../components/Card";
import {useContext} from "react";
import {AppContext} from "../App";
import Loader from "../components/UI/Loader/Loader";

const Profile = () => {

    const {isLoading, ordersList, gameInCartHandle, gameInWishlistHandle} = useContext(AppContext)

    // useEffect(()=>{
    //     async function fetchData() {
    //
    //         // setIsLoading(true)
    //     }
    //
    //     fetchData()
    // },[])

    return (
        <div className="catalog">
            <div className="catalog__header catalog__header_flex">
                <h1 className="catalog__title">Заказы</h1>
            </div>
            {isLoading ?
                <Loader/>
                :
                <>
                    {ordersList.length ?
                        ordersList.map((order, index) => {
                            let orderDate = new Date(order.date).toString().slice(4, 21);
                            return (
                                <>
                                    <div className="catalog__orderDate">Дата заказа: {orderDate} </div>
                                    <div className="cards">
                                        {order.items.map(item=>(
                                            <Card key={item.id}
                                                  id={item.id}
                                                  name={item.name}
                                                  imgPath={item.imgPath}
                                                  price={item.price}
                                            />
                                        ))}
                                    </div>
                                </>
                            )

                        })


                        : <div className='notFoundGame'>
                            Список заказов пуст
                        </div>
                    }
                </>

            }
        </div>
    );
};

export default Profile;