<?php

namespace App\Console\Commands;

use App\Models\Subscription;
use Illuminate\Console\Command;

class CleanupPendingSubscriptions extends Command
{
    protected $signature = 'subscriptions:cleanup-pending {--minutes=30}';

    protected $description = 'Delete abandoned pending subscriptions that never received a paid payment.';

    public function handle(): int
    {
        $minutes = max(1, (int) $this->option('minutes'));

        $deletedCount = Subscription::where('status', 'pending')
            ->where('created_at', '<=', now()->subMinutes($minutes))
            ->whereDoesntHave('payments', function ($query) {
                $query->where('status', 'paid');
            })
            ->delete();

        $this->info("Deleted {$deletedCount} abandoned pending subscriptions.");

        return self::SUCCESS;
    }
}
