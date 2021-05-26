import axios from 'axios'
import { useState, useEffect } from 'react'

const Favorites = () => {

    const [favs, setFavs] = useState([])
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/favorites')
    //         .then(res => {
    //             console.log(res)
    //             setFavs(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    const favsFunc = async () => {
        try {
            await axios
                .get(`http://localhost:8000/api/favorites`)
                .then(res => {
                    console.log(res)
                    setFavs(res.data)
                })

            setLoading(true)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        favsFunc()
    }, [])

    return (
        <div>
            {
                loading
                    ? <ul> {favs.map(fav => <li key={fav.id}>{fav.title}</li>)} </ul>
                    : <div>ae</div>
            }
        </div>
    )
}

export default Favorites