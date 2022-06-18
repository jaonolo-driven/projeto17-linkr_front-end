import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function PostForm(){
    const token = JSON.parse(localStorage.getItem('user'))
    const [link, setLink] = useState('')
    const [message, setMessage] = useState('')
    const [avatar, setAvatar] = useState('')
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then(response => {
            setAvatar(response.data.profilePicture)
        }).catch(e => console.log(e.data))
    },[])

    function publish(e){
        e.preventDefault()
        setDisable(true)
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
            setDisable(false)
            console.log(response.data)
        })
        promise.catch(e => {
            setDisable(false)
            alert(e.response.data.message)
        })
    }

    return(
        <Section>
            <Photo src={avatar} />
            <Form onSubmit={publish}>
                <Title>What are you going to share toady?</Title>
                <Input  type='text'
                        placeholder="http://..."
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        disabled={disable}
                        required/>

                <Input  type='text'
                        placeholder="Descrição"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        disabled={disable}
                        height={"50px"}/>

                <Button type="submit" disabled={disable}>{disable ? 'Publishing...' : 'Publish'}</Button>
            </Form>
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    justify-content: left;
    background: #FFFFFF;
    width: 600px;
    height: 200px;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 30px;
`
const Photo = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
`
const Title = styled.h2`
    font-family: 'Dosis';
    font-size: 14px;
    color: #8a8989;
    margin: 3px;
`
const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
`
const Input = styled.input`
    margin: 3px;
    padding: 3px;
    background: #f0eded;
    border: none;
    border-radius: 3px;
    font-size: 11px;
    height: ${props => props.height};
    position: relative;
`
const Button = styled.button`
   display: flex;
   justify-content: center;
   width: 70px; 
   color: #FFFFFF;
   background: #006eff;
   border-radius: 5px;
   border: none;
   padding: 5px;
   margin-top: 3px;
   font-size: 10px;
`