<?php

use Illuminate\Support\Facades\Route;

Route::get('/quotes-ui/{any?}', function () {
    return view('quotes-ui');
})->where('any', '.*');