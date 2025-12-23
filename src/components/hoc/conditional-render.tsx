import { JSX, ReactNode } from "react";

interface Props extends React.PropsWithChildren {
  condition: boolean;
  wrapper: (children: ReactNode | undefined) => JSX.Element;
}

export default function ConditionalRender({ condition, wrapper, children }: Props) {
  return condition ? wrapper(children) : children;
}
