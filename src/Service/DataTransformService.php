<?php

namespace App\Service;

use App\Interface\DataTransformInterface;
use Override;

final class DataTransformService implements DataTransformInterface
{
    #[Override]
    public function getBandCountries(array $bands): array
    {
       return array_unique(array_column($bands, 'country'));
    }
}