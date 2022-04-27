<?php

namespace App\Controllers;

use App\Models\Singer;

header('Access-Control-Allow-Origin: *');

class SingerController extends BaseController
{

    public function index()
    {


        $response = array('error' => false, 'message' => 'ok', 'data' => []);

        $singers = new Singer();
        $data = $singers->findAll();

        header('Content-Type: application/json');

        $response['data'] = $data; //*La info de mi base de datos se manda en JSON
        echo json_encode($response);

        exit;
    }
    public function store()
    {

        $response = array('error' => false, 'message' => 'ok', 'data' => []);
        try {
            header('Content-Type: application/json');

            $json = file_get_contents('php://input');
            $request = json_decode($json, TRUE);

            $singer = new Singer();

            $data = array(
                'name' => $request['name'],
                'age' => intval($request['age']),
                'musical_genre' => $request['musical_genre'],
                'nationality' => $request['nationality']
            );

            $singer->save($data);
            $newSinger  = $singer->where('name', $data['name'])->first();
            $response['data'] = array('singer' => $newSinger);
            echo json_encode($response);
            exit;
        } catch (\Throwable $th) {
            $response['error'] = true;
            $response['message'] = $th->getMessage();
            echo json_encode($response);
            exit;
        }
    }

    public function update($id = null)
    {
        /* echo 'Hello world';
        exit; */
        $response = array('error' => false, 'message' => 'ok', 'data' => []);
        try {
            header('Content-Type: application/json');

            $json = file_get_contents('php://input');
            $request = json_decode($json, TRUE);

            $singer = new Singer();

            $data = array(
                'name' =>  $request['name'],
                'age' =>  intval($request['age']),
                'musical_genre' =>  $request['musical_genre'],
                'nationality' =>  $request['nationality']
            );

            $result = $singer->where('singer_id', $id)->first();
            if (empty($result)) {
                http_response_code(404);
                $response['error'] = true;
                $response['message'] = "SInger not found";

                echo json_encode($response);
                exit;
            }
            $singer->where('singer_id', $id)->set($data)
                ->update();
            $newSinger  = $singer->where('name', $data['name'])->first();
            $response['data'] = array('singer' => $newSinger);
            echo json_encode($response);
            exit;
        } catch (\Throwable $th) {
            $response['error'] = true;
            $response['message'] = $th->getMessage();
            echo json_encode($response);
            exit;
        }
    }

    public function destroy($id)
    {

        try {

            $response = array('error' => false, 'message' => 'ok', 'data' => []);

            $singer = new Singer();
            $id = intval($id);

            $data = $singer->where('singer_id', $id)->delete(); //*Buscamos por el id


            if (empty($data)) {
                $response['error'] = true;
                $response['message'] = 'Not exist';

                http_response_code(404);
                echo json_encode($response);
                exit;
            }

            header('Content-Type: application/json');

            $response['data'] = $data; //*La info de mi base de datos se manda en JSON

            echo json_encode($response);
        } catch (\Throwable $th) {
            echo $th->getmessage();
        }

        exit;
    }

    public function getSinger($id)
    {
        header('Access-Control-Allow-Origin: *');

        try {
            //code...
            $response = array('error' => false, 'message' => 'ok', 'data' => []);

            $singer = new Singer();
            $id = intval($id);
            /* var_dump($id);
            exit; */
            $data = $singer->where('singer_id', $id)->first(); //*Buscamos por el id

            if (empty($data)) {
                $response['error'] = true;
                $response['message'] = 'Not exist';

                http_response_code(404);
                echo json_encode($response);
                exit;
            }

            header('Content-Type: application/json');

            $response['data'] = $data; //*La info de mi base de datos se manda en JSON

            echo json_encode($response);
        } catch (\Throwable $th) {
            echo $th->getmessage();
        }

        exit;
    }

    public function show()
    {
        return view('welcome_message');
    }
}
