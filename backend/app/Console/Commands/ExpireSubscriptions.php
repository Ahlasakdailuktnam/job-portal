<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use Illuminate\Console\Command;

class ExpireSubscriptions extends Command
{
    protected $signature = 'subscriptions:expire';

    protected $description = 'Expire active subscriptions whose end date has passed.';

    public function handle(): int
    {
        $expiredCount = Subscription::where('status', 'active')
            ->whereNotNull('end_date')
            ->where('end_date', '<', now())
            ->update([
                'status' => 'expired',
            ]);

        $this->info("Expired {$expiredCount} subscriptions.");

        return self::SUCCESS;
    }
}
