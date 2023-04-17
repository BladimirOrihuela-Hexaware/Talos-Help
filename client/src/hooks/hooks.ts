import { useDispatch } from "react-redux";
import type { AppDispatch } from "@services/store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();