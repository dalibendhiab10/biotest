import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id: number;
}

export const useIdUser = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return { userId: null };
  }

  const decodedToken = jwtDecode<CustomJwtPayload>(token);

  return { userId: decodedToken.id };
};
