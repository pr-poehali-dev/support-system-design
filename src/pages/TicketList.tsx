import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import TicketCard from "@/components/TicketCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Ticket, TicketStatus } from "@/types";

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const mockTickets: Ticket[] = [
      {
        id: "T-001",
        title: "Не могу войти в систему",
        description:
          'При попытке входа в систему появляется ошибка "Неверные учетные данные", хотя пароль точно правильный.',
        category: "access_issue",
        status: "open",
        priority: "high",
        userId: "user-1",
        createdAt: new Date("2024-06-09"),
        updatedAt: new Date("2024-06-09"),
        attachments: [
          {
            id: "1",
            filename: "screenshot.png",
            url: "",
            size: 245760,
            type: "image/png",
          },
        ],
      },
      {
        id: "T-002",
        title: "Медленная загрузка страниц",
        description:
          "Страницы загружаются очень медленно, особенно раздел отчетов. Время ожидания составляет более 30 секунд.",
        category: "system_error",
        status: "in_progress",
        priority: "medium",
        userId: "user-2",
        assignedTo: "support-1",
        createdAt: new Date("2024-06-08"),
        updatedAt: new Date("2024-06-09"),
      },
      {
        id: "T-003",
        title: "Добавить экспорт в Excel",
        description:
          "Было бы удобно иметь возможность экспортировать данные в Excel файл для дальнейшей обработки.",
        category: "feature_request",
        status: "resolved",
        priority: "low",
        userId: "user-3",
        createdAt: new Date("2024-06-07"),
        updatedAt: new Date("2024-06-08"),
      },
      {
        id: "T-004",
        title: "Ошибка при сохранении данных",
        description:
          "При попытке сохранить изменения в профиле пользователя появляется ошибка 500.",
        category: "system_error",
        status: "open",
        priority: "urgent",
        userId: "user-1",
        createdAt: new Date("2024-06-09"),
        updatedAt: new Date("2024-06-09"),
      },
      {
        id: "T-005",
        title: "Проблема с уведомлениями",
        description: "Не приходят уведомления на email о новых сообщениях.",
        category: "system_error",
        status: "closed",
        priority: "medium",
        userId: "user-4",
        createdAt: new Date("2024-06-06"),
        updatedAt: new Date("2024-06-07"),
      },
    ];

    setTimeout(() => {
      setTickets(mockTickets);
      setFilteredTickets(mockTickets);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = tickets;

    // Фильтр по статусу
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Поиск по названию и описанию
    if (searchQuery) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ticket.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTickets(filtered);
  }, [tickets, searchQuery, statusFilter]);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мои обращения</h1>
            <p className="text-gray-600 mt-2">
              Найдено {filteredTickets.length} из {tickets.length} обращений
            </p>
          </div>
          <Button className="mt-4 sm:mt-0" asChild>
            <a href="/create-ticket">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать обращение
            </a>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                type="text"
                placeholder="Поиск по названию, описанию или номеру..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as TicketStatus | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="open">Открытые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="resolved">Решенные</SelectItem>
                <SelectItem value="closed">Закрытые</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <Icon
              name="Ticket"
              size={48}
              className="mx-auto text-gray-400 mb-4"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all"
                ? "Обращения не найдены"
                : "У вас пока нет обращений"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Попробуйте изменить фильтры поиска"
                : "Создайте первое обращение в техническую поддержку"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button asChild>
                <a href="/create-ticket">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать обращение
                </a>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TicketList;
