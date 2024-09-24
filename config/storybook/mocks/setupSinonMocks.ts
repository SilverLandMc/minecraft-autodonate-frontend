import sinon from 'sinon';
import ranksFixtures from './fixtures/ranksFixtures.json';
import { placeholderImage } from './fixtures/images/imageMocks';
import 'whatwg-fetch';

export const setupSinonMocks = () => {
    // Создаём фейковый сервер
    const server = sinon.fakeServer.create();
    server.autoRespond = true;

    // Мок для запроса онлайн-данных
    server.respondWith('GET', '/api/v1/public/online', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({
            online: 42,
            max: 110
        })
    ]);

    // Мок для запроса категорий продуктов
    server.respondWith('GET', '/api/v1/public/product/category/ranks', [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(ranksFixtures)
    ]);

    sinon.stub(window, 'fetch').callsFake((url) => {
        if (url.toString().includes('/public/files')) {
            // Создаём заголовки с типом application/octet-stream
            const headers = new Headers();
            headers.append('Content-Type', 'application/octet-stream');

            // Преобразуем base64 изображение в бинарные данные (если нужно)
            const binaryString = atob(placeholderImage.split(',')[1]); // Пропускаем "data:image/png;base64,"
            const binaryData = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                binaryData[i] = binaryString.charCodeAt(i);
            }

            // Создаём Blob из бинарных данных
            const blob = new Blob([binaryData], { type: 'application/octet-stream' });

            // Возвращаем мокированный ответ с Blob
            const response = new Response(blob, { status: 200, headers });
            return Promise.resolve(response);
        }
        return Promise.resolve(new Response('', { status: 404 }));
    });
};
