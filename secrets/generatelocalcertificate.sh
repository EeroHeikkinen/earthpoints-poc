openssl genrsa -out localhost.key 2048
openssl req -new -key localhost.key -subj "/C=/ST=/L=/O=/CN=localhost/" -out localhost.csr -config localhost.conf
openssl x509 -req -extensions v3_req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt -extfile localhost.conf
