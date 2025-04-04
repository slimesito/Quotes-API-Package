<?php

namespace William\QuotesPackage\Services;

use Illuminate\Support\Facades\Http;

class QuotesPackageService
{
    protected string $baseUrl;
    protected int $rateLimit;
    protected int $rateLimitWindow;
    protected array $cache = [];

    private const MAX_CACHE_SIZE = 100; // Límite máximo de quotes en caché

    public function __construct()
    {
        $this->baseUrl = config('quotes.base_url', 'https://dummyjson.com');
        $this->rateLimit = config('quotes.rate_limit', 10);
        $this->rateLimitWindow = config('quotes.rate_limit_window', 60);

        // Precargar el caché con algunos quotes
        $this->preloadCache();
    }

    /**
     * Get all quotes from API.
     */
    public function getAllQuotes()
    {
        return $this->request('quotes');
    }

    /**
     * Get a random quote from API.
     */
    public function getRandomQuote()
    {
        return $this->request('quotes/random');
    }

    /**
     * Get a quote by ID, checking cache first.
     */
    public function getQuote(int $id)
    {
        // Buscar en caché usando búsqueda binaria
        $quote = $this->binarySearchCache($id);
        if ($quote) {
            return $quote;
        }

        // Si no está en caché, hacer la solicitud a la API
        $quote = $this->request("quotes/{$id}");

        // Si la cita no existe, devolver null
        if (!$quote) {
            return null;
        }

        // Almacenar en caché si la respuesta es válida
        $this->cache[$id] = $quote;
        ksort($this->cache); // Mantener la caché ordenada

        // Limitar el tamaño del caché
        if (count($this->cache) > self::MAX_CACHE_SIZE) {
            array_shift($this->cache); // Eliminar el primer elemento (el más antiguo)
        }

        return $quote;
    }

    /**
     * Realiza una solicitud HTTP.
     */
    private function request(string $endpoint)
    {
        $response = Http::get("{$this->baseUrl}/{$endpoint}");
        return $response->successful() ? $response->json() : null;
    }

    /**
     * Búsqueda binaria en caché para encontrar un quote por ID.
     */
    private function binarySearchCache(int $id)
    {
        $keys = array_keys($this->cache);
        $low = 0;
        $high = count($keys) - 1;

        while ($low <= $high) {
            $mid = (int) floor(($low + $high) / 2);
            $midKey = $keys[$mid];

            if ($midKey == $id) {
                return $this->cache[$midKey];
            } elseif ($midKey < $id) {
                $low = $mid + 1;
            } else {
                $high = $mid - 1;
            }
        }

        return null;
    }

    /**
     * Precargar el caché con algunos quotes.
     */
    private function preloadCache()
    {
        $quotes = $this->request('quotes'); // Obtener todos los quotes
        if ($quotes && isset($quotes['quotes'])) {
            foreach ($quotes['quotes'] as $quote) {
                $this->cache[$quote['id']] = $quote;
            }
            ksort($this->cache); // Ordenar el caché
        }
    }
}
