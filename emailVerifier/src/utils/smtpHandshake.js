// mere code and recipient mail server ke beech mei TCP connection create krne ke liye we require net
const net = require("net");

const smtpHandshake = (primaryHost, fromEmail, toEmail) => {
    let socket;
    try {
        // open karo TCP socket on port 25 and wait for server's greeting

        socket = net.createConnection(25, primaryHost);

        // recipient server se jo msg aayega vo buffer mei strore hoga

        let buffer = ""; // string
        let step = 0;

        const randomEmail = "random.ajk.xyz@" + toEmail.split("@")[1];

        socket.on("data", (chunk) => {

            // recipient se aane wale msg ko stringify krke append kr diya in buffer

            buffer = buffer + chunk.toString();

            // console.log(buffer); 

            // \r\n mtlb ki receipient server se atleast ek complete msg aaya hai

            if (buffer.includes("\r\n")) {

                // lines is an array of string
                // \r\n ke basis par split kr diya buffer string ko

                const lines = buffer.split("\r\n");

                // this is lines array
                // ['220 mx.google.com ESMTP d9443c01a7336-23506a3abebsi119713135ad.96 - gsmtp', '' ]
                // console.log(lines);

                // agar lines array mei last string empty ya incomplete hai, we pop it from lines and add it to buffer
                buffer = lines.pop();

                // agar incomplete msg nahi tha lines mei, then buffer empty string ban gya
                // console.log(buffer); 


                // this is lines now -> ['220 mx.google.com ESMTP d9443c01a7336-23506a3abebsi119713135ad.96 - gsmtp']
                // console.log(lines);

                for (let line of lines) {
                    line = line.trim();

                    if (step === 0 && line.startsWith("220")) {
                        socket.write(`EHLO ${fromEmail.split("@")[1]}\r\n`);
                        step = 1;
                        continue; // skip the current iteration - jump to next
                    }

                    if (step === 1 && line.startsWith("250")) {
                        socket.write(`MAIL FROM:<${fromEmail}>\r\n`);
                        step = 2;
                        continue;
                    }

                    if (step === 2 && line.startsWith("250")) {
                        // socket.write(`RCPT TO:<${toEmail}>\r\n`);
                        socket.write(`RCPT TO:<${randomEmail}>\r\n`);
                        step = 3;
                        continue;
                    }

                    if(step===3){

                        // if random email is catchall 
                        if(line.startsWith("250")){
                            socket.write("QUIT\r\n");
                            console.log("catch all email");
                        }
                        // random email catchall nhi h, ab hum toEmail ki existence check karenge
                        if(line.startsWith("550")){
                            socket.write(`RCPT TO:<${toEmail}>\r\n`);
                            step = 4;
                            continue;                            
                        }

                        // close the connection
                        socket.write("QUIT\r\n");

                    }

                    if(step === 4){
                        if(line.startsWith("250")){
                            socket.write("QUIT\r\n");
                            console.log("valid hai not catch all")
                        }

                        if(line.startsWith("550")){    
                            socket.write("QUIT\r\n");
                            console.log("invalid email");
                        }

                        socket.write("QUIT\r\n");
                    }


                }

            }
        });
    } catch (error) {
        throw new Error("error aa gyaaa: ", error.message);
    }

    socket.on("error", (error) => {
        console.log("socket message: ", error.message);
    })
}

module.exports = smtpHandshake;


// // mere code and recipient mail server ke beech mei TCP connection create krne ke liye we require net
// const net = require("net");

// const smtpHandshake = (primaryHost, fromEmail, toEmail) => {
//     let socket;
//     try {
//         // open karo TCP socket on port 25 and wait for server's greeting

//         socket = net.createConnection(25, primaryHost);

//         // recipient server se jo msg aayega vo buffer mei strore hoga

//         let buffer = ""; // string
//         let step = 0;

//         socket.on("data", (chunk) => {

//             // recipient se aane wale msg ko stringify krke append kr diya in buffer

//             buffer = buffer + chunk.toString();

//             // console.log(buffer); 

//             // \r\n mtlb ki receipient server se atleast ek complete msg aaya hai

//             if (buffer.includes("\r\n")) {

//                 // lines is an array of string
//                 // \r\n ke basis par split kr diya buffer string ko

//                 const lines = buffer.split("\r\n");

//                 // this is lines array
//                 // ['220 mx.google.com ESMTP d9443c01a7336-23506a3abebsi119713135ad.96 - gsmtp', '' ]
//                 // console.log(lines);

//                 // agar lines array mei last string empty ya incomplete hai, we pop it from lines and add it to buffer
//                 buffer = lines.pop();

//                 // agar incomplete msg nahi tha lines mei, then buffer empty string ban gya
//                 // console.log(buffer); 


//                 // this is lines now -> ['220 mx.google.com ESMTP d9443c01a7336-23506a3abebsi119713135ad.96 - gsmtp']
//                 // console.log(lines);

//                 for (let line of lines) {
//                     line = line.trim();

//                     if (step === 0 && line.startsWith("220 ")) {
//                         socket.write(`EHLO ${fromEmail.split("@")[1]}\r\n`);
//                         step = 1;
//                         continue; // skip the current iteration - jump to next
//                     }

//                     if (step === 1 && line.startsWith("250 ")) {
//                         socket.write(`MAIL FROM:<${fromEmail}>\r\n`);
//                         step = 2;
//                         continue;
//                     }

//                     if (step === 2 && line.startsWith("250 ")) {
//                         socket.write(`RCPT TO:<${toEmail}>\r\n`);
//                         step = 3;
//                         continue;
//                     }

//                     if (step === 3) {
//                         if (line.startsWith("250 ")) {
//                             console.log("email is valid");
//                         }

//                         else if (line.startsWith("550 ")) {
//                             console.log("invalid email");
//                         }

//                         else {
//                             console.log("unexpected response:", line);
//                         }

//                         // close the connection
//                         socket.write("QUIT\r\n");
//                         step = 4;
//                         continue;
//                     }

//                 }

//             }
//         });
//     } catch (error) {
//         throw new Error("error aa gyaaa: ", error.message);
//     }

//     socket.on("error", (error) => {
//         console.log("socket message: ", error.message);
//     })
// }

// module.exports = smtpHandshake;
