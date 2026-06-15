<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('error/')]
final class ErrorsController extends AbstractController
{
    #[Route('coming-soon', name: 'app_coming-soon', methods: ['GET'])]
    public function notImplemented(Request $request): Response
    {
        return $this->render('coming-soon.html.twig', [
            'title' => $request->query->get('origin') ?? ''
        ]);
    }
}