export interface Props {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
