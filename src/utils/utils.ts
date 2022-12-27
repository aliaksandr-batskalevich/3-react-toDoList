import axios, {AxiosError} from "axios";

export const getErrorMessage = (error: Error | AxiosError): string => {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
        const text = error.response ? error.response.data.message : error.message;
        return text;
    }
    return JSON.stringify(error);
};