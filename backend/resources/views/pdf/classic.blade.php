<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $cv->title }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', 'Khmer OS', sans-serif;
            padding: 40px;
            color: #333;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 28px;
            margin: 0;
            color: #1a1a1a;
        }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-top: 10px;
            font-size: 14px;
            color: #666;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
            color: #1a1a1a;
        }
        .item {
            margin-bottom: 12px;
        }
        .item-title {
            font-weight: bold;
            font-size: 16px;
        }
        .item-subtitle {
            color: #666;
            font-size: 14px;
        }
        .item-date {
            color: #888;
            font-size: 13px;
        }
        .item-description {
            margin-top: 5px;
            font-size: 14px;
        }
        .skill-tag {
            display: inline-block;
            background: #f0f0f0;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 13px;
            margin: 3px;
        }
        .profile-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto 15px;
            display: block;
        }
    </style>
</head>
<body>
    <div class="header">
        @if($cv->profile_image)
            <img src="{{ storage_path('app/public/' . $cv->profile_image) }}" class="profile-image" alt="Profile">
        @endif
        <h1>{{ $cv->title }}</h1>
        <div class="contact-info">
            @if($cv->phone)
                <span>📱 {{ $cv->phone }}</span>
            @endif
            @if($cv->address)
                <span>📍 {{ $cv->address }}</span>
            @endif
            @if($cv->linkedin)
                <span>🔗 {{ $cv->linkedin }}</span>
            @endif
            @if($cv->telegram)
                <span>✈️ {{ $cv->telegram }}</span>
            @endif
        </div>
    </div>

    @if($cv->summary)
        <div class="section">
            <div class="section-title">📝 សង្ខេប</div>
            <p>{{ $cv->summary }}</p>
        </div>
    @endif

    @if($cv->educations && count($cv->educations) > 0)
        <div class="section">
            <div class="section-title">🎓 ការសិក្សា</div>
            @foreach($cv->educations as $edu)
                <div class="item">
                    <div class="item-title">{{ $edu->school_name }}</div>
                    <div class="item-subtitle">{{ $edu->degree }}</div>
                    <div class="item-date">{{ $edu->start_year }} - {{ $edu->end_year ?? 'បច្ចុប្បន្ន' }}</div>
                </div>
            @endforeach
        </div>
    @endif

    @if($cv->experiences && count($cv->experiences) > 0)
        <div class="section">
            <div class="section-title">💼 បទពិសោធន៍ការងារ</div>
            @foreach($cv->experiences as $exp)
                <div class="item">
                    <div class="item-title">{{ $exp->position }}</div>
                    <div class="item-subtitle">{{ $exp->company_name }}</div>
                    <div class="item-date">{{ $exp->start_date }} - {{ $exp->end_date ?? 'បច្ចុប្បន្ន' }}</div>
                    @if($exp->description)
                        <div class="item-description">{{ $exp->description }}</div>
                    @endif
                </div>
            @endforeach
        </div>
    @endif

    @if($cv->skills && count($cv->skills) > 0)
        <div class="section">
            <div class="section-title">🛠 ជំនាញ</div>
            <div>
                @foreach($cv->skills as $skill)
                    <span class="skill-tag">{{ $skill->name }}</span>
                @endforeach
            </div>
        </div>
    @endif
</body>
</html>