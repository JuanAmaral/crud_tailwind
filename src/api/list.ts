import { api } from "../services/api";
import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";

interface IError {
  detail: string;
  code?: string;
}

export const getUsers = async () => {
  try {
    const res = await api.get(`/data/`);
    return { data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { error: err as AxiosError<ApiError> };
    } else {
      return { error: err };
    }
  }
};

export const addUser = async (_name: string) => {
  try {
    const res = await api.post(`/data/`, { name: _name});
    return { data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { error: err as AxiosError<ApiError> };
    } else {
      return { error: err };
    }
  }
};

export const deleteUser = async (_id: number ) => {
  try {
    const res = await api.delete(`/data/${_id}` );
    return { data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { error: err as AxiosError<ApiError> };
    } else {
      return { error: err };
    }
  }
};

export const editUser = async (_id: number , _name: string ) => {
  try {
    const res = await api.put(`/data/${_id}` , {name:_name });
    return { data: res.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return { error: err as AxiosError<ApiError> };
    } else {
      return { error: err };
    }
  }
};