import React, {createContext, useEffect, useMemo, useState} from 'react'
// import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home"
import Wishlist from "./pages/Wishlist";
import useDebounce from './hooks/useDebounce';
import {initializeApp} from "firebase/app";
import {collection, deleteDoc, doc, getDocs, getFirestore, setDoc} from 'firebase/firestore'
import {firebaseConfig} from './firebaseConfig';
import {Route, Routes} from "react-router-dom";
import * as PropTypes from "prop-types";

initializeApp(firebaseConfig);
const db = getFirestore();
const gamesColRef = collection(db, 'games');
const cartColRef = collection(db, 'cart');
const wishlistColRef = collection(db, 'wishlist');
const cartDocRef = (id) => (doc(db, 'cart', id));
const wishlistDocRef = (id) => (doc(db, 'wishlist', id));

export const AppContext = createContext({})
export const HomeContext = createContext({})


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
            await getDocs(cartColRef)
                .then((snapshot) => {
                    const cartGames = snapshot.docs.map((doc) => {
                        return {...doc.data()}
                    })
                    setCartGames(cartGames)
                })
                .catch(err => {
                    console.log(err.message)
                })
            await getDocs(wishlistColRef)
                .then((snapshot) => {
                    const wishlistGames = snapshot.docs.map((doc) => {
                        return {...doc.data()}
                    })
                    setWishlist(wishlistGames)
                })
                .catch(err => {
                    console.log(err.message)
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
        setCartGames((prev) => ([...prev, game]))
        await setDoc(cartDocRef(game.id), game)
    }
    const removeGameFromCart = async (game) => {
        setCartGames(prev => prev.filter(item => item.name !== game.name))
        await deleteDoc(cartDocRef(game.id), game)
    }
    const gameInCartHandle = (item, cartAdded) => {
        cartAdded ? removeGameFromCart(item) : addGameToCart(item)
    }

    const addGameToWishlist = async (game) => {
        setWishlist((prev) => ([...prev, game]))
        await setDoc(wishlistDocRef(game.id), game)
    }
    const removeGameFromWishlist = async (game) => {
        setWishlist(prev => prev.filter(item => item.name !== game.name))
        await deleteDoc(wishlistDocRef(game.id), game)
    }
    const gameInWishlistHandle = (item, wishlistAdded) => {
        wishlistAdded ? removeGameFromWishlist(item) : addGameToWishlist(item)
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
        document.addEventListener("keyup", keyDownHandler);
        return () => {
            document.removeEventListener("keyup", keyDownHandler);
        };
    }, [cartOpened]);
    return (
        <AppContext.Provider value={{games, cartGames, wishlist,gameInCartHandle,gameInWishlistHandle}}>
            <div className="wrapper">
                {/*{cartOpened &&*/}
                {/*    <Drawer  onClickClose={cartOpenHandler} onGameRemove={removeGameFromCart}/>*/}
                {/*}*/}
                <Drawer opened={cartOpened} onClickClose={cartOpenHandler} onGameRemove={removeGameFromCart}/>

                <Header onClickCart={cartOpenHandler}/>
                <main className="page">
                    <div className="page__container">

                        <Routes>
                            <Route path="/" element = {
                                <HomeContext.Provider value={{isLoading}}>
                                <Home />
                                </HomeContext.Provider>
                            } />
                            <Route path="/wishlist" element={<Wishlist />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;
