import tw from "tailwind-styled-components";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const googleSuccess = async (res) => {
    // result is an object {email, familyName, givenName, googleId, imageUrl, name}
    const result = res?.profileObj;
    const token = res?.tokenId;

    console.log(result, token);
    try {
      // Login the user and redirect to home
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = e.target;
    console.log(name.value, email.value, password.value, confirmPassword.value);
  };
  return (
    <Wrapper>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <FormField>
              <Label>
                Name:
                <Input name="name" type="text" required />
              </Label>
            </FormField>
          )}
          <FormField>
            <Label>
              Email:
              <Input name="email" type="email" required />
            </Label>
          </FormField>
          <FormField>
            <Label>
              Password:
              <Input name="password" type="password" required />
            </Label>
          </FormField>
          {!isLogin && (
            <>
              <FormField>
                <Label>
                  Confirm Password:
                  <Input name="confirmPassword" type="password" required />
                </Label>
              </FormField>
              <FormField>
                <Label>
                  <CheckRestaurant name="isRestaurant" type="checkbox" />
                  &nbsp;Register for restaurant
                </Label>
              </FormField>
            </>
          )}
          <Submit type="submit">{isLogin ? "Login" : "Register"}</Submit>
          <GoogleLogin
            clientId="1086108074924-o6ah6lfd2f0htlj2eo48o019hosqjgpa.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleBtn
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login with Google
              </GoogleBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <ToggleForm onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </ToggleForm>
        </Form>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-gray-500 py-10
`;
const FormContainer = tw.div`
    max-w-sm bg-white text-black mx-auto p-5 rounded-lg
`;
const Form = tw.form``;
const FormField = tw.div`
    mb-4
`;
const Label = tw.label`
    ml-1
`;
const Input = tw.input`
    block rounded-lg bg-gray-200 w-full p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none
`;
const CheckRestaurant = tw.input`
    h-5 w-5 bottom-0
`;
const Submit = tw.button`
    bg-blue-400 w-max px-4 py-2 mt-6 rounded-lg hover:bg-blue-500
`;
const ToggleForm = tw.button`
    bg-gray-100 px-2 py-1 rounded
`;
const GoogleBtn = tw.button`
    bg-blue-400 w-max px-4 py-2 mt-6 rounded-lg hover:bg-blue-500
`;
