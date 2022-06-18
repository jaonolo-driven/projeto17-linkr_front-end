import styled from 'styled-components';

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
    width: 85%;
    height: 50vh;
    left: 50%;
    top: 50%;
    margin-bottom: 10%;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const PostHTML = styled.div`
    width: 100%;
    height: 50vh;
    left: 50%;
    top: 50%;
    background: #171717;
    margin-bottom: 5%;
    border-radius: 16px;
    display: flex;
    font-family: var(--default-font);
    color: #FFFFFF;
    overflow: hidden;
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
    padding: 3%;
    width: 20%;
`

export const SubPostAside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30%;

    svg {
        font-size: 17px;
        color: #fff;
        margin-bottom: 10%;
        cursor: pointer;
    }
`

export const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    word-break: break-all;
    span {
        font-weight: 700;
    }
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
    }
`

export const UrlPostText = styled.div`
    display: flex;
    flex-direction: column;
    word-break: break-all;
    justify-content: space-around;
    padding: 2%;
    margin-top: -5%;
    
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

export const MainNoPosts = styled.main`
    display: flex;
    width: 100%;
    height: 100%;
    margin-right: 10%;
    align-items: flex-start;
    justify-content: center;
    color: #fff;
    font-family: var(--subtitle-font);
    font-weight: 700;
    font-size: 30px; 
`;
