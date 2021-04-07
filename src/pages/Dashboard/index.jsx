import { Container, Body, SearchContainer } from "./styles";
import { Header, PostBox, Timeline } from "../../components/molecules";
import { Button, DynamicContent, Input, ScrollView } from "../../components/atoms";
import { Post } from "../../components/organisms";
import { Form } from "@unform/web";
import { FiSearch } from "react-icons/fi";
import { usePost } from "../../hooks/Post";
import { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import api from "../../services/api";
import { errorValidation, formatError } from "../../utils/errorValidation";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Dashboard = () => {
  const { posts, getPosts, getFilter, postMood } = usePost();
  const formRef = useRef();
  const searchRef = useRef();


  useEffect(() => {
    getPosts();
  }, []);

  const handleSearch = async (data) => {
    getFilter(data);
  }

   
  const handlePost = async (data) => {
    try {
      formRef.current?.setErrors([]);
      const schema = Yup.object().shape({
        post: Yup.string()
          .required("Mood não pode estar vazio!")
      });

      await schema.validate(data, { abortEarly: false });

      postMood(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = errorValidation(err);

        formRef.current?.setErrors(errors);
        return;
      }

      const errors = formatError(err);

      Toast.fire({
        icon: "error",
        title: errors[0].message,
      });
    }
  }

  return (
    <Container>
      <Header exitButtonVisible profileVisible />
      <ScrollView>
        <Timeline>
          {/* <DynamicContent visible={posts && posts.length > 0}> */}
            <Form
              formRef={searchRef}
              onSubmit={handleSearch}
              >
              <SearchContainer>
                <Input name="search" placeholder={"Qual mood você deseja buscar?"} />
                <Button buttonType="transparent" type="submit">
                  <FiSearch/>
                </Button>
              </SearchContainer>
            </Form>
          {/* </DynamicContent> */}
          <PostBox formRef={formRef} handleSend={handlePost}/>
          
          {posts && posts.map((post) => {
            return <Post key={post.secure_id} text={post.text} file={post.file} date={post.date} user={post.user}/>
          })}
        </Timeline>
      </ScrollView>
    </Container>
  );
};

export default Dashboard;
