/* ---------------------------------
APIGateway
--------------------------------- */

import axios, { AxiosError, AxiosResponse } from "axios";
import { ModelError } from "../gen/models";
import { log } from "../util";
import { InferredError } from "../types";

export default class APIGateway {
  private client: any;
  private readonly baseURL: string;
  private _authToken: string;

  get authToken(): string {
    return this._authToken;
  }

  set authToken(value: string) {
    this._authToken = value;
  }

  constructor(
    baseURL: string = process.env["NEXT_PUBLIC_API_HOST"],
    client = axios
  ) {
    this.client = client;
    this.baseURL = baseURL;
  }

  /**
   * getData
   * @param endpoint
   * @param opts
   */
  async getData(endpoint: string, opts?: Record<string, unknown>) {
    try {
      const response: AxiosResponse = await this.client.get(
        this.baseURL + endpoint,
        opts
      );

      return response?.data ?? {};
    } catch (err) {
      this.errorHandler(err, endpoint);
    }
  }

  /**
   * postData
   * @param endpoint
   * @param payload
   * @param opts
   */
  async postData(
    endpoint: string,
    payload: Record<string, unknown>,
    opts?: Record<string, unknown>
  ) {
    try {
      const response: AxiosResponse = await this.client.post(
        this.baseURL + endpoint,
        payload,
        opts
      );

      return response?.data ?? {};
    } catch (err) {
      this.errorHandler(err, endpoint);
    }
  }

  /**
   * putData
   * @param endpoint
   * @param payload
   * @param opts
   */
  async putData(
    endpoint: string,
    payload: Record<string, unknown>,
    opts?: Record<string, unknown>
  ) {
    try {
      const response: AxiosResponse = await this.client.put(
        this.baseURL + endpoint,
        payload,
        opts
      );

      return response?.data ?? {};
    } catch (err) {
      this.errorHandler(err, endpoint);
    }
  }

  /**
   * deleteData
   * @param endpoint
   * @param opts
   */
  async deleteData(endpoint: string, opts?: Record<string, unknown>) {
    // @ts-ignore
    try {
      const response: AxiosResponse = await this.client.delete(
        this.baseURL + endpoint,
        opts
      );

      return response?.data ?? {};
    } catch (err) {
      this.errorHandler(err, endpoint);
    }
  }

  /**
   * errorHandler
   * @param error
   * @param location
   */
  errorHandler(error: AxiosError<InferredError>, location?: string) {
    location &&
      console.error(`Error @${location}: ${error?.response?.statusText}`);

    throw error?.response?.data;
  }
}
