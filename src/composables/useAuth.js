import { ref } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

const useAuth = () => {
  const username = ref("");
  const email = ref("");
  const password = ref("");
  const router = useRouter();

  const accessToken = useLocalStorage("access-token", null);
  const refreshToken = useLocalStorage("refresh-token", null);

  const login = async () => {
    try {
      const response = await axiosInstance.post("api/login/", {
        email: email.value,
        password: password.value,
      });

      accessToken.value = response.data.access_token;
      refreshToken.value = response.data.refresh_token;

      router.push("/dashboard"); // Correctly navigating to the dashboard
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return {
    username,
    email,
    password,
    login,
  };
};

export default useAuth;
