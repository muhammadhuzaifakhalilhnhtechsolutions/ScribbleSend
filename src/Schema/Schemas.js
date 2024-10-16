import * as yup from 'yup';
const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const reg =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,16}$/;

export const SignupSchema = yup.object({
  email: yup.string().email().required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(8)
    .matches(
      reg,
      'Password must be between 8-16 characters long. e.g(Aa12@#).',
    ),
  confrimPassword: yup
    .string()
    .min(8)
    .required('Please enter your password')
    .oneOf([yup.ref('password'), null], "Passwords doesn't match "),
  firstName: yup.string().min(3).required('Please enter your first name'),
  lastName: yup.string().min(3).required('Please enter your last name'),
});

export const LoginSchema = yup.object({
  email: yup.string().email().required('Please enter your email'),
  password: yup.string().required('Please enter your password'),
});

export const ForgotEmail = yup.object({
  email: yup.string().email().required('Please enter your email'),
});

export const ChangePasswordSchema = yup.object({
  currentPassword: yup.string().required('Please enter your password'),
  newPassword: yup
    .string()
    .min(8)
    .required('Please enter your password')
    .matches(
      reg,
      'Password must be between 8-16 characters long. e.g(Aa12@#).',
    ),
  confirmPassword: yup
    .string()
    .min(8)
    .required('Please enter your password')
    .oneOf([yup.ref('newPassword'), null], "Passwords doesn't match "),
});

export const ResetPasswordSchema = yup.object({
  new_password: yup
    .string()
    .min(8)
    .required('Please enter your password')
    .matches(
      reg,
      'Password must be between 8-16 characters long. e.g(Aa12@#).',
    ),
  confrimPassword: yup
    .string()
    .min(8)
    .required('Please enter your password')
    .oneOf([yup.ref('new_password'), null], "Passwords doesn't match "),
});
