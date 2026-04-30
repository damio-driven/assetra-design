$AccessKey = "ev0-JDuNlqumi0WaqTYQjhqLE4L-m3ZFS4n5xXBNveY"
$BaseUrl   = "https://api.unsplash.com"
$OutputDir = "$PSScriptRoot\assets\images"

$Images = @(
    @{ Query = "luxury furniture showroom interior design";  Filename = "hero-bg.jpg";         W = 1920; H = 1080 },
    @{ Query = "modern interior design living room sofa";    Filename = "furniture.jpg";        W = 800;  H = 600  },
    @{ Query = "interior design workspace architecture";     Filename = "accent.jpg";           W = 800;  H = 600  },
    @{ Query = "luxury residential living room interior";    Filename = "portfolio-1.jpg";      W = 900;  H = 675  },
    @{ Query = "modern office contract furniture design";    Filename = "portfolio-2.jpg";      W = 900;  H = 675  },
    @{ Query = "bespoke custom furniture detail craft";      Filename = "portfolio-3.jpg";      W = 900;  H = 675  },
    @{ Query = "hotel lobby luxury interior design";         Filename = "portfolio-4.jpg";      W = 900;  H = 675  },
    @{ Query = "restaurant interior design elegant";         Filename = "portfolio-5.jpg";      W = 900;  H = 675  },
    @{ Query = "retail store interior design boutique";      Filename = "portfolio-6.jpg";      W = 900;  H = 675  },
    @{ Query = "bedroom luxury interior design suite";       Filename = "portfolio-7.jpg";      W = 900;  H = 675  },
    @{ Query = "modern kitchen interior design minimal";     Filename = "portfolio-8.jpg";      W = 900;  H = 675  },
    @{ Query = "furniture showroom display store interior";  Filename = "showroom.jpg";         W = 1280; H = 800  },
    @{ Query = "luxury interior design editorial wide";      Filename = "unsplash-bg.jpg";      W = 1920; H = 1080 },
    @{ Query = "modern furniture display showroom window";   Filename = "unsplash-showroom.jpg"; W = 1280; H = 800  }
)

foreach ($img in $Images) {
    Write-Host "Downloading $($img.Filename) ..." -NoNewline

    $Uri = "$BaseUrl/search/photos?query=$([Uri]::EscapeDataString($img.Query))&per_page=3&orientation=landscape&client_id=$AccessKey"

    try {
        $resp = Invoke-RestMethod -Uri $Uri -Method Get -ErrorAction Stop

        $photo = $resp.results | Select-Object -First 1
        if (-not $photo) {
            Write-Host " NO RESULT"
            continue
        }

        $downloadUrl = "$($photo.urls.raw)&w=$($img.W)&h=$($img.H)&fit=crop&q=82&fm=jpg&auto=format"
        $outPath     = Join-Path $OutputDir $img.Filename

        Invoke-WebRequest -Uri $downloadUrl -OutFile $outPath -ErrorAction Stop

        $size = (Get-Item $outPath).Length
        Write-Host " OK ($([math]::Round($size/1KB)) KB) — $($photo.id)"
    }
    catch {
        Write-Host " ERROR: $_"
    }

    Start-Sleep -Milliseconds 400
}

Write-Host "`nDone. Images saved to $OutputDir"
