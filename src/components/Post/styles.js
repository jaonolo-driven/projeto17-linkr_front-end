import styled from 'styled-components';
import { Card } from '../../styles/Card'

export const Container = styled.main`
    /*height: 100%;*/
    overflow: scroll;
    background-color: var(--lighter-grey);
`

export const Title = styled.h1`
    display: flex;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 3%;
    color: #fff;
    font-family: var(--subtitle-font);
    font-weight: 700;
    font-size: 43px;
    `;

export const MainContent = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-left: 3%;
`;

export const Center = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
`;

export const CreatePost = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: aliceblue; */
`;

export const PostHTML = styled(Card)`
    background: #171717;
    color: #FFFFFF;
<<<<<<< HEAD
=======

    a {
        color: inherit;
        text-decoration: none;
    }

    @media screen and (max-width: 600px) {
        border-radius: 0;
    }

>>>>>>> c11cc06f1e8073a2a143c738481c0d16108676da
    h3 {
        margin: 0
    }
`;

export const SideBar = styled.aside`
    display: flex;
    position: sticky;
    width: 25%;
    height: 60vh;
    margin-left: 1%;
    background: #171717;
    border-radius: 16px;
    flex-direction: column;
    font-family: var(--default-font);
    color: #FFFFFF;
    h3 {
        margin-left: 5%;
    }
    
    p {
        margin-left: 5%;
    }
`;

export const SideBarLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--line-grey);
    margin-bottom: 5%;
`

export const Photo = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
`

export const SubHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 14.5%;
`

export const PostAside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px;
    width: 20%;
`

export const SubPostAside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30%;

    svg {
        font-size: 17px;
        color: #FFFFFF;
        margin-bottom: 10%;
        cursor: pointer;
    }

    .fontTooltip {
        font-family:var(--default-font);
        font-weight: 400;
        font-size: 11px;
    }

    .fontTooltipNone {
        display: none;
    }
`

export const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    word-break: break-all;
    span {
        font-weight: 700;
    }
    padding: 20px 20px 20px 0
`

export const UrlPost = styled.div`
    width: 96%;
    height: 60%;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    margin-top: 2%;
    img {
        width: 30%;
        height: 100%;
        border-radius: 11px;
        object-fit: cover;
    }
`

export const UrlPostText = styled.div`
    display: flex;
    flex-direction: column;
    word-break: break-all;
    justify-content: space-around;
    padding: 0 2% 2% 2%;
    //margin-top: -5%;
    
    h4 {
        font-family:var(--default-font);
        font-weight: 400;
        font-size: 16px;
        color: #CECECE;
        margin-bottom: -3%;
    }
    
    p {
        font-family:var(--default-font);
        font-weight: 400;
        font-size: 11px;
        color: #9B9595;
    }
    a {
        text-decoration: none;
        color: #CECECE;
        font-family:var(--default-font);
        font-weight: 400;
        font-size: 11px;
    }
`

export const IconStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;