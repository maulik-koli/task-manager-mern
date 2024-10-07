import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const Modal = forwardRef(({ title, message, visible, onClose, confirmOperation }, ref) => {
    const dialogRef = useRef(null);
    const backdropRef = useRef(null);

    useImperativeHandle(ref, () => ({
        show: () => {
            if (dialogRef.current) {
                dialogRef.current.showModal();
                backdropRef.current.classList.add('visible'); // Add visible class
            }
        },
        close: () => {
            if (dialogRef.current) {
                dialogRef.current.close();
                backdropRef.current.classList.remove('visible'); // Remove visible class
            }
        },
    }));

    const handleConfirm = async () => {
        if (confirmOperation) {
            await confirmOperation(); // Await the asynchronous operation
            onClose(); // Close the modal after the operation is done
        }
    };

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
    );
});

export default Modal;
