import axios, { AxiosResponse } from "axios";

export default {
  async getAll(uri: string): Promise<AxiosResponse> {
    return await axios.get(`http://localhost/api/${uri}`, {
      responseType: "json",
    });
  },
  async post(uri: string, data: unknown): Promise<AxiosResponse> {
    return await axios.post(`http://localhost/api/${uri}`, data, {
      responseType: "json",
    });
  },
};
