<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use App\Models\Notification;

class NotificationController extends Controller
{
    // GET MY NOTIFICATIONS
    public function index()
    {
        $notifications = Notification::where(
            'user_id',
            auth()->id()
        )
        ->latest()
        ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $notifications
        ]);
    }

    // MARK AS READ
    public function markAsRead($id)
    {
        $notification = Notification::where(
            'user_id',
            auth()->id()
        )->findOrFail($id);

        $notification->update([
            'is_read' => true
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Notification marked as read'
        ]);
    }

    // UNREAD COUNT
    public function unreadCount()
    {
        $count = Notification::where(
            'user_id',
            auth()->id()
        )
        ->where(
            'is_read',
            false
        )
        ->count();

        return response()->json([
            'success' => true,
            'unread_count' => $count
        ]);
    }
}
