import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

const DesignSystem = () => {
  const navigate = useNavigate();

  const scssColors = `// Primary Colors
$primary: #0EA5E9;
$primary-50: #F0F9FF;
$primary-100: #E0F2FE;
$primary-500: #0EA5E9;
$primary-600: #0284C7;
$primary-700: #0369A1;

// Secondary Colors
$secondary: #8B5CF6;
$secondary-50: #F5F3FF;
$secondary-100: #EDE9FE;
$secondary-500: #8B5CF6;
$secondary-600: #7C3AED;

// Status Colors
$success: #10B981;
$success-light: #D1FAE5;
$warning: #F59E0B;
$warning-light: #FEF3C7;
$danger: #EF4444;
$danger-light: #FEE2E2;

// System Colors
$border: hsl(var(--border));
$input: hsl(var(--input));
$ring: hsl(var(--ring));
$background: hsl(var(--background));
$foreground: hsl(var(--foreground));
$muted: hsl(var(--muted));
$muted-foreground: hsl(var(--muted-foreground));
$accent: hsl(var(--accent));
$accent-foreground: hsl(var(--accent-foreground));
$card: hsl(var(--card));
$card-foreground: hsl(var(--card-foreground));`;

  const scssTypography = `// Font Family
$font-inter: 'Inter', sans-serif;

// Font Sizes
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px

// Font Weights
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;

// Line Heights
$leading-tight: 1.25;
$leading-snug: 1.375;
$leading-normal: 1.5;
$leading-relaxed: 1.625;`;

  const scssBorderRadius = `// Border Radius
$radius: var(--radius);
$radius-sm: calc(var(--radius) - 4px);
$radius-md: calc(var(--radius) - 2px);
$radius-lg: var(--radius);
$radius-xl: 12px;
$radius-2xl: 16px;
$radius-3xl: 24px;
$radius-full: 9999px;

// Standard Values (if --radius = 8px)
$radius-none: 0px;
$radius-sm: 4px;
$radius-md: 6px;
$radius-lg: 8px;`;

  const scssSpacing = `// Spacing Scale
$spacing-0: 0;
$spacing-1: 0.25rem;   // 4px
$spacing-2: 0.5rem;    // 8px
$spacing-3: 0.75rem;   // 12px
$spacing-4: 1rem;      // 16px
$spacing-5: 1.25rem;   // 20px
$spacing-6: 1.5rem;    // 24px
$spacing-8: 2rem;      // 32px
$spacing-10: 2.5rem;   // 40px
$spacing-12: 3rem;     // 48px
$spacing-16: 4rem;     // 64px
$spacing-20: 5rem;     // 80px
$spacing-24: 6rem;     // 96px`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Дизайн-система
            </h1>
            <p className="text-gray-600">
              SCSS переменные для цветов, типографики и радиусов
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/ui-components")}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              UI Компоненты
            </Button>
            <Button onClick={() => navigate("/dashboard")}>
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Цвета
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(scssColors)}
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  Копировать
                </Button>
              </CardTitle>
              <CardDescription>
                SCSS переменные для всех цветов дизайн-системы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {scssColors}
              </pre>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Типографика
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(scssTypography)}
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  Копировать
                </Button>
              </CardTitle>
              <CardDescription>Шрифты, размеры и начертания</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {scssTypography}
              </pre>
            </CardContent>
          </Card>

          {/* Border Radius */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Радиусы скругления
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(scssBorderRadius)}
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  Копировать
                </Button>
              </CardTitle>
              <CardDescription>Переменные для скругления углов</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {scssBorderRadius}
              </pre>
            </CardContent>
          </Card>

          {/* Spacing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Отступы
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(scssSpacing)}
                >
                  <Icon name="Copy" size={16} className="mr-2" />
                  Копировать
                </Button>
              </CardTitle>
              <CardDescription>Система отступов и размеров</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {scssSpacing}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DesignSystem;
