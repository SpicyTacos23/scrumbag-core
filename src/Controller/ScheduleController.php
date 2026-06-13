<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/schedule/')]
final class ScheduleController extends AbstractController
{
    #[Route('', name: 'app_schedule', methods: ['GET'])]
    public function list(): Response
    {
        return new Response('Schedule');
    }
}