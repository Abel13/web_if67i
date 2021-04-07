import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ActionButtons, Container, Image, ImageContainer } from "./styles";
import { Button, DynamicContent, Input } from '../../atoms';
import {Form} from '@unform/web'
import { FiCamera, FiLogIn, FiSend, FiVideo } from "react-icons/fi";

const PostBox = ({handleSend, formRef}) => {
  const [file, setImage] = useState("");
 
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
      
        <DynamicContent visible={false}>
          <ImageContainer>
            <Image src={file}/>
          </ImageContainer>
        </DynamicContent>
        
        <ActionButtons>
          <Button buttonType="transparent">
            <FiCamera />
          </Button>
          <Button buttonType="transparent">
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
