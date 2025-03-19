import React from 'react'
import { Link } from 'react-router-dom'

const Favourites = () => {
    const [favourites, setFavourites] = React.useState([])

    React.useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem("favorites")) || []
        setFavourites(savedFavourites)
    }, [])

    const removeFavourite = (code) => {
        const updatedFavourites = favourites.filter(anime => anime.id !== code)
        setFavourites(updatedFavourites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavourites))
    }
    return (
        <div className="container">
            <Link to="/">Назад</Link>
            <h1>Избранные аниме</h1>
            <div className="grid">
                {favourites.length === 0 ? <p>Нет избранных аниме.</p> :
                    favourites.map(anime => (
                        <div key={anime.id}
                             className="card">
                            <h1>{anime.attributes.canonicalTitle}</h1>
                            <img src={anime.attributes.posterImage.small}
                                 alt={anime.attributes.canonicalTitle}/>
                            <button className='fav-button remove'
                                    onClick={() => removeFavourite(anime.id)}>
                                Удалить
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Favourites;
