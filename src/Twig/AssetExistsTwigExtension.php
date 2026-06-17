<?php

namespace App\Twig;

use Override;
use Symfony\Component\HttpKernel\KernelInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

final class AssetExistsTwigExtension extends AbstractExtension
{
    public function __construct(private readonly KernelInterface $kernel) {}

    #[Override]
    public function getFunctions()
    {
        return [
            new TwigFunction('assetExists', [$this, 'fileExists'])
        ];
    }

    public function assetExists(string $filename): bool
    {
        return file_exists("{$this->kernel->getProjectDir()}/assets/$filename");
    }
}
