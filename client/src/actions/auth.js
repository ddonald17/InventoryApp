import axios from "../api/axios";

export const signin = (formData, router) => async (dispatch) => {
    try {
      const { data } = await axios.post("/user/signin", formData);
  
      dispatch({ type: "AUTH", data });
  
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  
  export const signup = (formData, router) => async (dispatch) => {
    try {
      const { data } = await axios.post("/user/signup", formData);
  
      dispatch({ type: "AUTH", data });
  
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };