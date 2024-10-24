import React, { useState, useRef, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import InputContainer from '../components/InputContainer';
import AlertMessage from '../components/AlertMessage';

import { UserContext } from '../contexts/UserProvider';
import { editUser } from '../api/userApi';
import { isValidPassword } from '../utils/fuctions';

import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import classes from '../styles/Profile.module.css'
const { profCon, changeCon, editConA, editConB, editCon, editConZ, editInput, editBtns, editIconWrapper } = classes

const EditProfilePage = () => {
  const { fetchUser, userResponse, setUserResponse } = useContext(UserContext)
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
        if ( passwordIp.current.value !== confirmPasswordIp.current.value) {
          throw new Error('Password do not match!')
        }
        else if (!isValidPassword(passwordIp.current.value)) {
          throw new Error("Passwrod must have minimum 8 length.\nPasswrod must have atleast one number.\nPasswrod must have arleast one special character.")
        }
        else{
          sendData.password = passwordIp.current.value;
        }
      }

      if(Object.keys(sendData).length === 0){
        throw new Error("Please enter value to update.")
      }
      
      const BASE_URL = "me"
      const result = await editUser(BASE_URL, sendData)
      if(result.error){
        throw new Error(result.error || "Something went wrong.")
      }

      console.log(result)
      await fetchUser()
      setUserResponse(null)
      navigate('..')
    }
    catch(e){
      setUserResponse(e.message)
    }
  };

  return (
    <div className={profCon}>
      {userResponse && <AlertMessage />}
      <div className={editCon}>
        <div className={editConZ}><h1>Edit Profile</h1><Link to='..'><ArrowBackIcon /></Link></div>
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
