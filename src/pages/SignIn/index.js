import React, { useCallback, useRef, useState } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/Auth";
import { errorValidation, formatError } from "../../utils/errorValidation";
import { Content, AnimationContainer, Container } from "./styles";
import { Button, Input } from "../../components/atoms";

import { Form } from "@unform/web";

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

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(async (data) => {
    setLoading(true);
    try {
      formRef.current?.setErrors([]);
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("Email obrigatório")
          .email("Email inválido"),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email,
        password: data.password,
      });

      Toast.fire({
        icon: "success",
        title: "Seja bem vindo!",
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = errorValidation(err);

        formRef.current?.setErrors(errors);
        setLoading(false);
        return;
      }

      const errors = formatError(err);

      Toast.fire({
        icon: "error",
        title: errors[0].message,
      });
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{"LOGIN"}</h1>
            <Input name="email" leftIcon={FiMail} placeholder={"E-Mail"} />
            <Input
              name="password"
              leftIcon={FiLock}
              type="password"
              placeholder={"Senha"}
            />

            <Button testid="ButtonSignIn" type="submit" loading={loading}>
              {"ENTRAR"}
            </Button>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            {"Cadastrar"}
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
