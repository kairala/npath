"use client";

import axios from "axios";
import { toast } from "react-toastify";

const mainInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

mainInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

mainInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error?.response?.status === 401) {
      toast.dismiss();
    }

    return new Promise((_, reject) => {
      reject(error.response);
    });
  }
);

export { mainInstance };
