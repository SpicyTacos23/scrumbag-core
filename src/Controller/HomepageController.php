<?php

namespace App\Controller;

use App\Interface\GetDataProviderInterface;
use App\Twig\AssetExistsTwigExtension;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomepageController extends AbstractController
{
    #[Route('', name: 'app_homepage', methods: ['GET'])]
    public function main(GetDataProviderInterface $data, AssetExistsTwigExtension $assetExtension): Response
    {
        return $this->render('homepage.html.twig', [
            'data' => [
                'event' => $data->getEventData(),
                'location' => $data->getLocationData(),
                'date' => $data->getDateData(),
                'bands' => $data->getBandsData(),
                'tickets' => $data->getTicketsData(),
                'contact' => $data->getContactData()
            ],
            'extensions' => [
                'assetExtension' => $assetExtension
            ]
        ]);
    }
}
