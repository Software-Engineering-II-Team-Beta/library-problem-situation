import { ILoginRequestBody, ISuccesfulLoginResponse, ILoginResponseBody } from ".";
import { IError } from "../../types";
import client from "../../_test/client";

export async function login(loginInfo: ILoginRequestBody): Promise<ISuccesfulLoginResponse> {
    const response = await client.post<ILoginResponseBody>("http://localhost:8000/auth/login", loginInfo);

    if ((response.data as IError).error) {
        throw (response.data as IError).error;
    }

    return response.data as ISuccesfulLoginResponse;
}
