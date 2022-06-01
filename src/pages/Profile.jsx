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
                <h1 className="catalog__title">Заказы ({ordersList.length} шт.)</h1>
            </div>
            {isLoading ?
                <Loader/>
                :
                <>
                    {ordersList.length ?
                        ordersList.map((order, index) => {
                            const orderDate = new Date(order.date).toString().slice(4, 21);
                            const orderTotalPrice = order.items.reduce((sum,item)=> item.price + sum,0)
                            console.log(orderTotalPrice)
                            return (
                                <div key={index} className="order-item">
                                    <div className="order-info">
                                        <div key={index} className="order-info-item">Дата заказа: {orderDate} </div>
                                        <div key={index} className="order-info-item">Сума заказа: {orderTotalPrice} ₴</div>
                                    </div>
                                    <div className="cards">
                                        {order.items.map((item,index)=>(
                                            <Card key={index}
                                                  id={item.id}
                                                  name={item.name}
                                                  imgPath={item.imgPath}
                                                  price={item.price}
                                            />
                                        ))}
                                    </div>
                                </div>
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