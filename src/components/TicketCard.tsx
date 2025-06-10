import { Link } from "react-router-dom";
import { Ticket } from "@/types";
import StatusBadge from "./StatusBadge";
import Icon from "@/components/ui/icon";

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link
            to={`/tickets/${ticket.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors"
          >
            {ticket.title}
          </Link>
          <p className="text-sm text-gray-600 mt-1">#{ticket.id}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">
        {ticket.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Icon name="Tag" size={14} />
            <span>{categoryLabels[ticket.category]}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon
              name="AlertCircle"
              size={14}
              className={priorityColors[ticket.priority]}
            />
            <span className={priorityColors[ticket.priority]}>
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

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Paperclip" size={14} />
              <span>{ticket.attachments.length}</span>
            </div>
          )}
          <Icon name="Clock" size={14} />
          <span>{new Date(ticket.createdAt).toLocaleDateString("ru-RU")}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
