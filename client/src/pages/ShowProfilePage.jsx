import React, { useContext, useRef, useState, useCallback, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Modal from '../components/Modal'

import { UserContext } from '../contexts/UserProvider'
import { logoutUser, deleteUser } from '../api/userApi'

import classes from '../stlyes/Profile.module.css'
const { profCon, profImg, profDet, date, profModif, profConA, profConB } = classes


const ShowProfilePage = () => {
  const { user, setUser } = useContext(UserContext)
  const modalRef = useRef(null)
  const [modalType, setModalType] = useState({ title: '', message: '', confirmOperation: null });
  
  const navigate = useNavigate()

  const openModal = (type) => {
      let title, message, confirmOperation;

      if (type === 'logout') {
          title = "Log Out";
          message = "Are you sure you want to log out?";
          confirmOperation = async () => {
              const response = await logoutUser('logout');
              if (!response.error) {
                  setUser(null);
                  navigate('/auth/login');
              }
          };
      } else if (type === 'logoutAll') {
          title = "Log Out of All Devices";
          message = "Are you sure you want to log out of all devices?";
          confirmOperation = async () => {
            const response = await logoutUser('logoutAll');
            if (!response.error) {
              setUser(null);
              navigate('/auth/login');
            }
          };
      } else if (type === 'delete') {
          title = "Delete Account";
          message = "Are you sure you want to delete your account?";
          confirmOperation = async () => {
            const response = await deleteUser('me');
              if (!response.error) {
                setUser(null);
                navigate('/auth/login');
              }
          };
      }

      setModalType({ title, message, confirmOperation });
      modalRef.current.show();
  };

  const closeModal = () => {
      setModalType({ title: '', message: '', confirmOperation: null });
      modalRef.current.close();
  };

  console.log("in the show peofile page" , user)

  return (
    <div className={profCon}>
        <div className={profConA}>
          <div className={profImg}>Might be image</div>
          <div className={profDet}>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p id={date}><b>Account created at : </b>{user.createdAt}</p>
          </div>
        </div>
        <div className={profConB}>
          <div className={profModif}>
            <Link to='edit-profile'>Edit Profile</Link>
            <p>You have last edited your profile at {user.updatedAt}</p>
          </div>
          <div className={profModif}>
             <button onClick={() => openModal('logout')}>Log Out</button>
            <p>Log out from this decive.</p>
          </div>
          <div className={profModif}>
          <button onClick={() => openModal('logoutAll')}>Log Out All</button>
            <p>Log out from all the decives.</p>
          </div>
          <div className={profModif}>
            <button onClick={() => openModal('delete')}>Delete Account</button>
            <p>Delete your account permenentally.</p>
          </div>
          <Modal
            ref={modalRef}
            title={modalType.title}
            message={modalType.message}
            visible={modalType.title !== ''}
            onClose={closeModal}
            confirmOperation={modalType.confirmOperation}
          />
        </div>
    </div>
  )
}

export default ShowProfilePage
