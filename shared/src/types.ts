export interface Banner {
  id: string;
  slug: string; // уникальный человекочитаемый идентификатор, например "bgaming-december-2025"
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText: string; // "Подробнее", "Участвовать" и т.п.
  buttonColor?: string; // по умолчанию #A855F7 (фиолетовый)
  description?: string; // подробный текст для промо-страницы
  dateEnd?: string; // ISO-строка даты окончания акции
  isActive: boolean; // показывать на главной
  createdAt: string;
}

