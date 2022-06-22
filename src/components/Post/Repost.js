import { useState } from "react";
import { BiRepost } from "react-icons/bi";
import styled from "styled-components";

export default function Repost(props){
    const{numberReposts} = props
    const [nReposts, setNReposts] = useState(numberReposts)
    return(
        <>
            <BiRepost size={25}/>
            <NumberReposts>{nReposts} re-posts</NumberReposts>
        </>
    )
}

const NumberReposts = styled.div`
    margin-top: 0;
`