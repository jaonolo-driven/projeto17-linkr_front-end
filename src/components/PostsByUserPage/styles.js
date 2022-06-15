import styled from 'styled-components';

export const Title = styled.h1`
    display: flex;
    margin-top: 100px;
    margin-bottom: 50px;
    margin-left: 3%;
    color: #fff;
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
    font-family: var(--subtitle-font);
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
    font-family: var(--subtitle-font);
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
    margin-right: 10px;
`

export const SubHeaderContainer = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
`

export const PostAside = styled.div`
    display: flex;
    flex-direction: column;
`