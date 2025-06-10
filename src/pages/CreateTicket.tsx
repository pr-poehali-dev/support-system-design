import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { TicketCategory, TicketPriority } from "@/types";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "" as TicketCategory | "",
    priority: "medium" as TicketPriority,
  });
  const [attachments, setAttachments] = useState<File[]>([]);

  const categories = [
    { value: "access_issue", label: "Проблема с доступом" },
    { value: "system_error", label: "Системная ошибка" },
    { value: "feature_request", label: "Запрос функции" },
    { value: "other", label: "Другое" },
  ];

  const priorities = [
    { value: "low", label: "Низкий", description: "Несрочные вопросы" },
    { value: "medium", label: "Средний", description: "Обычные проблемы" },
    { value: "high", label: "Высокий", description: "Влияет на работу" },
    { value: "urgent", label: "Срочный", description: "Критические проблемы" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setIsSubmitting(true);

    try {
      // Имитация отправки данных
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // В реальном приложении здесь был бы API-запрос
      console.log("Создание обращения:", {
        ...formData,
        attachments: attachments.map((f) => ({ name: f.name, size: f.size })),
      });

      alert("Обращение успешно создано!");
      navigate("/tickets");
    } catch (error) {
      alert("Ошибка при создании обращения");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Создать обращение
          </h1>
          <p className="text-gray-600 mt-2">
            Опишите вашу проблему или запрос, и мы поможем вам в кратчайшие
            сроки
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="FileText" size={20} />
                <span>Основная информация</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Тема обращения *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Кратко опишите проблему..."
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Описание проблемы *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Подробно опишите проблему или запрос. Укажите шаги для воспроизведения, если применимо..."
                  rows={6}
                  className="mt-1"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Чем подробнее описание, тем быстрее мы сможем помочь
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Категория *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Приоритет</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      handleInputChange("priority", value as TicketPriority)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div>
                            <div className="font-medium">{priority.label}</div>
                            <div className="text-xs text-gray-500">
                              {priority.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Attachments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="Paperclip" size={20} />
                <span>Вложения</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesChange={setAttachments}
                maxFiles={5}
                maxFileSize={10 * 1024 * 1024} // 10MB
                acceptedTypes={[
                  "image/*",
                  ".pdf",
                  ".doc",
                  ".docx",
                  ".txt",
                  ".log",
                ]}
              />
              <p className="text-sm text-gray-500 mt-2">
                Приложите скриншоты, логи или другие файлы, которые помогут нам
                понять проблему
              </p>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/tickets")}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Создание...
                </>
              ) : (
                <>
                  <Icon name="Send" size={16} className="mr-2" />
                  Создать обращение
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTicket;
