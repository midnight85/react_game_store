import React, {useContext, useEffect, useMemo, useState} from 'react';
import {AppContext} from "../App";
import Card from "../components/Card";

const Home = () => {

    const {isLoading, games, gameInCartHandle, gameInWishlistHandle} = useContext(AppContext)
    const [searchQuery, setSearchQuery] = useState('')

    const [scrollWidth, setScrollWidth] = useState(0)
    const isScrollExist = () => {
        const wrapperBlock = document.querySelector('.wrapper')
        if (!isLoading) {
            if (wrapperBlock.clientHeight > document.body.clientHeight) {
                setScrollWidth(window.innerWidth - document.body.clientWidth)
            }
        }
        if (window.innerWidth === document.body.clientWidth) {
            wrapperBlock.style.paddingRight = `${scrollWidth}px`
        } else {
            wrapperBlock.style.paddingRight = 0
        }
    }
    useEffect(() => {
        isScrollExist()

    }, [isLoading, searchQuery])

    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')

    // const debouncedSearch = useDebounce((query) => {
    //     setDebouncedSearchQuery(query)
    // }, 500)


    const foundGames = useMemo(() => {
        if (searchQuery) {
            return [...games].filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return games
    }, [searchQuery, games])

    return (
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
                                   // debouncedSearch(e.target.value)
                                   setSearchQuery(e.target.value)
                               }}
                        />
                    </div>
                </div>
            </div>


            {isLoading ?
                <div className="cards">
                    {[...Array(8)].map((value, index) => (
                        <div key={index} className={"card cardLoading"}></div>

                    ))}
                </div>
                :
                foundGames.length ?
                    <div className="cards">
                        {
                            foundGames.map((game) => (
                                <Card key={game.id}
                                      id={game.id}
                                      name={game.name}
                                      imgPath={game.imgPath}
                                      price={game.price}
                                      onClickAdd={gameInCartHandle}
                                      onClickWishlist={gameInWishlistHandle}
                                />
                            ))}
                    </div>
                    :
                    <div className='notFoundGame'>
                        Игр не найдено
                    </div>
            }

        </div>
    );
};

export default Home;