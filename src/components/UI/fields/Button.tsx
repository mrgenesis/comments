import { Button, ButtonProps } from "@mui/material";

const UIButton: React.FC<ButtonProps> = ({ children, ...props }: ButtonProps) => {
  return <Button { ...props }>{children}</Button>
}
export default UIButton;
