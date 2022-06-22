import styled from "styled-components";

export const LoadingPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;

    p {
        font-size: 22px;
        color: #6D6D6D;
        line-height: 26px;
        letter-spacing: 0.05em;
    }
`

export const TimelineHTML = styled.div`
    height: 100%;
    overflow: auto;
`;

export const Title = styled.h1`
    display: flex;
    width: 100%;
    text-align: left;
    margin-top: 78px;
    margin-bottom: 40px;
    color: #fff;
    font-family: var(--subtitle-font);
    font-weight: 700;
    font-size: 43px;
    
    @media screen and (max-width: 650px) {
        margin: 19px 0;
        padding-left: 3%;
        line-height: 60px;
    }
`;

export const MainContent = styled.main`
    width: 100%;
    height: calc(100% - 72px);

    @media screen and (max-width: 650px) {
        height: calc(100% - 137px);
    }
`;

export const CenterHTML = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 650px) {
        margin: 0;   
    }
`;

export const SidebarWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 28px
`;

export const UserPageTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    h1 {
        display: flex;
        margin-top: 5%;
        margin-bottom: 5%;
        margin-left: 3%;
        color: #fff;
        font-family: var(--subtitle-font);
        font-weight: 700;
        font-size: 43px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 18px;
        margin-right: 10px;
    }
`;