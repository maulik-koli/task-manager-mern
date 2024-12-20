import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const Modal = forwardRef(({ title, message, visible, onClose, confirmOperation }, ref) => {
    const dialogRef = useRef(null);
    const backdropRef = useRef(null);

    useImperativeHandle(ref, () => ({
        show: () => {
            if (dialogRef.current) {
                dialogRef.current.showModal()
            }
        },
        close: () => {
            if (dialogRef.current) {
                dialogRef.current.close()
            }
        },
    }))

    const handleConfirm = async () => {
        if (confirmOperation) {
            await confirmOperation()
            onClose()
        }
    }

    return (
        <>
            {visible && <div ref={backdropRef} className="modal-backdrop" onClick={onClose} />}
            <dialog ref={dialogRef} className='modal'>
                <div className="modal-content">
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <div className='modal-btns'>
                        <button onClick={handleConfirm} >Confirm</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    )
})

export default Modal;
