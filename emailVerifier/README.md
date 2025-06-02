//about the project
//folder structure
//file input - redis - download - server 


2 June 2025:

-- problems faced due to disposable emails:

larayef345@jeanssi.com - temp-mail ka email

tried verifying disposable emails with my software - it couldn't find it but Instantly auth system was able to find it out. Also, emailable was able to find it out. I did stack over flow, it seems that most efficient login systems are using paid services for checking disposable emails which regularly update the list of disposable emails.

i tried using kickbox api but it didn't work too. ---  https://open.kickbox.com/v1/disposable/{DomainOrEmailAddress}

i am sticking with disposable-email-domains

-- SMTP handshake

1.. let's say mujhe bharat@instantly.ai verify karna h. pehle mai iss email ke domain ka mail server dhundunga - jo ki mx record hi hai jiski top priority hai. 

2.. ab mera code act krega as mail sender and it will try to open a connection with mail server of instantly.ai.

3.. sender ka server bhejega "EHLO mydomain.com"

-- This is like introducing yourself. “EHLO” means “Hello, I’m a mail sender.”   
-- “mydomain.com” is giving your own domain name (so the server knows who’s calling).

4.. ab agar receiver ke server ne reply kiya -- “250 OK”
iska matlab ki receiver ka server is ready to talk 

5.. fir sender ka server bolega -- MAIL FROM:postmaster@gmail.com
yaha aap receiver ke server ko bata rahe hai ki aap kis email se contact kar rahe hai

6.. agar recipient server kahega "250 OK", iska mtlb ki recipient server has accepted sender address.

7.. fir sender server bolega -- RCPT TO:bharat@instantly.ai

yaha sender server recipient server se puch raha h ki bharat@instantly.ai naam ka kkoi mailbox hai?

8.. if recipient server says -- "250 OK", iska mtlab ki haa hai.

9.. agar recipient server kahega -- “550 User unknown” iska mtlb hai ki iss naam se koi mailBox nahi hai.

10.. then sender server bolega "QUIT" - connection close ho gya!

point 1 to point 10 ki baatchit/conversation ko hum smtp handshake kehte hai.


