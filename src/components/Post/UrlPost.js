import { UrlPostContainer, UrlPostText, UrlPostImgFrame } from "./styles"
import { SquareImg } from "../../styles/SquareImg";

const UrlPost = ({url}) => <UrlPostContainer href={url.link}>
    <UrlPostText>
        <h4>{url.title}</h4>
        <p>{url.description}</p>
        <a href={url.link}>{url.link}</a>
    </UrlPostText>
    <UrlPostImgFrame>
        <SquareImg src={url.image}/>
    </UrlPostImgFrame>
</UrlPostContainer>

export default UrlPost