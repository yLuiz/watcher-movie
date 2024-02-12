import { APP_ROUTES } from "@/constants/app-router";

export default function useCheckPublicRoute(path: string) {
    return APP_ROUTES.public.includes(path);
}