import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import useDebounce from './hooks/useDebounce';

function App() {
    const [games, setGames] = useState([
        // {
        //     "id": "1",
        //     "name": "Far Cry 6",
        //     "imgPath": "/img/games/far_cry_6.webp",
        //     "price": 915
        // },
        // {
        //     "id": "2",
        //     "name": "God of war",
        //     "imgPath": "/img/games/god_of_war.webp",
        //     "price": 1199
        // },
        // {
        //     "id": "3",
        //     "name": "Assassin\"s Creed Valhalla",
        //     "imgPath": "/img/games/ac_valhalla.webp",
        //     "price": 915
        // },
        // {
        //     "id": "4",
        //     "name": "Horizon Zero Dawn™",
        //     "imgPath": "/img/games/horizon.webp",
        //     "price": 999
        // },
        // {
        //     "id": "5",
        //     "name": "Red Dead Redemption 2",
        //     "imgPath": "/img/games/RDR2.jpg",
        //     "price": 899
        // },
        // {
        //     "id": "6",
        //     "name": "STAR WARS Jedi: Fallen Order",
        //     "imgPath": "/img/games/SWJFO.webp",
        //     "price": 1199
        // },
        // {
        //     "id": "7",
        //     "name": "Days Gone",
        //     "imgPath": "/img/games/days_gone.webp",
        //     "price": 999
        // },
        // {
        //     "id": "8",
        //     "name": "DEATH STRANDING",
        //     "imgPath": "/img/games/DeathStranding.webp",
        //     "price": 1209
        // },
        // {
        //     "id": "9",
        //     "name": "Watch Dogs: Legion",
        //     "imgPath": "/img/games/WatchDogs_Legion.webp",
        //     "price": 915
        // }
    ])
    const [cartGames, setCartGames] = useState([])
    const [cartOpened, setCartOpened] = useState(false)

    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

    const debouncedSearch = useDebounce((query) => { setDebouncedSearchQuery(query) }, 500)

    const foundGames = useMemo(() => {
        if (debouncedSearchQuery) {
            return [...games].filter(game => game.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()))
        }
        return games
    }, [debouncedSearchQuery, games])




    useEffect(() => {
        // fetch("https://628b87c5667aea3a3e3140f9.mockapi.io/games")
        //     .then(response => (response.json()))
        //     .then((json) => { setGames(json) })
        axios.get("https://628b87c5667aea3a3e3140f9.mockapi.io/games").then(response => setGames(response.data))
        axios.get("https://628b87c5667aea3a3e3140f9.mockapi.io/cart").then(response => setCartGames(response.data))
    }, [])

    const addGameToCart = async (game) => {
        try{
        const {data} = await axios.post("https://628b87c5667aea3a3e3140f9.mockapi.io/cart", game)
        setCartGames((prev) => ([...prev, data  ]))
        }catch(error){
            alert(error)
        }
    }
    const removeGameFromCart = (item) => {
        console.log(cartGames);
        console.log(item.id);
        setCartGames(prev => prev.filter(game => game.name !== item.name))
        axios.delete(`https://628b87c5667aea3a3e3140f9.mockapi.io/cart/${item.id}`)

    }
    const cartGamesHandle = (item, cartAdded) => {
        cartAdded ? removeGameFromCart(item) : addGameToCart(item)
    }
    const cartOpenHandler = () => {
        setCartOpened(!cartOpened)
        document.documentElement.classList.toggle('lock');
        document.body.classList.toggle('scrollPadding');

    }




    return (
        <div className="wrapper">
            {cartOpened && <Drawer cartGames={cartGames} onClickClose={cartOpenHandler} onGameRemove={removeGameFromCart} />}
            <Header onClickCart={cartOpenHandler} />
            <main className="page">
                <div className="page__container">
                    <div className="catalog">
                        <div className="catalog__header">
                            <h1 className="catalog__title">Список игр</h1>
                            <div className="catalog__actions">
                                {/* <div className="sort">sort</div> */}
                                <div className="search">
                                    <button className="search__btn">
                                        <svg className="searchIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.875 3.25C6.66383 3.25 3.25 6.66383 3.25 10.875C3.25 15.0862 6.66383 18.5 10.875 18.5C12.9789 18.5 14.8822 17.6492 16.2628 16.2706C17.646 14.8893 18.5 12.9828 18.5 10.875C18.5 6.66383 15.0862 3.25 10.875 3.25ZM1.25 10.875C1.25 5.55926 5.55926 1.25 10.875 1.25C16.1907 1.25 20.5 5.55926 20.5 10.875C20.5 13.1742 19.6928 15.2863 18.348 16.9413L22.4565 21.0422C22.8473 21.4324 22.8479 22.0656 22.4578 22.4565C22.0676 22.8473 21.4344 22.8479 21.0435 22.4578L16.933 18.3547C15.2792 19.6955 13.1703 20.5 10.875 20.5C5.55926 20.5 1.25 16.1907 1.25 10.875Z" fill="#1E212C" />
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

                            {foundGames.length ?
                                foundGames.map((game) => (
                                    <Card key={game.name}
                                    id={game.id}
                                        name={game.name}
                                        imgPath={game.imgPath}
                                        price={game.price}
                                        onClickAdd={cartGamesHandle}
                                    />))
                                : <div className='notFoundGame'>Игра не найдена!</div>
                            }
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
