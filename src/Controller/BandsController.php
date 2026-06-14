<?php

namespace App\Controller;

use App\Interface\GetDataProviderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/bands/')]
final class BandsController extends AbstractController
{
    #[Route('', name: 'app_bands', methods: ['GET'])]
    public function list(): Response
    {
        return new Response('Bands');
    }

    #[Route('{slug}', name: 'app_band_detail', methods: ['GET'])]
    public function get(string $slug, GetDataProviderInterface $getDataProvider): Response
    {
        return $this->render('blocks/band/band-detail.html.twig', [
            'band' => $getDataProvider->getBandData($slug)
        ]);
    }
}