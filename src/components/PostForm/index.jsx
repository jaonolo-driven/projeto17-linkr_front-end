import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ProfilePic } from '../../styles/ProfilePic'
import { Card } from "../../styles/Card"

export default function PostForm({updateState}){
    const user = JSON.parse(localStorage.getItem('user'))
    const [link, setLink] = useState('')
    const [message, setMessage] = useState('')
    const [avatar, setAvatar] = useState('')
    const [disable, setDisable] = useState(false)
    const [update, setUpdate] = updateState

    useEffect(() => {
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${user.token}`
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
                Authorization: `Bearer ${user.token}`
            }
        })
        promise.then(response => {
            setLink('')
            setMessage('')
            setDisable(false)
            setUpdate(!update)
            console.log(response.data)
        })
        promise.catch(e => {
            setDisable(false)
            alert(e.response.data.message)
        })
    }

    return(
        <Section>
            <PostAside>
                <ProfilePic src={avatar} radius={50}/>
            </PostAside>
            <Form onSubmit={publish}>
                <Title>What are you going to share today?</Title>
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
                <ButtonHolder>
                    <Button type="submit" disabled={disable}>{disable ? 'Publishing...' : 'Publish'}</Button>
                </ButtonHolder>
            </Form>
        </Section>
    )
}

const PostAside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px;
    white-space: nowrap;
`

const Section = styled(Card)`
    background-color: white;
    margin-bottom: 30px;
`

const Title = styled.h2`
    font-size: 20px;
    color: #707070;
    margin: 22px 3px 12px 3px;
    font-weight: 300;
`
const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    width: 100%;
    padding: 0 22px 16px 0;
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
    align-items: center;
    width: 112px; 
    color: #FFFFFF;
    font-weight: 700;
    font-size: 14px;
    background: #006eff;
    border-radius: 5px;
    border: none;
    padding: 5px;
    margin-top: 3px;
    height: 31px;
    cursor: pointer;
`

const ButtonHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`