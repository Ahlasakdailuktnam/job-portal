<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{{ $cv->title }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', 'Khmer OS', sans-serif;
            padding: 50px;
            color: #333;
            line-height: 1.6;
            max-width: 700px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .header h1 {
            font-size: 32px;
            margin: 10px 0 5px;
            font-weight: 300;
            letter-spacing: 2px;
        }
        .header .contact {
            font-size: 14px;
            color: #666;
        }
        .profile-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin: 0 auto;
            display: block;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #888;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .item {
            margin-bottom: 12px;
        }
        .item-title {
            font-weight: 600;
        }
        .item-subtitle {
            color: #666;
            font-size: 14px;
        }
        .item-date {
            color: #999;
            font-size: 13px;
        }
        .skill-tag {
            display: inline-block;
            padding: 2px 12px;
            border: 1px solid #ddd;
            border-radius: 20px;
            font-size: 13px;
            margin: 3px;
        }
    </style>
</head>
<body>
    <div class="header">
        @if($cv->profile_image)
            <img src="{{ storage_path('app/public/' . $cv->profile_image) }}" class="profile-image" alt="Profile">
        @endif
        <h1>{{ $cv->title }}</h1>
        <div class="contact">
            @if($cv->phone) {{ $cv->phone }} @endif
            @if($cv->address) | {{ $cv->address }} @endif
            @if($cv->linkedin) | {{ $cv->linkedin }} @endif
        </div>
    </div>

    @if($cv->summary)
        <div class="section">
            <div class="section-title">Summary</div>
            <p style="font-size:14px;color:#555;">{{ $cv->summary }}</p>
        </div>
    @endif

    @if($cv->educations && count($cv->educations) > 0)
        <div class="section">
            <div class="section-title">Education</div>
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
            <div class="section-title">Experience</div>
            @foreach($cv->experiences as $exp)
                <div class="item">
                    <div class="item-title">{{ $exp->position }}</div>
                    <div class="item-subtitle">{{ $exp->company_name }}</div>
                    <div class="item-date">{{ $exp->start_date }} - {{ $exp->end_date ?? 'Present' }}</div>
                    @if($exp->description)
                        <div style="font-size:13px;color:#666;margin-top:3px;">{{ $exp->description }}</div>
                    @endif
                </div>
            @endforeach
        </div>
    @endif

    @if($cv->skills && count($cv->skills) > 0)
        <div class="section">
            <div class="section-title">Skills</div>
            <div>
                @foreach($cv->skills as $skill)
                    <span class="skill-tag">{{ $skill->name }}</span>
                @endforeach
            </div>
        </div>
    @endif
</body>
</html>