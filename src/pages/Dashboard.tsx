import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import TicketCard from "@/components/TicketCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Ticket, TicketStats } from "@/types";

const Dashboard = () => {
  const [stats, setStats] = useState<TicketStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  });

  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    // Имитация загрузки данных
    const mockStats: TicketStats = {
      total: 127,
      open: 23,
      inProgress: 8,
      resolved: 89,
      closed: 7,
    };

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
          "Страницы загружаются очень медленно, особенно раздел отчетов.",
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
          "Было бы удобно иметь возможность экспортировать данные в Excel файл.",
        category: "feature_request",
        status: "resolved",
        priority: "low",
        userId: "user-3",
        createdAt: new Date("2024-06-07"),
        updatedAt: new Date("2024-06-08"),
      },
    ];

    setStats(mockStats);
    setRecentTickets(mockTickets);
  }, []);

  const statCards = [
    {
      title: "Всего обращений",
      value: stats.total,
      icon: "Ticket",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Открытые",
      value: stats.open,
      icon: "AlertCircle",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "В работе",
      value: stats.inProgress,
      icon: "Clock",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Решенные",
      value: stats.resolved,
      icon: "CheckCircle",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Панель управления
          </h1>
          <p className="text-gray-600 mt-2">
            Обзор ваших обращений в техническую поддержку
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon
                      name={stat.icon as any}
                      size={24}
                      className={stat.color}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Последние обращения</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
