import styled from 'styled-components';

export const Container = styled.main`
    hight: 100%;
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
    width: 611px;
    height: 209px;
    left: 241px;
    top: 232px;
    margin-bottom: 30px;
    border-radius: 16px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Post = styled.div`
    width: 611px;
    height: 276px;
    left: 415px;
    top: 495px;
    background: #171717;
    margin-bottom: 30px;
    border-radius: 16px;
    display: flex;
    font-family: var(--default-font);
    color: #FFFFFF;
`;

export const SideBar = styled.aside`
    display: flex;
    position: sticky;
    width: 301px;
    height: 406px;
    left: 10%;
    top: 232px;
    margin-left: 30px;
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
`


export const Photo = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-rigth: 10px;
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
`

export const SubPostAside = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30%;

    ion-icon {
        font-size: 17px;
        color: #FFFFFF;
    }
`

export const PostContent = styled.div`
    display: flex;
    flex-direction: column;

    span {
        color: tomato;
    }
`