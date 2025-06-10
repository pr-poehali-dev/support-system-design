import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { Ticket, Comment } from "@/types";

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    // Имитация загрузки данных
    const mockTicket: Ticket = {
      id: id || "T-001",
      title: "Не могу войти в систему",
      description:
        'При попытке входа в систему появляется ошибка "Неверные учетные данные", хотя пароль точно правильный. Проблема возникла после последнего обновления системы. Пробовал очистить кэш браузера и использовать разные браузеры, но проблема остается.',
      category: "access_issue",
      status: "in_progress",
      priority: "high",
      userId: "user-1",
      assignedTo: "support-1",
      createdAt: new Date("2024-06-09T10:30:00"),
      updatedAt: new Date("2024-06-09T14:45:00"),
      attachments: [
        {
          id: "1",
          filename: "error-screenshot.png",
          url: "",
          size: 245760,
          type: "image/png",
        },
        {
          id: "2",
          filename: "console-log.txt",
          url: "",
          size: 1024,
          type: "text/plain",
        },
      ],
    };

    const mockComments: Comment[] = [
      {
        id: "c1",
        ticketId: id || "T-001",
        userId: "user-1",
        content: "Добавил скриншот ошибки и лог консоли браузера.",
        createdAt: new Date("2024-06-09T10:45:00"),
      },
      {
        id: "c2",
        ticketId: id || "T-001",
        userId: "support-1",
        content:
          "Спасибо за предоставленную информацию. Вижу проблему в логах. Мы исправили аналогичную ошибку для других пользователей. Попробуйте войти сейчас.",
        createdAt: new Date("2024-06-09T12:15:00"),
        isInternal: false,
      },
      {
        id: "c3",
        ticketId: id || "T-001",
        userId: "user-1",
        content: "К сожалению, проблема все еще остается. Ошибка та же.",
        createdAt: new Date("2024-06-09T14:30:00"),
      },
    ];

    setTimeout(() => {
      setTicket(mockTicket);
      setComments(mockComments);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmittingComment(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const comment: Comment = {
        id: `c${Date.now()}`,
        ticketId: ticket?.id || "",
        userId: "user-1",
        content: newComment,
        createdAt: new Date(),
      };

      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      alert("Ошибка при добавлении комментария");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const priorityColors = {
    low: "text-gray-500",
    medium: "text-blue-500",
    high: "text-orange-500",
    urgent: "text-red-500",
  };

  const categoryLabels = {
    access_issue: "Проблема с доступом",
    system_error: "Системная ошибка",
    feature_request: "Запрос функции",
    other: "Другое",
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Обращение не найдено
            </h1>
            <Button asChild>
              <Link to="/tickets">Вернуться к списку</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link to="/tickets" className="hover:text-primary">
              Обращения
            </Link>
            <Icon name="ChevronRight" size={16} />
            <span>#{ticket.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {ticket.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>#{ticket.id}</span>
                <span>•</span>
                <span>
                  Создано{" "}
                  {ticket.createdAt.toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Ticket Details */}
            <Card>
              <CardHeader>
                <CardTitle>Описание проблемы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {ticket.description}
                </p>

                {ticket.attachments && ticket.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Вложения</h4>
                    <div className="space-y-2">
                      {ticket.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Icon
                              name="Paperclip"
                              size={16}
                              className="text-gray-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {attachment.filename}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(attachment.size)}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Icon name="Download" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle>Комментарии ({comments.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {comments.map((comment, index) => (
                    <div key={comment.id}>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <Icon
                            name="User"
                            size={16}
                            className="text-gray-600"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">
                              {comment.userId.startsWith("support")
                                ? "Поддержка"
                                : "Вы"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.createdAt.toLocaleDateString("ru-RU", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm whitespace-pre-wrap">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                      {index < comments.length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleSubmitComment} className="mt-6">
                  <Separator className="mb-4" />
                  <div className="space-y-3">
                    <label
                      htmlFor="comment"
                      className="text-sm font-medium text-gray-900"
                    >
                      Добавить комментарий
                    </label>
                    <Textarea
                      id="comment"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Напишите комментарий..."
                      rows={3}
                      disabled={isSubmittingComment}
                    />
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={!newComment.trim() || isSubmittingComment}
                        size="sm"
                      >
                        {isSubmittingComment ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Icon name="Send" size={14} className="mr-2" />
                            Отправить
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Info */}
            <Card>
              <CardHeader>
                <CardTitle>Информация об обращении</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Статус
                  </label>
                  <div className="mt-1">
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Категория
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {categoryLabels[ticket.category]}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Приоритет
                  </label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon
                      name="AlertCircle"
                      size={14}
                      className={priorityColors[ticket.priority]}
                    />
                    <span
                      className={`text-sm ${priorityColors[ticket.priority]}`}
                    >
                      {ticket.priority === "low"
                        ? "Низкий"
                        : ticket.priority === "medium"
                          ? "Средний"
                          : ticket.priority === "high"
                            ? "Высокий"
                            : "Срочный"}
                    </span>
                  </div>
                </div>

                {ticket.assignedTo && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Ответственный
                    </label>
                    <p className="text-sm text-gray-900 mt-1">
                      Сотрудник поддержки
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Последнее обновление
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {ticket.updatedAt.toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Icon name="Archive" size={16} className="mr-2" />
                  Закрыть обращение
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetail;
