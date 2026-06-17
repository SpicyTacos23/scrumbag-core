<?php

namespace App\Interface;

interface GetDataProviderInterface
{
    public function getLocationData(): array;
    public function getContactData(): array;
    public function getEventData(): array;
    public function getDateData(): array;
    public function getBandsData(): array;
    public function getBandData(string $band): array;
    public function getTicketsData(): array;
    public function getVideoData(): array;
}