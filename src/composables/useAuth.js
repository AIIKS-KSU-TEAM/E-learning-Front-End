import { ref } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";
import { useRouter } from "vue-router";

const useAuth = () => {
  const username = ref("");
  const password = ref("");
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axiosInstance.post("api/auth/token/", {
        username: username.value,
        password: password.value,
      });
      alert("Login successful");
      localStorage.setItem("token", response.data.access);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return {
    username,
    password,
    login,
  };
};

export default useAuth;
