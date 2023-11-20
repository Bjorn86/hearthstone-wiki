import { userValidationSchema } from 'shared/model/user-validation-schema';
import { registerUser } from 'features/auth/register';
import { logoutUser } from 'features/auth/logout';
import { loginUser } from 'features/auth/login';
import { COMMAND_REGEX, PARAMS_REGEX } from './constants';
import { messages } from './messages';

/* eslint-disable no-console */

const validateCredentials = (args) => {
  try {
    if (args && args[0] && args[1]) {
      const credentials = {
        email: args[0],
        password: args[1],
      };
      userValidationSchema.validateSync(credentials);
      return true;
    }
  } catch (e) {
    console.warn(e);
  }
  return false;
};

export const parseCommandString = (commandSting) => {
  const command = commandSting.match(COMMAND_REGEX);
  const params = commandSting.match(PARAMS_REGEX);
  const parsedParams = params?.map((p) => p.slice(1, -1).trim());
  return { command: String(command), params: parsedParams };
};

export const auth = (params, dispatch, type) => {
  if (params && params[0] && params[1]) {
    if (validateCredentials(params)) {
      const action =
        type === '/signin'
          ? loginUser({ email: params[0], password: params[1] })
          : registerUser({ email: params[0], password: params[1] });
      dispatch(action)
        .unwrap()
        .then((res) => console.log(`Привет, ${res.email}`))
        .catch((e) => console.warn(e));
    }
  } else {
    console.warn(messages.auth);
  }
};

export const logout = (dispatch) => {
  dispatch(logoutUser())
    .unwrap()
    .then(() => console.log(messages.goodbye))
    .catch((e) => console.warn(e));
};

export const showStart = () => {
  console.log(messages.welcome);
};

export const showHelp = () => {
  console.log(messages.help);
};

export const showNotFound = () => {
  console.warn(messages.notFound);
};

/* eslint-enable no-console */