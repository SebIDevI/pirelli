import { AlertCircle } from "lucide-react";

export const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="bg-destructive flex items-center text-sm font-medium gap-2 text-secondary-foreground my-4 p-3 rounded-md">
      <AlertCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
