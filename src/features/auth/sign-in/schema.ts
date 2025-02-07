import * as yup from 'yup';

import { messages } from '@shared/constants/authentication-error-messages';

export const schema = yup.object({
  email: yup.string().email(messages.email).required(messages.emailRequired),
  password: yup.string().min(6, messages.passwordShort).required(messages.passwordRequired),
});
