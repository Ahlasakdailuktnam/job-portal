<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CV</title>

    <style>
        body{
            font-family: DejaVu Sans;
            margin:20px;
        }

        h1,h2{
            margin-bottom:5px;
        }

        .section{
            margin-top:20px;
        }

        ul{
            padding-left:20px;
        }
    </style>
</head>
<body>

    <h1>{{ $cv->user->name }}</h1>

    <p>
        <strong>Email:</strong>
        {{ $cv->user->email }}
    </p>

    <p>
        <strong>Phone:</strong>
        {{ $cv->phone }}
    </p>

    <p>
        <strong>Address:</strong>
        {{ $cv->address }}
    </p>

    <p>
        <strong>LinkedIn:</strong>
        {{ $cv->linkedin }}
    </p>

    <p>
        <strong>Telegram:</strong>
        {{ $cv->telegram }}
    </p>

    <div class="section">
        <h2>Professional Summary</h2>

        <p>
            {{ $cv->summary }}
        </p>
    </div>

    <div class="section">
        <h2>Education</h2>

        <ul>
            @foreach($cv->educations as $education)
                <li>
                    {{ $education->degree }}
                    -
                    {{ $education->school_name }}
                    (
                    {{ $education->start_year }}
                    -
                    {{ $education->end_year }}
                    )
                </li>
            @endforeach
        </ul>
    </div>

    <div class="section">
        <h2>Experience</h2>

        <ul>
            @foreach($cv->experiences as $experience)
                <li>
                    <strong>
                        {{ $experience->position }}
                    </strong>

                    -
                    {{ $experience->company_name }}

                    <br>

                    {{ $experience->description }}
                </li>
            @endforeach
        </ul>
    </div>

    <div class="section">
        <h2>Skills</h2>

        <ul>
            @foreach($cv->skills as $skill)
                <li>
                    {{ $skill->name }}
                </li>
            @endforeach
        </ul>
    </div>

</body>
</html>