import { Routes } from "@common/constants";
import { RootState } from "@services/store";

export const getSelectedRoute = ({ navigation }: RootState): Routes => {
    return navigation.selected;
};

export const isToggleOpen = ({ navigation }: RootState): boolean => {
    return navigation.openActionsList;
};
