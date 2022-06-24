import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function TrendingHashtags() {

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const promisse = axios.get(process.env.REACT_APP_API_URL + "/trending-hashtags");
        promisse.then(response => setTrending(response.data));
    }, []);

    return(
        <SideBar>
            <h3>trending</h3>
            <SideBarLine/>
            <HashtagsHolder>
                {trending.map((hashtag) => {
                    const tag = hashtag.tag.split("#")[1];
                    return(
                        <p key={hashtag.tag}>
                            <Link to={`/hashtag/${tag}`}># {tag}</Link>
                        </p>);
                })}
            </HashtagsHolder>
        </SideBar>
    );
}

const SideBar = styled.aside`
    display: flex;
    position: sticky;
    width: 300px;
    height: fit-content;
    background: #171717;
    border-radius: 16px;
    flex-direction: column;
    font-family: var(--default-font);
    color: #FFFFFF;
    padding-top: 10px;
    padding-bottom: 30px;
    h3 {
        margin-left: 5%;
        font-size: 27px;
        font-family: var(--subtitle-font);
    }
    
    p {
        margin-left: 5%;
        font-weight: 700;
        font-size: 19px;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

const SideBarLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--line-grey);
    margin-bottom: 22px;
    margin-top: 12px
`;

const HashtagsHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px
`