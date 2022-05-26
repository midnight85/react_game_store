import React, {createContext, useEffect, useMemo, useState} from 'react'
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import useDebounce from './hooks/useDebounce';
import {initializeApp} from "firebase/app";
import {collection, deleteDoc, doc, getDocs, getFirestore, setDoc} from 'firebase/firestore'
import {firebaseConfig} from './firebaseConfig';

initializeApp(firebaseConfig);
const db = getFirestore();
const gamesColRef = collection(db, 'games');
const cartColRef = collection(db, 'cart');
const cartDocRef = (id) => (doc(db, 'cart', id));

export const AppContext = createContext({})

function App() {

    const [isLoading, setIsLoading] = useState(true)
    const [games, setGames] = useState([
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

    const [cartOpened, setCartOpened] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

    const debouncedSearch = useDebounce((query) => {
        setDebouncedSearchQuery(query)
    }, 500)

    const foundGames = useMemo(() => {
        if (debouncedSearchQuery) {
            return [...games].filter(game => game.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
        }
        return games
    }, [debouncedSearchQuery, games])


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
        setCartGames((prev) => ([...prev, game]))
    }
    const removeGameFromCart = (game) => {
        deleteDoc(cartDocRef(game.id), game)
        setCartGames(prev => prev.filter(item => item.name !== game.name))
    }
    const gameInCartHandle = (item, cartAdded) => {
        cartAdded ? removeGameFromCart(item) : addGameToCart(item)
    }
    const isGameInCart = (game) => (cartGames.some((item)=> item.id === game.id))

    const cartOpenHandler = () => {
        document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`
        document.documentElement.classList.toggle('lock');
        setCartOpened(!cartOpened)
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

    // const searchParam = ['name', 'price']

    // const testSearch = () => {
    //     // return games.filter((game) => {
    //     //     return searchParam.some((newItem) => {
    //     //         return (game[newItem]
    //     //                 .toString()
    //     //                 .toLowerCase()
    //     //                 .indexOf(searchQuery.toLowerCase()) > -1
    //     //         );
    //     //     });
    //     // });
    //     // return games.filter((game) => {
    //     //     console.log(game.name
    //     //         .toString()
    //     //         .toLowerCase()
    //     //         .indexOf(searchQuery.toLowerCase()) > -1)
    //     //     return (game.name
    //     //             .toString()
    //     //             .toLowerCase()
    //     //             .indexOf(searchQuery.toLowerCase()) > -1
    //     //     );
    //     // });
    //
    // }
    // useEffect(() => {
    //     // console.log(testSearch())
    //     testSearch()
    // }, [searchQuery])

    // console.log(games)
    return (
        <AppContext.Provider value={{games, cartGames}}>
            <div className="wrapper">
                {cartOpened &&
                    <Drawer cartGames={cartGames} onClickClose={cartOpenHandler} onGameRemove={removeGameFromCart}/>
                }
                <Header onClickCart={cartOpenHandler}/>
                <main className="page">
                    <div className="page__container">
                        <div className="catalog">
                            <div className="catalog__header">
                                <h1 className="catalog__title">Список игр</h1>
                                <div className="catalog__actions">
                                    {/* <div className="sort">sort</div> */}
                                    <div className="search">
                                        <button className="search__btn">
                                            <svg className="searchIcon" width="14" height="14" viewBox="0 0 24 24"
                                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M10.875 3.25C6.66383 3.25 3.25 6.66383 3.25 10.875C3.25 15.0862 6.66383 18.5 10.875 18.5C12.9789 18.5 14.8822 17.6492 16.2628 16.2706C17.646 14.8893 18.5 12.9828 18.5 10.875C18.5 6.66383 15.0862 3.25 10.875 3.25ZM1.25 10.875C1.25 5.55926 5.55926 1.25 10.875 1.25C16.1907 1.25 20.5 5.55926 20.5 10.875C20.5 13.1742 19.6928 15.2863 18.348 16.9413L22.4565 21.0422C22.8473 21.4324 22.8479 22.0656 22.4578 22.4565C22.0676 22.8473 21.4344 22.8479 21.0435 22.4578L16.933 18.3547C15.2792 19.6955 13.1703 20.5 10.875 20.5C5.55926 20.5 1.25 16.1907 1.25 10.875Z"
                                                    fill="#1E212C"/>
                                            </svg>
                                        </button>

                                        <input className="search__input"
                                               placeholder="Поиск..."
                                               value={searchQuery}
                                               onChange={e => {
                                                   debouncedSearch(e.target.value)
                                                   setSearchQuery(e.target.value)
                                               }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="cards">

                                {isLoading ?
                                    [...Array(8)].map((value, index)=>(
                                        <div key={index} className={"card cardLoading"} ></div>

                                    ))
                                    :
                                    foundGames.length ?
                                        foundGames.map((game) => (
                                            <Card key={game.id}
                                                  id={game.id}
                                                  name={game.name}
                                                  imgPath={game.imgPath}
                                                  price={game.price}
                                                  onClickAdd={gameInCartHandle}
                                                  isInCart={()=>isGameInCart(game)}
                                                  isLoading={isLoading}
                                            />
                                        ))
                                        :
                                        <div className='notFoundGame'>
                                            Игр не найдено
                                        </div>
                                }
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </AppContext.Provider>
    );
}

export default App;
