<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/news/')]
final class NewsController extends AbstractController
{
    #[Route('', name: 'app_news', methods: ['GET'])]
    public function main(): Response
    {
        return new Response('NEWS');
    }

    #[Route('{slug}', name: 'app_news_detail', methods: ['GET'])]
    public function get(string $slug): Response
    {
        return new Response($slug);
    }
}