import tw from "tailwind-styled-components";
import { useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import axios from "axios";
import AuthContext from "../contexts/authContext";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isHotel, setIsHotel] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  const googleSuccess = async (res) => {
    // result is an object {email, familyName, givenName, googleId, imageUrl, name}
    const { name, email, googleId } = res?.profileObj;
    // const token = res?.tokenId;

    try {
      // Login the user and redirect to home
      if (isHotel) {
        axios
          .post("/api/hotel/google", { name, email, password: googleId })
          .then((res) => {
            console.log(res);
            const newUser = {
              data: res.data.hotelData,
              isHotel: true,
              token: res.data.token,
            };
            setUser(newUser);
            localStorage.setItem("profile", JSON.stringify(newUser));
            router.push("/hotel/dashboard");
          });
      } else {
        axios
          .post("/api/user/google", { name, email, password: googleId })
          .then((res) => {
            console.log(res);
            const newUser = {
              data: res.data.userData,
              isHotel: false,
              token: res.data.token,
            };
            setUser(newUser);
            localStorage.setItem("profile", JSON.stringify(newUser));
            router.push("/");
          });
      }
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
    const data = {
      name: name?.value,
      email: email?.value,
      password: password?.value,
      confirmPassword: confirmPassword?.value,
    };

    if (isHotel) {
      submitData("hotel", data);
    } else {
      submitData("user", data);
    }
  };

  const submitData = (route, { name, email, password, confirmPassword }) => {
    if (isLogin) {
      // Login
      axios
        .post(`api/${route}/login`, {
          email,
          password,
        })
        .then((res) => {
          if (isHotel) {
            const newUser = {
              data: res.data.hotelData,
              isHotel: true,
              token: res.data.token,
            };
            setUser(newUser);
            localStorage.setItem("profile", JSON.stringify(newUser));
            router.push("/hotel/dashboard");
          } else {
            const newUser = {
              data: res.data.userData,
              isHotel: false,
              token: res.data.token,
            };
            setUser(newUser);
            localStorage.setItem("profile", JSON.stringify(newUser));
            router.push("/");
          }
        });
    } else {
      // Register
      if (password !== confirmPassword) {
        setError("Password does not match");
        return;
      }
      axios
        .post(`api/${route}/register`, {
          name,
          email,
          password,
        })
        .then((res) => {
          if (isHotel) {
            const newUser = {
              data: res.data.hotelData,
              isHotel: true,
              token: res.data.token,
            };
            setUser(newUser);
            localStorage.setItem("profile", JSON.stringify(newUser));
            router.push("/hotel/dashboard");
          } else {
            const newUser = {
              data: res.data.userData,
              isHotel: false,
              token: res.data.token,
            };
            setUser(newUser);
            localStorage.setItem("profile", JSON.stringify(newUser));
            router.push("/");
          }
        });
    }
  };

  return (
    <Wrapper>
      <UserType>
        <TypeSelect selected={!isHotel} onClick={() => setIsHotel(false)}>
          Customer
        </TypeSelect>
        <TypeSelect selected={isHotel} onClick={() => setIsHotel(true)}>
          Restaurant
        </TypeSelect>
      </UserType>
      <FormContainer>
        <FormHeader>{isLogin ? "Login" : "Register"}</FormHeader>
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
            <FormField>
              <Label>
                Confirm Password:
                <Input name="confirmPassword" type="password" required />
                <ErrorBox>{error}</ErrorBox>
              </Label>
            </FormField>
          )}
          <Submit type="submit">{isLogin ? "Login" : "Register"}</Submit>
          <GoogleLogin
            clientId="1086108074924-o6ah6lfd2f0htlj2eo48o019hosqjgpa.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleBtn
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <span>
                  <svg
                    style={{ width: "20px", height: "20px" }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                    />
                  </svg>
                </span>
                &nbsp;&nbsp;Login with Google
              </GoogleBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </Form>
        <ToggleForm onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </ToggleForm>
      </FormContainer>
    </Wrapper>
  );
}

const Wrapper = tw.div`
    bg-gray-200 py-10 h-screen pt-24
`;
const UserType = tw.div`
  mx-auto w-max space-x-4 mb-5
`;
const TypeSelect = tw.span`
  cursor-pointer px-4 py-2 rounded-lg
  ${(p) => (p.selected ? "bg-blue-500 text-xl" : "bg-gray-400")}
`;
const FormHeader = tw.div`
    text-center font-bold text-2xl my-2
`;
const FormContainer = tw.div`
    max-w-sm bg-white text-black mx-auto p-5 rounded-lg shadow-lg
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
const Submit = tw.button`
    flex bg-blue-400 w-max px-4 py-2 mt-7 rounded-lg hover:bg-blue-500 mx-auto
`;
const ToggleForm = tw.button`
    hover:bg-gray-200 px-2 py-1 rounded mt-4
`;
const GoogleBtn = tw.button`
    flex mt-4 items-center mx-auto bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500
`;
const ErrorBox = tw.span`
  text-sm text-red-600
`;
