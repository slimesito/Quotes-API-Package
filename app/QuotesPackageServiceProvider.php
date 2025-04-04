<?php

namespace William\QuotesPackage;

use Illuminate\Support\ServiceProvider;

class QuotesPackageServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/quotes.php', 'quotes');
    }

    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/../routes/api.php');

        $this->publishes([
            __DIR__.'/../config/quotes.php' => config_path('quotes.php'),
        ], 'config');

        $this->publishes([
            __DIR__.'/../resources/js' => resource_path('js/vendor/quotespackage'),
        ], 'vue-components');
    }
}
