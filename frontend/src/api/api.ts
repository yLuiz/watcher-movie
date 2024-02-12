'use client';

import BASE_URL from "@/constants/base-url";
import axios from "axios";

export const api = axios.create({
    baseURL: BASE_URL
});