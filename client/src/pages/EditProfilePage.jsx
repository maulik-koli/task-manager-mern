import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import InputContainer from '../components/InputContainer';

import { useUser } from '../hooks/useUser';
import { editUser } from '../api/userApi';
import { ErrorAndFetchingContext } from '../contexts/ErrorAndFetchingProvider';

import EditIcon from '@mui/icons-material/Edit';
import classes from '../stlyes/Profile.module.css'
import AlertMessage from '../components/AlertMessage';
const { profCon, changeCon, editConA, editConB, editCon, editConZ, editInput, editBtns, editIconWrapper } = classes

const EditProfilePage = () => {
  const { fetchUser } = useUser()
  const { errorMessage, setErrorMessage } = useContext(ErrorAndFetchingContext)
  const [inputConState, setInputConState] = useState(null)

  const nameIp = useRef(null)
  const emailIp = useRef(null)
  const passwordIp = useRef(null)
  const confirmPasswordIp = useRef(null)

  const navigate = useNavigate()

  const handleEditIcon = (lable, type, name) => {
    if (name === "password") {
      setInputConState(
        <>
          <InputContainer
            className={editInput}
            ref={passwordIp}
            lable='New Password'
            type={type}
            name={name}
            required
          />
          <InputContainer
            className={editInput}
            ref={confirmPasswordIp}
            lable='Confirm Password'
            type={type}
            name='confirm-password'
            required
          />
        </>
      )
    } 
    else {
      setInputConState(
        <InputContainer 
          className={editInput}
          ref={name === 'name' ? nameIp : emailIp}
          lable={lable}
          type={type}
          name={name}
          required
        />
      )
    }
  }

  const handleSubmitData = async () => {
    const sendData = {};

    try{ 
      if (nameIp.current) sendData.name = nameIp.current.value
      if (emailIp.current) sendData.email = emailIp.current.value
      if (passwordIp.current && confirmPasswordIp.current) {
      if( passwordIp.current.value === confirmPasswordIp.current.value){
        sendData.password = passwordIp.current.value;
      }
      else{
        throw new Error('Password do not match!')
      }
    }

      console.log(sendData);

      const BASE_URL = "me"
      const result = await editUser(BASE_URL, sendData)
      if(result.error){
        throw new Error(result.error || "Something went wrong.")
      }

      console.log(result)
      await fetchUser()
      setErrorMessage(null)
      navigate('..')
    }
    catch(e){
      setErrorMessage(e.message)
    }
    finally{
      // setInputConState(null);
    }
  };

  return (
    <div className={profCon}>
      {errorMessage && <AlertMessage />}
      <div className={editCon}>
        <div className={editConZ}><h1>Edit Profile</h1></div>
          <div className={editConA}>
            <div className={changeCon}>
              <p>Change Name</p>
              <div className={editIconWrapper} onClick={() => handleEditIcon('Name', 'text', 'name')}>
                <EditIcon />
              </div>
            </div>
            <div className={changeCon}>
              <p>Change Email</p>
              <div className={editIconWrapper} onClick={() => handleEditIcon('Email', 'email', 'email')}>
                <EditIcon />
              </div>
            </div>
            <div className={changeCon}>
              <p>Change Password</p>
              <div className={editIconWrapper} onClick={() => handleEditIcon('Password', 'password', 'password')}>
                <EditIcon />
              </div>
            </div>
          </div>
          <div className={editConB}>
            {inputConState}
            {(inputConState)  && 
              <div className={editBtns}>
                <button type='button' onClick={handleSubmitData}>Submit</button>
                <button type='button'>Cancle</button>
              </div>
            }
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage
