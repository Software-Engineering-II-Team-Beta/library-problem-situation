import axios from "axios";
import { ICreateUserRequestBody, ICreateUserResponseBody, ICreateUserSuccesfulResponse } from ".";
import { IError } from "../../types";

export async function createUser(user: ICreateUserRequestBody): Promise<ICreateUserSuccesfulResponse> {
    const response = await axios.post<ICreateUserResponseBody>("http://localhost:8000/users", user);

    if ((response.data as IError).error) {
        throw (response.data as IError).error;
    }

    return response.data as ICreateUserSuccesfulResponse;
}
