export interface Props {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
