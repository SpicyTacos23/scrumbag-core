<?php

namespace App\Interface;

interface DataTransformInterface
{
     public function getBandCountries(array $bands): array;
}