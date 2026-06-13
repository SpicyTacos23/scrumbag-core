<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class InfoController extends AbstractController
{
    #[Route('', name: 'app_info_transport', methods: ['GET'])]
    public function transport(): Response
    {
        return new Response('transport');
    }
}
