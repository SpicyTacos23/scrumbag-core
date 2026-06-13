<?php

namespace App\Exception;

class FileEmptyException extends \RuntimeException
{
    public function __construct(string $filename)
    {
        parent::__construct(sprintf('File can not be empty!: %s', $filename));
    }
}
