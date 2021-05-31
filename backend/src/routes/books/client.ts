import { ICreateBookRequestBody, ICreateBookResponseBody, ICreateBookSuccesfulResponse } from ".";
import { IError } from "../../types";
import client from "../../_test/client";

export async function createBook(book: ICreateBookRequestBody, token: string): Promise<ICreateBookSuccesfulResponse> {
    const response = await client.post<ICreateBookResponseBody>("/books", book, {headers: {'Authorization': token}});

    if ((response.data as IError).error) {
        throw (response.data as IError).error;
    }

    return response.data as ICreateBookSuccesfulResponse;
}



