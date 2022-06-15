import styled from "styled-components"

export default function ItemPost(props){
    const { picture, name, message } = props
    return(
            <Post>
                <Picture src={picture}/>
                <div>
                <Name>{name}</Name>
                <Message>{message}</Message>
                </div>
            </Post>
    )
}

const Post = styled.section`
    display: flex;
    background: #000;
    border-radius: 10px;
    width: 400px;
    height: 150px;
    margin: 10px;
    padding: 10px;
`
const Picture = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 20px;
`
const Name = styled.h2`
    color: #FFFFFF;
    margin: 0;
    font-family: 'Dosis';
    font-size: 15px;

`
const Message = styled.h3`
    color: #a39f9f;
    margin: 0;
    font-family: 'Dosis';
    font-size: 15px;
`