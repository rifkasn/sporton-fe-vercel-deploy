import { fetchAPI } from "../lib/api";
import { LoginCredentials, LoginResponse } from "../types";

export const login = async (
    credendentials: LoginCredentials,
): Promise<LoginResponse> => {
    const res = await fetchAPI<LoginResponse>("/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credendentials)
    });

    if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
    }

    return res;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};