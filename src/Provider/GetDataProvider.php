<?php

namespace App\Provider;

use App\Exception\FileEmptyException;
use App\Interface\DataTransformInterface;
use App\Interface\GetDataProviderInterface;
use DateTime;
use Override;
use Symfony\Component\Filesystem\Exception\FileNotFoundException;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

final class GetDataProvider implements GetDataProviderInterface
{
    private array $bands;

    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly DataTransformInterface $dataTransform,
        private readonly KernelInterface $kernel
    ) {
        $this->loadBands();
    }

    #[Override]
    public function getLocationData(): array
    {
        return [
            'description' => 'West Indian Social Club',
            'city' => 'Rugby',
            'address' => 'CV21 3HE',
            'country' => 'UK'
        ];
    }

    #[Override]
    public function getContactData(): array 
    {
        return  [
            'email' => 'test@scrumbagfest.org'
        ];
    }

    #[Override]
    public function getEventData(): array
    {
        return [
            'genres' => 'Grindcore · Death · Noise · Crust',
            'edition' => $this->translator->trans('event.edition')
        ];
    }

    #[Override]
    public function getDateData(): array
    {
        return [
            'start' => new DateTime('2026-09-17 18:30:00'),
            'end' => new DateTime('2026-09-19 12:00:00'),
            'days' => '17, 18 & 19',
            'days_short' => '17-19',
            'month' => 'JUL',
            'year' => '2026',
            'total_days' => '3'
        ];
    }

    #[Override]
    public function getBandsData(): array
    {
        return [
            'bands' => $this->bands,
            'countries' => $this->dataTransform->getBandCountries($this->bands)
        ];
    }

    public function getBandData(string $band): array
    {
        return $this->bands[$band] ?? [];
    }

    #[Override]
    public function getTicketsData(): array
    {
        return [
            'thursday' => [
                'price' => 25,
                'tax' => 2.1
            ],
            'friday' => [
                'price' => 30,
                'tax' => 2.52
            ],
            'saturday' => [
                'price' => 30,
                'tax' => 2.52
            ],
            'full' => [
                'price' => 55,
                'tax' => 4.62
            ]
        ];
    }

    private function loadBands(): void
    {
        $bands = json_decode(file_get_contents($this->getBandsFile()), true);
        if (!$bands) {
            throw new FileEmptyException('bands.json');
        }
        $this->bands = $bands;
    }

    private function getBandsFile(): string
    {
        $bandsFile = "{$this->kernel->getProjectDir()}/private/bands.json";
        if (!file_exists($bandsFile)) {
            throw new FileNotFoundException();
        }
        return $bandsFile;
    }

    public function getVideoData(): array
    {
        return [
            0 => [
                'title' => 'PROMO',
                'year' => 2026,
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				                Tria dias de inferno sonoro en las montañas. Sin postureo.
				                Sin mainstream. Solo música de verdad.',
                'thumb' => 'video_promo_thumbnail.jpg',
                'src' => 'promo_2026.mp4'
            ],
            1 => [
                'title' => 'PREVIOUS',
                'year' => 2026,
                'description' => 'TEST TEST TEST',
                'thumb' => 'video_2025_thumbnail.png',
                'src' => 'promo_2025.mp4'
            ]
        ];
    }
}
