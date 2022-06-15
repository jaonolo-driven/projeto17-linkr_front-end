import axios from "axios"
import { useState } from "react"

export default function PostForm(){
    const token = JSON.parse(localStorage.getItem('user'))
    const [link, setLink] = useState('')
    const [message, setMessage] = useState('')

    function publish(e){
        e.preventDefault()
        const promise = axios.post(`${process.env.REACT_APP_API_URL}/newpost`,{
            link: link,
            message: message
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then(response => {
            setLink('')
            setMessage('')
            console.log(response.data)
        })
        promise.catch(e => console.log(e.data))
    }

    return(
        <section>
            <form onSubmit={publish}>
                <input  type='text'
                        placeholder="http://..."
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        required/>

                <input  type='text'
                        placeholder="Descrição"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required/>

                <button type="submit">Publish</button>
            </form>
        </section>
    )
}