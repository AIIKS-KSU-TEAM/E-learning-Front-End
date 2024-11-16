import { ref } from "vue";
import axiosInstance from "@/axiosconfig/axiosInstance";
import { useRouter } from "vue-router";
import { useLocalStorage } from "@vueuse/core";

export default function useAuth() {
  const name = ref("");
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

      router.push("/subjects1");
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async () => {
    try {
      const response = await axiosInstance.post("api/register/", {
        name: name.value,
        email: email.value,
        password: password.value,
      });

      accessToken.value = response.data.access_token;
      refreshToken.value = response.data.refresh_token;

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("api/logout/", {
        refresh: accessToken.value,
      });

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    name,
    email,
    password,
    login,
    signup,
    logout,
  };
}
