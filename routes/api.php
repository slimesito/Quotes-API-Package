<?php

use Illuminate\Routing\Middleware\ThrottleRequests;
use Illuminate\Support\Facades\Route;
use William\QuotesPackage\Http\Controllers\QuotesController;

Route::middleware([ThrottleRequests::class . ':5,1'])->group(function () {
    Route::get('quotes-api/all', [QuotesController::class, 'getAllQuotes']);
    Route::get('quotes-api/random', [QuotesController::class, 'getRandomQuote']);
    Route::get('quotes-api/{id}', [QuotesController::class, 'getQuote']);
});
