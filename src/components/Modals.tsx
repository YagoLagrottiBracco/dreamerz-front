import React, { useEffect, useState } from "react"
import {
    Modal,
    ModalBody,
    ModalDialog,
    ModalHeader,
    ModalTitle,
} from "react-bootstrap"
import Forms, { Options } from "./Forms"

interface ModalsProps {
    show: boolean
    onHide: () => void
    options: Options[]
    name: string
}

const Modals: React.FC<ModalsProps> = ({ show, onHide, options, name }) => {
    const [handle, sethandle] = useState(show)

    useEffect(() => {
        sethandle(show)
    }, [show])

    return (
        <Modal show={handle} onHide={onHide}>
            <ModalDialog className="m-0">
                <ModalHeader closeButton>
                    <ModalTitle>{name}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Forms options={options}></Forms>
                </ModalBody>
            </ModalDialog>
        </Modal>
    )
}

export default Modals
