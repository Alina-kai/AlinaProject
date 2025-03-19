import React from 'react';
import {getAllAnime} from "../http/index.js";
import {Link, useNavigate} from "react-router-dom";

const Home = () => {
    const history = useNavigate();
    const [animeList, setAnimeList] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [search, setSearch] = React.useState("")
    const [favorites, setFavorites] = React.useState(JSON.parse(localStorage.getItem("favorites")) || [])

    React.useEffect(() => {
        const fetchAnime = async () => {
            const data = await getAllAnime(page)
            setAnimeList(data)
        }

        fetchAnime().then(() => {
            console.log('Данные получены!')
        }).catch((error) => {
            console.error(`При получении данных получена ошибка: ${error.message}`)
        })
    }, [page])

    const toggleFavorite = (anime) => {
        const isFavorite = favorites.some(fav => fav.id === anime.id)
        const updatedFavorites = isFavorite
            ? favorites.filter(fav => fav.id !== anime.id)
            : [...favorites, anime]

        setFavorites(updatedFavorites)
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
    };

    const filteredAnime = animeList.filter(anime =>
        anime.attributes.canonicalTitle.toLowerCase().includes(search.toLowerCase())
    )

    const handleCardClick = (animeId) => {
        history(`/details/${animeId}`)
    }

    const handleFavoriteClick = (e, anime) => {
        e.stopPropagation()
        toggleFavorite(anime)
    }

    return (
        <div>
            <div className="top-bar">
                <h1>Список аниме</h1>
                <Link to="/favourites"
                      className="fav-link">
                    Перейти в избранное
                </Link>
            </div>
            <input type="text"
                   placeholder="Поиск по названию..."
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
            />
            <div className="anime-grid">
                {
                    filteredAnime.map((anime) => {
                    const isFavorite = favorites.some(fav => fav.id === anime.id);
                    return (
                        <div key={anime.id}
                             className="anime-card"
                             onClick={() => handleCardClick(anime.id)}>
                            <img src={anime.attributes.posterImage.small}
                                 alt={anime.attributes.canonicalTitle}/>
                            <h3>{anime.attributes.canonicalTitle}</h3>
                            <button className={isFavorite ? "fav-button remove" : "fav-button add"}
                                    onClick={(e) => handleFavoriteClick(e, anime)}>
                                {
                                    isFavorite ? "Удалить из избранного" : "Добавить в избранное"
                                }
                            </button>
                        </div>
                    );
                })
                }
            </div>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)}
                        disabled={page === 1}>
                    Назад
                </button>
                <button onClick={() => setPage(page + 1)}>
                    Далее
                </button>
            </div>
        </div>
    );
};

export default Home;
