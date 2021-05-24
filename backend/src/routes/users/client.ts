import { ICreateUserRequestBody, ICreateUserResponseBody, ICreateUserSuccesfulResponse } from ".";
import { IError } from "../../types";
import client from "../../_test/client";

export async function createUser(user: ICreateUserRequestBody): Promise<ICreateUserSuccesfulResponse> {
    const response = await client.post<ICreateUserResponseBody>("http://localhost:8000/users", user);

    if ((response.data as IError).error) {
        throw (response.data as IError).error;
    }

    return response.data as ICreateUserSuccesfulResponse;
}
