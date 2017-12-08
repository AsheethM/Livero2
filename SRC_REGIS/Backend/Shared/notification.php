<?php
        #API access key from Google API's Console
        define( 'API_ACCESS_KEY', 'AAAAhvE8cWc:APA91bFCip-Me8oN1uud-IWFDOyIbht47bWhqOwNXDR2CzZ7AgypE00vlLypb9v9xYh-AL6tYwDWrqCwuE0LTOPtA1SGDHiUs4NaL5K-C98cVS7EOaXzFYanW0yGVkfF-pUq6sOtDBDp' );


        function send_notification($token, $message)
        {
            #prep the bundle
            $msg = array
            (
                'body' => $message,
                'title' => 'Title Of Notification',
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

?>