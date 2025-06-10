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
import type { RegisterData } from "@/types";

const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Пароль должен содержать минимум 6 символов");
      return;
    }

    setIsLoading(true);

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Аккаунт успешно создан! Добро пожаловать!");
      // Здесь будет редирект на панель управления
    } catch (error) {
      toast.error("Ошибка регистрации. Попробуйте снова.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="UserPlus" size={24} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
          <CardDescription>
            Создайте аккаунт для доступа к системе поддержки
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
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
                  Создание аккаунта...
                </>
              ) : (
                "Создать аккаунт"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Войти
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
