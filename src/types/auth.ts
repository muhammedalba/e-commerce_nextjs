import {
  ForgetPasswordForm,
  VerifyCodeForm,
  ResetPasswordForm,
} from "@/schemas/Auth/forgetPassSchema";


// ------------------------------
// Props مشتركة بين المكونات
// ------------------------------
export type CommonStepProps = {
  loading: boolean;
  label: string;
  loadingLabel: string;
  error: string;
  t: (key: string) => string;
};

// ------------------------------
// StepEmail Props
// ------------------------------
export type StepEmailProps = {
  onSubmit: (data: ForgetPasswordForm) => void;
  emailLabel: string;
} & CommonStepProps;

// ------------------------------
// StepCode Props
// ------------------------------
export type StepCodeProps = {
  onSubmit: (data: VerifyCodeForm) => void;
  codeLabel: string;
} & CommonStepProps;

// ------------------------------
// StepResetPassword Props
// ------------------------------
export type StepResetPasswordProps = {
  onSubmit: (data: ResetPasswordForm) => void;
  email: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  emailLabel: string;
} & CommonStepProps;

export interface AuthResponse {
  message: string;
  data: {
    avatar: string;
    name: string;
    role: string;
  };
}
