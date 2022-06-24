import { useRef, useEffect } from "react";

const CloseClickOutside = (props) => {
    const ref = useRef(null);
    const { onClickOutside, Element, state } = props;
  
    useEffect(() => {
        console.log(state)
        const handleClickOutside = (event) => {
            console.log(event.target)
            console.log(onClickOutside)
            console.log(ref)
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside();
            }
        };
        const a = document.addEventListener('click', handleClickOutside, true);
        return () => {
            console.log('vish')
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside ]);

    return (
        <Element ref={ref}/>
    );
} 


export default CloseClickOutside