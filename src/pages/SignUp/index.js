import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import { errorValidation, formatError } from "../../utils/errorValidation";

import { Input, Button } from "../../components/atoms";
import { Container, Content, AnimationContainer } from "./styles";
import api from "../../services/api";

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

const SignUp = () => {
  const formRef = useRef(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors([]);
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-Mail obrigatório")
            .email("E-Mail inválido"),
          password: Yup.string().required("Senha obrigatória"),
          confirmPassword: Yup.string()
            .required("Confirmação de senha obrigatória")
            .oneOf([Yup.ref("password"), ""], "Senhas não conferem"),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post("/users", {
          name: data.name,
          email: data.email,
          password: data.password,
        });

        history.push("/");

        Toast.fire({
          icon: "success",
          title: "Cadastro realizado com sucesso!",
        });
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
    },
    [history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form
            ref={formRef}
            initialData={{ name: "" }}
            onSubmit={handleSubmit}
          >
            <h1>{"CADASTRO"}</h1>

            <Input name="name" leftIcon={FiUser} placeholder={"Nome"} />
            <Input name="email" leftIcon={FiMail} placeholder={"E-Mail"} />
            <Input
              name="password"
              leftIcon={FiLock}
              type="password"
              placeholder={"Senha"}
            />
            <Input
              name="confirmPassword"
              leftIcon={FiLock}
              type="password"
              placeholder={"Confirmação de senha"}
            />

            <Button testid="ButtonSignIn" type="submit">
              {"Cadastrar"}
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            {"Voltar"}
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
