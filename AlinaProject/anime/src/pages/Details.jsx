import React from 'react'
import {
    Link,
    useParams
} from "react-router-dom"
import {getAnimeDetails} from "../http/index.js"

const Details = () => {
    const { id } = useParams()
    const [anime, setAnime] = React.useState(null)

    React.useEffect(() => {
        const fetchAnimeDetails = async () => {
            const data = await getAnimeDetails(id)
            setAnime(data)
        };

        fetchAnimeDetails().then(() => {
            console.log('Данные получены!')
        }).catch((error) => {
            console.error(`При получении данных получена ошибка: ${error.message}`)
        })
    }, [id])

    if (!anime) return <div>Загрузка...</div>

    return (
        <div>
            <h1>{anime.attributes.canonicalTitle}</h1>
            <img src={anime.attributes.posterImage.original}
                 alt={anime.attributes.canonicalTitle} />
            <p>{anime.attributes.synopsis}</p>
            <Link to="/">Назад</Link>
        </div>
    );
};

export default Details;