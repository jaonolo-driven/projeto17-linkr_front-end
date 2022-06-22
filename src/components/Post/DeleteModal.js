import { useContext, useState } from "react"
import styled from 'styled-components'

import ReactModal from "react-modal";
import { Circles } from "react-loader-spinner";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

const DeleteModal = ({ id }) => {
    const [showModal, setShowModal] = useState(false)
    const [modalLoad, setModalLoad] = useState(false)

    const { token } = useContext(UserContext)[0]

    function deletePost(){
        const promise = axios.delete(`${process.env.REACT_APP_API_URL}/deletepost/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        promise.then(response => {
            setModalLoad(false)
            setShowModal(false)
        }).catch(e => {
            setModalLoad(false)
            setShowModal(false)
            alert(e.response.data.message)
        })
    }

    return <>
        <ReactModal ariaHideApp={false} isOpen={showModal} style={modalStyle}>
            <ContentModal>
                {(modalLoad===true) ? <Circles color="#00BFFF" height={180} width={180}/>
                :<>
                    Are you sure you want to delete this post?
                    <div>
                    <CancelButton onClick={() => setShowModal(false)}>
                        No, go back
                    </CancelButton>
                    <ConfirmButton onClick={() => {
                        setModalLoad(true)
                        setTimeout(()=>{
                            deletePost()
                        }, "500")
                    }}>
                        Yes, delete it
                    </ConfirmButton>
                    </div>
                </>}
            </ContentModal>
        </ReactModal>
        <AiFillDelete margin={10} cursor={'pointer'} onClick={() => setShowModal(true)}/>
    </>
}

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border: none;
    margin: 47px 13px;
    cursor: pointer;
`
const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
    border: none;
    margin: 47px 13px;
    cursor: pointer;
`
const NameAndButtons = styled.div`
    display: flex;
    justify-content: space-between;
`
const EditAndDel = styled.div`
    display: flex;
    justify-content: space-between;
    color: #FFFFFF;
    width: 50px;
`
const Input  = styled.input`
    height: 100%;
`
const ContentModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;

    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
`
const modalStyle = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    content: {
        width: 597,
        height: 262,
        color: '#ffffff',
        backgroundColor: '#333333',
        borderRadius: '50px',
        position: 'absolute',
        top: '35%',
        left: '35%',
        padding: '38px 120px',
        overflow: 'hidden'
    }
}

export default DeleteModal