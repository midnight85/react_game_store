import React, {createContext, useEffect, useState} from 'react'
// import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home"
import Wishlist from "./pages/Wishlist";
import {initializeApp} from "firebase/app";
import {
    collection,
    deleteDoc,
    doc,
    addDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    setDoc,
    orderBy
} from 'firebase/firestore'
import {firebaseConfig} from './firebaseConfig';
import {Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";
import Profile from "./pages/Profile";

initializeApp(firebaseConfig);
const db = getFirestore();

const gamesColRef = collection(db, 'games');
const cartColRef = collection(db, 'cart');
const wishlistColRef = collection(db, 'wishlist');
const ordersColRef = collection(db, 'orders');

const cartDocRef = (id) => (doc(db, 'cart', id));
const wishlistDocRef = (id) => (doc(db, 'wishlist', id));
const ordersDocRef = (id) => (doc(db, 'orders', id));

export const AppContext = createContext({})


Routes.propTypes = {children: PropTypes.node};

function App() {

    const [isLoading, setIsLoading] = useState(true)
    const [games, setGames] = useState([

        // {
        //     "imgPath": "/img/games/WatchDogs_Legion.webp",
        //     "name": "Watch Dogs: Legion",
        //     "price": 915,
        //     "id": "6xq3tfsiaK4xhxMwjGd8"
        // },
        // {
        //     "imgPath": "/img/games/far_cry_6.webp",
        //     "name": "Far Cry 6",
        //     "price": 915,
        //     "id": "DC9Hx59uqgZFD0cK5hAq"
        // },
        // {
        //     "price": 899,
        //     "imgPath": "/img/games/RDR2.jpg",
        //     "name": "Red Dead Redemption 2",
        //     "id": "SWDvE9V5BNiw0IVckqy4"
        // },
        // {
        //     "price": 999,
        //     "imgPath": "/img/games/days_gone.webp",
        //     "name": "Days Gone",
        //     "id": "WxODeHP98LlbsgWSZP0X"
        // },
        // {
        //     "price": 915,
        //     "name": "Assassin\"s Creed Valhalla",
        //     "imgPath": "/img/games/ac_valhalla.webp",
        //     "id": "e4mGAbHEbovV8VqASJdK"
        // },
        // {
        //     "name": "STAR WARS Jedi: Fallen Order",
        //     "imgPath": "/img/games/SWJFO.webp",
        //     "price": 1199,
        //     "id": "ks7rmWjWNJEBZfNDCTRH"
        // },
        // {
        //     "name": "Horizon Zero Dawn™",
        //     "imgPath": "/img/games/horizon.webp",
        //     "price": 999,
        //     "id": "pSvjbXxe52Vymd0GPO7f"
        // },
        // {
        //     "name": "God of war",
        //     "price": 1199,
        //     "imgPath": "/img/games/god_of_war.webp",
        //     "id": "pi43rZZSsokWmZczA7Hg"
        // },
        // {
        //     "imgPath": "/img/games/DeathStranding.webp",
        //     "name": "DEATH STRANDING",
        //     "price": 1209,
        //     "id": "yzyjLDmVcu1E83mJ5JRB"
        // }
        // {
        //     "name": "Far Cry 6",
        //     "imgPath": "/img/games/far_cry_6.webp",
        //     "price": 915
        // },
        // {
        //     "name": "God of war",
        //     "imgPath": "/img/games/god_of_war.webp",
        //     "price": 1199
        // },
        // {
        //     "name": "Assassin\"s Creed Valhalla",
        //     "imgPath": "/img/games/ac_valhalla.webp",
        //     "price": 915
        // },
        // {
        //     "name": "Horizon Zero Dawn™",
        //     "imgPath": "/img/games/horizon.webp",
        //     "price": 999
        // },
        // {
        //     "name": "Red Dead Redemption 2",
        //     "imgPath": "/img/games/RDR2.jpg",
        //     "price": 899
        // },
        // {
        //     "name": "STAR WARS Jedi: Fallen Order",
        //     "imgPath": "/img/games/SWJFO.webp",
        //     "price": 1199
        // },
        // {
        //     "name": "Days Gone",
        //     "imgPath": "/img/games/days_gone.webp",
        //     "price": 999
        // },
        // {
        //     "name": "DEATH STRANDING",
        //     "imgPath": "/img/games/DeathStranding.webp",
        //     "price": 1209
        // },
        // {
        //     "name": "Watch Dogs: Legion",
        //     "imgPath": "/img/games/WatchDogs_Legion.webp",
        //     "price": 915
        // }
    ])
    const [cartGames, setCartGames] = useState([])
    const [wishlist, setWishlist] = useState([])
    const [ordersList, setOrderList] = useState([]);

    const [cartOpened, setCartOpened] = useState(false)


    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            await getDocs(gamesColRef)
                .then((snapshot) => {
                    const games = snapshot.docs.map((doc) => {
                        return {...doc.data(), id: doc.id}
                    })
                    setGames(games)
                })
                .catch(err => {
                    console.log(err.message)
                })
            onSnapshot(cartColRef, (snapshot) => {
                const cartGames = snapshot.docs.map((doc) => {
                    return {...doc.data()}
                })
                setCartGames(cartGames)
            })
            onSnapshot(wishlistColRef, (snapshot) => {
                const wishlistGames = snapshot.docs.map((doc) => {
                    return {...doc.data()}
                })
                setWishlist(wishlistGames)
            })
            onSnapshot(ordersColRef, orderBy("date"), (snapshot) => {
                const orders = snapshot.docs.map((doc) => {
                    return {...doc.data()}
                })
                orders.sort((a, b) => a.date.toString().localeCompare(b.date.toString()))
                    .reverse()
                setOrderList(orders)
            })
            setIsLoading(false)

        }

        fetchData()

        // ()=>{
        //     games.map((game) => {
        //         addDoc(collection(getFirestore(), 'games'), game)
        //             .catch(err => {
        //                 console.log(err.message)
        //             })
        //
        //     })
        // }
    }, [])
    const addGameToCart = async (game) => {
        await setDoc(cartDocRef(game.id), game)
    }
    const removeGameFromCart = async (game) => {
        await deleteDoc(cartDocRef(game.id), game)
    }
    const gameInCartHandle = (item, cartAdded) => {
        cartAdded ? removeGameFromCart(item) : addGameToCart(item)
    }

    const addGameToWishlist = async (game) => {
        await setDoc(wishlistDocRef(game.id), game)
    }
    const removeGameFromWishlist = async (game) => {
        await deleteDoc(wishlistDocRef(game.id), game)
    }
    const gameInWishlistHandle = (item, wishlistAdded) => {
        wishlistAdded ? removeGameFromWishlist(item) : addGameToWishlist(item)
    }

    const setOrder = async (cartItems) => {
        console.log("start")
        const orderDate = Date.now();
        const orderObj = {
            date: orderDate,
            items: [...cartItems]
        }
        await addDoc(collection(db, 'orders'), orderObj)
        for (let i = 0; i < cartItems.length; i++) {
            removeGameFromCart(cartItems[i])
        }
        console.log("done")
    }

    const cartOpenHandler = () => {
        setCartOpened(!cartOpened)
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`
        document.documentElement.classList.toggle('lock');
    }

    useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Escape' && cartOpened) {
                cartOpenHandler()
            }
        };
        const overlayHandle = event => {
            if (event.target.classList.contains("overlay_open")) {
                cartOpenHandler()
            }
        };
        document.addEventListener("keyup", keyDownHandler);
        document.addEventListener("click", overlayHandle);
        return () => {
            document.removeEventListener("keyup", keyDownHandler);
            document.removeEventListener("click", overlayHandle);
        };
    }, [cartOpened, cartOpenHandler]);
    return (
        <AppContext.Provider
            value={{isLoading, games, cartGames, wishlist, ordersList, gameInCartHandle, gameInWishlistHandle}}>
            <div className="wrapper">
                {/*{cartOpened &&*/}
                {/*    <Drawer  onClickClose={cartOpenHandler} onGameRemove={removeGameFromCart}/>*/}
                {/*}*/}
                <Drawer opened={cartOpened} onClickClose={cartOpenHandler} onGameRemove={removeGameFromCart}
                        setOrder={setOrder}/>

                <Header onClickCart={cartOpenHandler} cartOpened={cartOpened}/>
                <main className="page">
                    <div className="page__container">

                        <Routes>
                            <Route path="/" element={
                                <Home/>
                            }/>
                            <Route path="/wishlist" element={<Wishlist/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </Routes>
                    </div>
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;
