/* ---------------------------------
APIGateway
--------------------------------- */

import axios, { AxiosResponse } from "axios";
import { ModelError } from "../gen/models";
import { log } from "./utils";

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
      this.errorHandler(err);
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
      this.errorHandler(err);
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
      this.errorHandler(err);
    }
  }

  /**
   * errorHandler
   * @param error
   */
  errorHandler(error: ModelError) {
    console.error(error);

    throw new Error(error.message);
  }
}

/*
*
*
* export async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }
  const requestUrl = getStrapiURL(path)
  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}
*
* */
