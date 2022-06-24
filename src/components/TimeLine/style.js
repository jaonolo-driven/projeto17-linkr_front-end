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
        margin-bottom: 100px;
    }

    width: 600px;
    @media screen and (max-width: 600px) {
        width: 100%;
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
    margin-top: 60px;
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
    gap: 28px;

    li {
        list-style: none;
        width: 10px;
        height: 10px;
    }
`;

export const UserPageTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 60px;
    margin-bottom: 40px;
    padding: 0 22px;

    h1 {
        display: flex;
        color: #fff;
        font-family: var(--subtitle-font);
        font-weight: 700;
        font-size: 43px;
    }

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 10px;
        margin-right: 18px;
    }

    @media screen and (max-width: 600px) {
        margin: 19px 0;
        padding: 0 3%;
        line-height: 60px;

        flex-direction: column;

        h1 {
            font-size: 36px;
            flex-direction: column;
            align-items: center;
        }

        img {
            margin: 0 0 12px 0;
            width: 80px;
            height: 80px;
        }
    }
`;
