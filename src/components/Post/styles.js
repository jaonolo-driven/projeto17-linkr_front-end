import styled from 'styled-components';
import { Card } from '../../styles/Card'

export const PostHTML = styled(Card)`
    background: #171717;
    color: #FFFFFF;
    gap: 18px
`;

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
    //padding: 18px;
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
    //padding: 20px 20px 20px 0;
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

export const NameAndButtons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    a {
        text-decoration: none;
        color: inherit
    }
`
export const EditAndDel = styled.div`
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
    width: 50px;
`
export const Input  = styled.input`
    height: 100%;
`