<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/location/')]
final class LocationController extends AbstractController
{
    #[Route('how-to-arrive', name: 'app_info_transport', methods: ['GET'])]
    public function main(): Response
    {
        return $this->redirectToRoute('app_coming-soon', [
            'origin' => 'location'
        ]);
    }
}