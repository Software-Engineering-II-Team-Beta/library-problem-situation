import axios from "axios";
import { ILoginRequestBody, ISuccesfulLoginResponse, ILoginResponseBody } from ".";
import { IError } from "../../types";

export async function login(loginInfo: ILoginRequestBody): Promise<ISuccesfulLoginResponse> {
    const response = await axios.post<ILoginResponseBody>("http://localhost:8000/auth/login", loginInfo);

    if ((response.data as IError).error) {
        throw (response.data as IError).error;
    }

    return response.data as ISuccesfulLoginResponse;
}
