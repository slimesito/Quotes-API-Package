import { describe, it, expect, vi } from 'vitest';

async function fetchQuoteById(id) {
    const response = await fetch(`https://dummyjson.com/quotes/${id}`);
    return response.json();
}

describe("API Client Tests", () => {
    it("fetches a quote by ID", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ id: 1, quote: "Test Quote", author: "Tester" })
            })
        );

        const quote = await fetchQuoteById(1);
        expect(quote).toHaveProperty("id", 1);
        expect(quote).toHaveProperty("quote", "Test Quote");
        expect(quote).toHaveProperty("author", "Tester");
    });
});
