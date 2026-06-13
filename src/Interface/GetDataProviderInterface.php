<?php

namespace App\Interface;

interface GetDataProviderInterface
{
    public function getLocationData(): array;
    public function getEventData(): array;
    public function getDateData(): array;
    public function getBandsData(): array;
}