import { TicketStatus } from "@/types";

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const statusConfig = {
    open: {
      label: "Открыто",
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
    in_progress: {
      label: "В работе",
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    resolved: {
      label: "Решено",
      className: "bg-green-100 text-green-800 border-green-200",
    },
    closed: {
      label: "Закрыто",
      className: "bg-gray-100 text-gray-800 border-gray-200",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
