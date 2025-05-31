import classNames from "classnames";

export function cn(...inputs: classNames.Argument[]) {
  return classNames(...inputs);
}
