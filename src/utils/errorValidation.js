import { object, ValidationError } from "yup";

export function errorValidation(err) {
  const ValidationErrors = {};

  err.inner.forEach((error) => {
    ValidationErrors[error.path] = error.message;
  });
  return ValidationErrors;
}

export function formatError(err) {
  const ValidationErrors = [];

  try {
    const { response } = err;
    const { data } = response;

    if (data.length > 0) {
      data.forEach((e) => {
        ValidationErrors.push({ message: e.message });
      });
    } else {
      ValidationErrors.push({
        message: "Ocorreu um erro ao executar a operação!",
      });
    }
  } catch (error) {
    console.log("ERROR", error);
    ValidationErrors.push({
      message: "Ocorreu um erro ao executar a operação!",
    });
  }
  return ValidationErrors;
}
