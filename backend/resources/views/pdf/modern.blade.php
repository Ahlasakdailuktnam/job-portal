<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $cv->title }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', 'Khmer OS', sans-serif;
            padding: 0;
            margin: 0;
            color: #2d3748;
            line-height: 1.6;
            background: #f7fafc;
        }
        .container {
            max-width: 800px;
            margin: 30px auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .sidebar {
            background: linear-gradient(135deg, #2d3748, #1a202c);
            padding: 30px;
            color: white;
            text-align: center;
        }
        .sidebar h1 {
            font-size: 28px;
            margin: 10px 0 5px;
        }
        .sidebar .contact {
            font-size: 13px;
            opacity: 0.9;
            margin-top: 10px;
        }
        .sidebar .contact div {
            margin: 4px 0;
        }
        .profile-image {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid white;
            margin: 0 auto;
            display: block;
        }
        .main {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #2d3748;
            border-bottom: 3px solid #2d3748;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .item {
            margin-bottom: 15px;
        }
        .item-title {
            font-weight: bold;
            font-size: 16px;
            color: #2d3748;
        }
        .item-subtitle {
            color: #4a5568;
            font-size: 14px;
        }
        .item-date {
            color: #718096;
            font-size: 13px;
        }
        .skill-tag {
            display: inline-block;
            background: #e2e8f0;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 13px;
            margin: 3px;
            color: #2d3748;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="sidebar">
            @if($cv->profile_image)
                <img src="{{ storage_path('app/public/' . $cv->profile_image) }}" class="profile-image" alt="Profile">
            @endif
            <h1>{{ $cv->title }}</h1>
            <div class="contact">
                @if($cv->phone)
                    <div>📱 {{ $cv->phone }}</div>
                @endif
                @if($cv->address)
                    <div>📍 {{ $cv->address }}</div>
                @endif
                @if($cv->linkedin)
                    <div>🔗 {{ $cv->linkedin }}</div>
                @endif
                @if($cv->telegram)
                    <div>✈️ {{ $cv->telegram }}</div>
                @endif
            </div>
        </div>
        <div class="main">
            @if($cv->summary)
                <div class="section">
                    <div class="section-title">📝 Summary</div>
                    <p>{{ $cv->summary }}</p>
                </div>
            @endif

            @if($cv->educations && count($cv->educations) > 0)
                <div class="section">
                    <div class="section-title">🎓 Education</div>
                    @foreach($cv->educations as $edu)
                        <div class="item">
                            <div class="item-title">{{ $edu->school_name }}</div>
                            <div class="item-subtitle">{{ $edu->degree }}</div>
                            <div class="item-date">{{ $edu->start_year }} - {{ $edu->end_year ?? 'Present' }}</div>
                        </div>
                    @endforeach
                </div>
            @endif

            @if($cv->experiences && count($cv->experiences) > 0)
                <div class="section">
                    <div class="section-title">💼 Experience</div>
                    @foreach($cv->experiences as $exp)
                        <div class="item">
                            <div class="item-title">{{ $exp->position }}</div>
                            <div class="item-subtitle">{{ $exp->company_name }}</div>
                            <div class="item-date">{{ $exp->start_date }} - {{ $exp->end_date ?? 'Present' }}</div>
                            @if($exp->description)
                                <div style="margin-top:5px;font-size:14px;color:#4a5568;">{{ $exp->description }}</div>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endif

            @if($cv->skills && count($cv->skills) > 0)
                <div class="section">
                    <div class="section-title">🛠 Skills</div>
                    <div>
                        @foreach($cv->skills as $skill)
                            <span class="skill-tag">{{ $skill->name }}</span>
                        @endforeach
                    </div>
                </div>
            @endif
        </div>
    </div>
</body>
</html>