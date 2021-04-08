import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ActionButtons, Container, Image, ImageContainer } from "./styles";
import { Button, DynamicContent, Input } from '../../atoms';
import {Form} from '@unform/web'
import { FiCamera, FiLogIn, FiSend, FiVideo } from "react-icons/fi";
import api from '../../../services/api';


const PostBox = ({ handleSend, handleGetImage, formRef, file }) => {
  const inputImage = useRef(null);
  const inputVideo = useRef(null);
 
  const handleSubmit = async (data, { reset }) => {
    await handleSend(data);
    reset();
  }

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        >
        <Input name="post" placeholder={"Qual seu mood hoje?"} />
      
        <DynamicContent visible={file}>
          <ImageContainer>
            <Image src={file}/>
          </ImageContainer>
        </DynamicContent>
        
        <ActionButtons>
          <input type='file' accept={"image/*"} id='file' onChange={handleGetImage} ref={inputImage} style={{ display: 'none' }} />
          <input type='file' accept={"video/*"} id='file' onChange={handleGetImage} ref={inputVideo} style={{display: 'none'}}/>
          <Button
            buttonType="transparent"
            onClick={() => {
              inputImage.current.click()
            }}>
            <FiCamera />
          </Button>
          <Button
            buttonType="transparent"
            onClick={() => {
              inputVideo.current.click()
            }}>
            <FiVideo />
          </Button>
          <Button buttonType="transparent" type="submit" >
            <FiSend />
          </Button>
        </ActionButtons>
      </Form>
    </Container>
  );
};

export default PostBox;
