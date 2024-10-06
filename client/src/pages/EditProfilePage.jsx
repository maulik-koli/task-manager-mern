import React, { useState, useRef } from 'react'

import InputContainer from '../components/InputContainer';

import { editUser } from '../api/userApi';

import EditIcon from '@mui/icons-material/Edit';
import classes from '../stlyes/Profile.module.css'
const { profCon, changeCon, editConA, editConB, editCon, editConZ, editInput, editBtns, editIconWrapper } = classes


const EditProfilePage = () => {
  const [inputConState, setInputConState] = useState(null)

  const nameIp = useRef(null)
  const emailIp = useRef(null)
  const passwordIp = useRef(null)
  const confirmPasswordIp = useRef(null)

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

    if (nameIp.current) sendData.name = nameIp.current.value
    if (emailIp.current) sendData.email = emailIp.current.value
    if (passwordIp.current && confirmPasswordIp.current) {
      if( passwordIp.current.value === confirmPasswordIp.current.value){
        sendData.password = passwordIp.current.value;
      }
      else{
        // set error message here
      }
    }
      
    console.log(sendData);
    const url = "http://localhost:3000/users/me"
    const result = await editUser(url, sendData)
    console.log(result)
    // setInputConState(null);
  };

  return (
    <div className={profCon}>
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
          <p>Error message will be here</p>
          <div className={editConB}>
            {inputConState}
            {inputConState && 
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
