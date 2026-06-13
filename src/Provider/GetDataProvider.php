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
    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly DataTransformInterface $dataTransform,
        private readonly KernelInterface $kernel
    ) {}

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
        $bandsFile = "{$this->kernel->getProjectDir()}/private/bands.json";
        if (!file_exists($bandsFile)) {
            throw new FileNotFoundException();
        }
        $bands = json_decode(file_get_contents($bandsFile), true);
        if (!$bands) {
            throw new FileEmptyException('bands.json');
        }
        return [
            'bands' => $bands,
            'countries' => $this->dataTransform->getBandCountries($bands)
        ];
    }
}
