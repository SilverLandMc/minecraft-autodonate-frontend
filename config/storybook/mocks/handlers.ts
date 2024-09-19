import { http, HttpResponse } from 'msw';
import ranksFixtures from './fixtures/ranksFixtures.json';

export const handlers = [
    http.get('/api/v1/public/online', () => {
        return HttpResponse.json({
            online: 42,
            max: 110
        });
    }),
    http.get('/api/v1/public/product/category/ranks', () => HttpResponse.json(ranksFixtures)),
    http.get('/public/files/:fileName', async (req) => {
        const { fileName } = req.params;
        const buffer = await fetch(`/images/${fileName}`).then((response) => response.arrayBuffer());

        return HttpResponse.arrayBuffer(buffer, {
            headers: {
                'Content-Type': 'image/png'
            }
        });
    })
];
