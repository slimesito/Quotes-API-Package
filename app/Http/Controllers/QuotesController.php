<?php

namespace William\QuotesPackage\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use William\QuotesPackage\Services\QuotesPackageService;

class QuotesController extends Controller
{
    protected QuotesPackageService $service;

    public function __construct(QuotesPackageService $service)
    {
        $this->service = $service;
    }

    public function getAllQuotes()
    {
        return response()->json($this->service->getAllQuotes());
    }

    public function getRandomQuote()
    {
        return response()->json($this->service->getRandomQuote());
    }

    public function getQuote(int $id)
    {
        $quote = $this->service->getQuote($id);

        if (!$quote) {
            return response()->json(['error' => 'Quote not found'], 404);
        }

        return response()->json($quote);
    }
}
