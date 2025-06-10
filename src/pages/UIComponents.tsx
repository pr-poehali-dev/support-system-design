import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { toast } from "sonner";

const UIComponents = () => {
  const navigate = useNavigate();
  const [switchValue, setSwitchValue] = useState(false);
  const [progressValue, setProgressValue] = useState(33);

  const showToast = () => {
    toast.success("Пример уведомления", {
      description: "Это демонстрация toast уведомления",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              UI Компоненты
            </h1>
            <p className="text-gray-600">
              Демонстрация всех используемых UI компонентов в системе
            </p>
          </div>

          <div className="grid gap-6">
            {/* Кнопки */}
            <Card>
              <CardHeader>
                <CardTitle>Кнопки</CardTitle>
                <CardDescription>Различные варианты кнопок</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => navigate("/design-system")}>
                    По умолчанию
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/design-system")}
                  >
                    Вторичная
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/design-system")}
                  >
                    Контурная
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/design-system")}
                  >
                    Призрачная
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => navigate("/design-system")}
                  >
                    Деструктивная
                  </Button>
                  <Button size="sm" onClick={() => navigate("/design-system")}>
                    Маленькая
                  </Button>
                  <Button size="lg" onClick={() => navigate("/design-system")}>
                    Большая
                  </Button>
                  <Button disabled>Отключенная</Button>
                </div>
              </CardContent>
            </Card>

            {/* Формы */}
            <Card>
              <CardHeader>
                <CardTitle>Элементы форм</CardTitle>
                <CardDescription>
                  Поля ввода и элементы управления
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 max-w-md">
                  <div>
                    <Label htmlFor="demo-input">Поле ввода</Label>
                    <Input id="demo-input" placeholder="Введите текст..." />
                  </div>

                  <div>
                    <Label htmlFor="demo-textarea">Многострочное поле</Label>
                    <Textarea
                      id="demo-textarea"
                      placeholder="Введите описание..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="demo-select">Выпадающий список</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите опцию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Опция 1</SelectItem>
                        <SelectItem value="option2">Опция 2</SelectItem>
                        <SelectItem value="option3">Опция 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Чекбоксы и переключатели */}
            <Card>
              <CardHeader>
                <CardTitle>Переключатели</CardTitle>
                <CardDescription>
                  Чекбоксы, радиокнопки и переключатели
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Согласен с условиями</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={switchValue}
                      onCheckedChange={setSwitchValue}
                    />
                    <Label>
                      Переключатель: {switchValue ? "Включен" : "Выключен"}
                    </Label>
                  </div>

                  <RadioGroup defaultValue="option1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="r1" />
                      <Label htmlFor="r1">Первая опция</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="r2" />
                      <Label htmlFor="r2">Вторая опция</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Бейджи и индикаторы */}
            <Card>
              <CardHeader>
                <CardTitle>Бейджи и индикаторы</CardTitle>
                <CardDescription>Статусы и прогресс-бары</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge>По умолчанию</Badge>
                    <Badge variant="secondary">Вторичный</Badge>
                    <Badge variant="destructive">Критический</Badge>
                    <Badge variant="outline">Контурный</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Прогресс</Label>
                      <span className="text-sm text-gray-500">
                        {progressValue}%
                      </span>
                    </div>
                    <Progress value={progressValue} />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setProgressValue(Math.max(0, progressValue - 10))
                        }
                      >
                        -10%
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setProgressValue(Math.min(100, progressValue + 10))
                        }
                      >
                        +10%
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Иконки */}
            <Card>
              <CardHeader>
                <CardTitle>Иконки</CardTitle>
                <CardDescription>Часто используемые иконки</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-4">
                  {[
                    "Home",
                    "User",
                    "Settings",
                    "Bell",
                    "Mail",
                    "Phone",
                    "Calendar",
                    "Clock",
                    "Check",
                    "X",
                    "Plus",
                    "Minus",
                    "Search",
                    "Filter",
                    "Download",
                    "Upload",
                    "Edit",
                    "Trash",
                  ].map((iconName) => (
                    <div
                      key={iconName}
                      className="flex flex-col items-center gap-2 p-3 border rounded-lg"
                    >
                      <Icon name={iconName as any} size={24} />
                      <span className="text-xs text-gray-500">{iconName}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Разделители и уведомления */}
            <Card>
              <CardHeader>
                <CardTitle>Разделители и уведомления</CardTitle>
                <CardDescription>Элементы интерфейса</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm mb-2">Горизонтальный разделитель:</p>
                    <Separator />
                  </div>

                  <div>
                    <Button onClick={() => navigate("/design-system")}>
                      <Icon name="Bell" size={16} className="mr-2" />
                      Показать уведомление
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIComponents;
