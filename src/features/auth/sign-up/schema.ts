import * as yup from 'yup';

import { messages } from '@shared/constants/authentication-error-messages';

export const schema = yup.object({
  email: yup.string().email(messages.email).required(messages.emailRequired),
  name: yup.string().required(messages.name),
  password: yup.string().required(messages.passwordRequired).min(6, messages.passwordShort),
  confirmPassword: yup
    .string()
    .required(messages.passwordShort)
    .oneOf([yup.ref('password')], messages.passwordsNotMatch),
});
