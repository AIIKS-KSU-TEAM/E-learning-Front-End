import { ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/axiosconfig/axiosInstance";
export default function useLogout() {
  const router = useRouter();
  const isAuthenticated = ref(true);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axiosInstance.post("api/logout/", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        isAuthenticated.value = false;

        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return {
    logout,
    isAuthenticated,
  };
}
