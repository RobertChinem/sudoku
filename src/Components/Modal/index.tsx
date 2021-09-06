import React from "react"
import './style.css'


export interface ModalState {
    title: string
    message: string
    modal: boolean
}


interface ModalProps {
    status: ModalState
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>
}


export function Modal({setModalState, status: {title, message, modal}}: ModalProps) {
    function closeModal() {
        setModalState({ title: '', message: '', modal: false})
    }

    return (
        <div id="myModal" className="modal" style={{ display: (modal ? 'block': 'none') }}>
            <div className="modal-content">
                <span onClick={closeModal} className="close"> &times; </span>
                <h1>{ title }</h1>
                <p>{ message }</p>
            </div>
        </div>
    )
}