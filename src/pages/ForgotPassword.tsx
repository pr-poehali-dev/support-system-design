import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";
import type { ForgotPasswordData } from "@/types";

const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Имитация отправки письма
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
      toast.success("Письмо с инструкциями отправлено на вашу почту!");
    } catch (error) {
      toast.error("Ошибка отправки. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="absolute top-4 left-4">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <Icon name="ArrowLeft" size={16} />
              Назад ко входу
            </Button>
          </Link>
        </div>

        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="Mail" size={32} className="text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              Письмо отправлено
            </CardTitle>
            <CardDescription className="text-base">
              Мы отправили инструкции по восстановлению пароля на адрес{" "}
              <span className="font-medium text-gray-900">
                {formData.email}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Не получили письмо? Проверьте папку "Спам" или{" "}
              <button
                onClick={() => setEmailSent(false)}
                className="text-primary hover:underline font-medium"
              >
                попробуйте снова
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <Link to="/login">
          <Button variant="ghost" size="sm" className="gap-2">
            <Icon name="ArrowLeft" size={16} />
            Назад ко входу
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="KeyRound" size={24} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Восстановление пароля
          </CardTitle>
          <CardDescription>
            Введите ваш email, и мы отправим инструкции по восстановлению
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icon
                    name="Loader2"
                    size={16}
                    className="mr-2 animate-spin"
                  />
                  Отправка...
                </>
              ) : (
                "Отправить инструкции"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Вспомнили пароль?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Войти в систему
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
