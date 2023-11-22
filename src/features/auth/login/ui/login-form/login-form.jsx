import { useCallback } from 'react';
import { userValidationSchema } from 'shared/model/user-validation-schema';
import { useAuth } from 'features/auth/lib/use-auth';
import Input from 'shared/ui/input/input';
import Form from 'shared/ui/form/form';
import Info from 'shared/ui/info/info';

export function LoginForm() {
  const { isLoginLoading, loginError, handleAction } = useAuth();

  const handleSubmit = useCallback(
    ({ email, password }) => {
      handleAction({ email, password }, 'login');
    },
    [handleAction],
  );

  return (
    <>
      <Form
        formName='login'
        onSubmit={handleSubmit}
        buttonText='Sign in'
        validationSchema={userValidationSchema}
        isDisabled={isLoginLoading}
      >
        <Input
          inputId='email'
          inputType='text'
          formName='login'
          placeholder='Email'
          isDisabled={isLoginLoading}
        />
        <Input
          inputId='password'
          inputType='password'
          formName='login'
          placeholder='Password'
          isDisabled={isLoginLoading}
          withButton
        />
      </Form>
      {loginError && <Info message={loginError} />}
    </>
  );
}
