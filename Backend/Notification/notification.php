<?php
        #API access key from Google API's Console
        define( 'API_ACCESS_KEY', 'AAAAhvE8cWc:APA91bFCip-Me8oN1uud-IWFDOyIbht47bWhqOwNXDR2CzZ7AgypE00vlLypb9v9xYh-AL6tYwDWrqCwuE0LTOPtA1SGDHiUs4NaL5K-C98cVS7EOaXzFYanW0yGVkfF-pUq6sOtDBDp' );

        function send_notification($token, $message, $message_title)
        {
            #prep the bundle
            $msg = array
            (
                'body' => $message,
                'title' => $message_title,
                'icon'	=> 'myicon',/*Default Icon*/
                'sound' => 'mySound'/*Default sound*/
            );
            $fields = array
            (
                'to' => $token,
                'notification' => $msg
            );


            $headers = array
            (
                'Authorization: key=' . API_ACCESS_KEY,
                'Content-Type: application/json'
            );
            #Send Reponse To FireBase Server
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
            $result = curl_exec($ch);
            curl_close($ch);
            #Echo Result Of FireBase Server
            echo $result;
        }


        function send_notification_with_id($pdo, $id, $message, $messageTitle)
        {
            $req_str = 'SELECT phone_token FROM user WHERE id = ?';
            $request = $pdo->prepare($req_str);
            $request->bindParam(1, $id, PDO::PARAM_INT);
            $request->execute();
            if ($request->rowCount() > 0) {
                $phone_token = $request->fetchAll()[0]['phone_token'];
                send_notification($phone_token, $message, $messageTitle);
                return true;
            }
            return false;
        }

?>