import { test, expect } from '@playwright/test';

test.describe('Fake Store API Tests', () => {

    test('GET - Verify products API', async ({ request }) => {

        const response = await request.get(
            'https://fakestoreapi.com/products'
        );

        expect(response.status()).toBe(200);

        const products = await response.json();

        expect(Array.isArray(products)).toBeTruthy();

        expect(products.length).toBeGreaterThan(0);

    });

    test('GET - Verify single product', async ({ request }) => {

        const response = await request.get(
            'https://fakestoreapi.com/products/1'
        );

        expect(response.status()).toBe(200);

        const product = await response.json();

        expect(product.id).toBe(1);

        expect(product.title).toBeTruthy();

    });

    test('POST - Create product', async ({ request }) => {

        const response = await request.post(
            'https://fakestoreapi.com/products',
            {
                data: {
                    title: 'Automation Testing Product',
                    price: 99.99,
                    description: 'Created using Playwright API testing',
                    image: 'https://i.pravatar.cc',
                    category: 'electronics'
                }
            }
        );

        expect(response.status()).toBe(201);

        const product = await response.json();

        expect(product.title)
            .toBe('Automation Testing Product');

    });

    test('PUT - Update product', async ({ request }) => {

        const response = await request.put(
            'https://fakestoreapi.com/products/1',
            {
                data: {
                    title: 'Updated Automation Product',
                    price: 149.99,
                    description: 'Updated test product',
                    image: 'https://i.pravatar.cc',
                    category: 'electronics'
                }
            }
        );

        expect(response.status()).toBe(200);

        const product = await response.json();

        expect(product.title)
            .toBe('Updated Automation Product');

    });

    test('DELETE - Delete product', async ({ request }) => {

        const response = await request.delete(
            'https://fakestoreapi.com/products/1'
        );

        expect(response.status()).toBe(200);

    });

});