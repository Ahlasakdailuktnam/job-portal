<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();

            $table->foreignId('company_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('category_id')
                ->constrained('job_categories')
                ->cascadeOnDelete();

            $table->string('title');

            $table->longText('description');

            $table->longText('requirement')
                ->nullable();

            $table->longText('responsibility')
                ->nullable();

            $table->decimal('salary_min', 10, 2)
                ->nullable();

            $table->decimal('salary_max', 10, 2)
                ->nullable();

            $table->enum('job_type', [
                'full_time',
                'part_time',
                'remote',
                'internship'
            ]);

            $table->string('job_level')
                ->nullable();

            $table->string('experience')
                ->nullable();

            $table->string('qualification')
                ->nullable();

            $table->integer('available_position')
                ->default(1);

            $table->string('language')
                ->nullable();

            $table->date('deadline');

            $table->enum('status', [
                'draft',
                'pending',
                'active',
                'rejected',
                'closed'
            ])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
