// hooks/useChatSubscription.ts
import { createEchoInstance } from '@/lib/echo';
import { useEffect } from 'react';

export const useChatSubscription = (chatId: number, token: string) => {
    useEffect(() => {
        const echo = createEchoInstance(token);
        if (!echo) return;

        const channel = `chat.${chatId}`;

        echo.private(channel)
            .listen('.chat.message.sent', (data: { message: any }) => {
                console.log('Новое сообщение:', data.message);
                // Здесь вызывайте ваш state manager (Zustand/Context)
            })
            .error((err: any) => {
                // Пункт 10: Обработка ошибок авторизации
                if (err.status === 401 || err.status === 403) {
                    console.error('Ошибка доступа к каналу. Токен просрочен?');
                    // Тут можно вызвать window.location.reload() или функцию обновления токена
                }
            });

        // Пункт 8: Отписка при уходе со страницы (unmount)
        return () => {
            console.log(`Leaving channel: ${channel}`);
            echo.leave(channel);
            // Примечание: Laravel Echo автоматически добавит 'private-' к имени в leave()
        };
    }, [chatId, token]);
};