import { Location } from "history";

export interface ITokens {
  refreshToken: string;
  accessToken: string;
}

export interface IStringObject {
  [key: string]: string
}

export interface IInput {
  name: string;
  value: string;
}

export interface ILocation {
  from?: Location;
  background?: Location;
  state?: Location;
}

export interface IBurgerConstructorItemProps {
  item: IBurgerIngredient;
  icon?: boolean;
  isLocked?: boolean;
  type?: 'top' | 'bottom' | undefined;
  handleClose?: () => void;
  index?: number;
}

export interface IBurgerConstructorPreviewProps {
  canDrop: boolean;
  isOver: boolean;
  text?: string;
  classes?: string;
  type?: string | undefined;
}

export interface ITabNode {
  name: string;
  $el: HTMLElement | null;
}

export interface ICheckoutProps {
  totalPrice?: number;
  orderList?: string[] | undefined;
}

export interface IFormProps {
  title?: string;
  button?: string;
  load?: boolean;
  info?: JSX.Element;
  onSubmit?: () => void;
}

export interface IIngredientListProps {
  id: string;
  title: string;
  list: IBurgerIngredient[],
  count?: {[key: string]: number},
}

export interface IIngredientItemProps {
  item: IBurgerIngredient,
  count?: {[key: string]: number},
}

export interface IBurgerIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IModalProps {
  title?: string,
  classes?: string,
  close: () => void,
}

export interface INavbarLink {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
}

export interface IOrderDetailsProps {
  number: number;
  name: string;
}

export interface IProtectedRouteProps {
  path: string;
  exact?: boolean;
}

export interface IIconButtonProps {
  icon: JSX.Element;
  path: string;
}

export interface ITabsProps {
  tabs: string[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}
