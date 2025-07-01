interface InputErrorProps {
  message?: string;
}

export default function InputError({ message }: InputErrorProps) {
  if (!message) return null;
  return <div className="text-danger">{message}</div>;
}
