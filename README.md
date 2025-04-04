# Quotes API Package

## Introduction
This Laravel package provides a simple API for retrieving quotes, featuring rate limiting, caching, and a Vue.js-based UI for an enhanced user experience.

## Installation
To install this package within your Laravel 10 project, follow these steps:

1. Navigate to your Laravel project root and run:
   ```bash
   composer require william/quotespackage
```

2. After installation, publish the package assets (Vue.js UI, config files, etc.):
    ```bash
    php artisan vendor:publish --tag=config
```

## Configuration

The package provides configuration options for API rate limiting and caching. You can modify these settings in `config/quotes.php` after publishing the config file.

## Usage

### API Routes

This package provides the following API routes:

- `GET /api/quotes` - Retrieve all quotes with pagination.
- `GET /api/quotes/random` - Retrieve a random quote.
- `GET /api/quotes/{id}` - Retrieve a specific quote by ID.

### Web UI

The Vue.js UI is accessible via:

```
/quotes-ui
```

If you want to serve the UI from a different path, update the web route in `routes/web.php`.

## Rate Limiting

To prevent abuse, API requests are rate-limited. By default, the limit is **5 requests per minute** per user. You can configure this in the `config/quotesapi.php` file:

```php
return [
    'base_url' => 'https://dummyjson.com',
    'rate_limit' => 5,
    'time_window' => 60,
];
```

## Caching

To improve performance, responses are cached using Laravel's caching system. You can configure the cache size in `src\Services\QuotesPackageService.php`:

```php
private const MAX_CACHE_SIZE = 100;
```

## Building & Publishing the Vue.js UI

Install dependencies:

```bash
npm install
```

To build the UI for production:

```bash
npm run build
```

To serve the UI in development mode:

```bash
npm run dev
```

## Testing

Run the package tests with:

```bash
npx vitest
```

### 1. AllQuotes.test.js

Tests for the component that displays all quotes.

#### Test Cases:

##### - Basic Rendering:

###### - Verifies the title "All Quotes" displays correctly.

##### - Successful Quote Loading:

###### - Mocks a successful API response.

###### Verifies:

###### - Correct API endpoint is called once ```(dummyjson.com/quotes)```

###### - All received quotes are rendered.

###### - Each quote displays correct text and author.

###### - No errors occur.

##### - Network Error Handling:

###### - Simulates a connection failure.

#### Key Techniques:

##### - Mocking: Simulating ```fetch``` and ```console.error```

##### - Async Testing: Proper promise handling.

##### - Vue Selectors: Using ```find()``` and ```findAll()``` to verify elements

##### - Precise assertions.

### 2. QuoteById.test.js

Tests for the component that displays a specific quote by ID.

#### Test Cases:

##### - Successful Quote Loading by ID:

###### - Mocks successful API response for specific ID (1)

###### Verifies:

###### - Correct endpoint is called (```dummyjson.com/quotes/1```)

###### - Displays title "Quote by ID", quote text and author.

###### - Text matches mock data.

##### - API Error Handling.

#### Key Techniques:

##### - Custom ```fetch``` mock responses.

##### - Vue Router configuration for dynamic route testing.

##### - Programmatic navigation (```router.push()```)

##### - Async loading handling (```router.isReady()```)

### 3. RandomQuote.test.js

Tests for the component that displays random quotes.

#### Test Cases:

##### - Initial Rendering:

###### - Verifies "Random Quote" title displays.

###### - Confirms no initial error messages.

##### - Successful Random Quote Loading:

###### - Mocks successful API response.

###### Verifies:

###### - Correct endpoint is called (```dummyjson.com/quotes/random```)

###### - Quote and author display correctly.

###### - No errors occur.

##### - New Quote on Button Click.

#### Key Techniques:

###### - Complete ```fetch``` and ```console.error``` mocking.

###### - User interaction simulation (```trigger('click')```)

###### - Advanced Vue selectors (```:not()```)

###### - ```flushPromises``` for async handling.

## License

This package was created by William Villegas and is open-source and available under the MIT license.

## Contact

William Villegas | [LinkedIn](https://www.linkedin.com/in/william-villegas-ab3b94215/) | williamonfroy@gmail.com | +584242752723
