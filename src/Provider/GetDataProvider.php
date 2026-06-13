<?php

namespace App\Provider;

use App\Interface\DataTransformInterface;
use App\Interface\GetDataProviderInterface;
use DateTime;
use Override;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

final class GetDataProvider implements GetDataProviderInterface
{
    public function __construct(
        private readonly TranslatorInterface $translator,
        private readonly DataTransformInterface $dataTransform
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
        $bands = [
            'frakaso' => [
                'name' => 'FRAKASO',
                'country' => 'UK',
                'country_name' => 'UK/Catalonia',
                'genres' => ['d-beat', 'grindcore']
            ],
            'vile_species' => [
                'name' => 'Vile Species',
                'country' => 'GR',
                'country_name' => 'Greece',
                'genres' => ['deathgrind']
            ]
        ];
        return [
            'bands' => $bands,
            'countries' => $this->dataTransform->getBandCountries($bands)
        ];
    }
}
