const dnsPromises = require('dns').promises;

// mere code and recipient mail server ke beech mei TCP connection create krne ke liye we require net
const net = require("net");

// we will check whether the domain has mx record or not, if mx record not found - it means mail can't be delivered. we will use node's built in dns library to check mx record

const dnsCheck = async (mainDomain, fromEmail, toEmail) => {

    try {

        const records = await dnsPromises.resolveMx(mainDomain);

        // mx records extract karo
        // console.log(records);

        // mx records ko priority wise sort kro
        records.sort((a, b) => a.priority - b.priority);

        const primaryHost = records[0].exchange;

        // let's say mx record exist karta hai

        if (records.length > 0) {

            // open karo TCP socket on port 25 and wait for server's greeting

            const socket = net.createConnection(25, primaryHost);

            // recipient server se jo msg aayega vo buffer mei strore hoga

            let buffer = ""; // string

            socket.on("data", (chunk) => {

                // recipient se aane wale msg ko stringify krke append kr diya in buffer

                buffer = buffer + chunk.toString();

                console.log(buffer); 

                // \r\n mtlb ki receipient server se atleast ek complete msg aaya hai

                if (buffer.includes("\r\n")) {

                    // lines is an array of string
                    // \r\n ke basis par split kr diya buffer string ko

                    const lines = buffer.split("\r\n");

                    
                    // this is lines array
                    // ['220 mx.google.com ESMTP d9443c01a7336-23506a3abebsi119713135ad.96 - gsmtp', '' ]
                    console.log(lines);

                    // agar lines array mei last string empty ya incomplete hai, we pop it from lines and add it to buffer
                    buffer = lines.pop();

                    // agar incomplete msg nahi tha lines mei, then buffer empty string ban gya
                    console.log(buffer); 


            // this is lines now -> ['220 mx.google.com ESMTP d9443c01a7336-23506a3abebsi119713135ad.96 - gsmtp']
                    console.log(lines);

                    for (let line of lines) {
                        line = line.trim();

                        if (line.startsWith("220")) {
                            socket.write(`EHLO ${fromEmail}m\r\n`);
                        }
                    }

                }
            })

            socket.on("error", (error) => {
                console.log("socket message: ", error.message);
            })
        }

        else {
            console.log("email is invalid");
        }
    } catch (error) {
        console.log("email is invalid");
    }


}

module.exports = dnsCheck;


//////////////

// const dnsPromises = require("dns").promises;
// const net = require("net");

// /**
//  * Performs a basic SMTP handshake to check if a mailbox exists.
//  * @param {string} mxHost    - The MX host (e.g., "mx.example.com")
//  * @param {string} fromEmail - A sender address on your domain (e.g., "postmaster@yourdomain.com")
//  * @param {string} toEmail   - The target address you want to verify (e.g., "user@domain.com")
//  * @returns {Promise<"exists" | "not_exists" | "error">}
//  */

// function checkMailbox(mxHost, fromEmail, toEmail) {

//   return new Promise((resolve, reject) => {
//     let step = 0;
//     const socket = net.createConnection(25, mxHost);
//     let buffer = "";

//     function sendLine(line) {
//       socket.write(line + "\r\n");
//     }

//     socket.on("data", (chunk) => {
//       buffer += chunk.toString();
//       if (buffer.includes("\r\n")) {
//         const lines = buffer.split("\r\n");
//         buffer = lines.pop();
//         for (let line of lines) {
//           handleResponse(line.trim());
//         }
//       }
//     });

//     socket.on("error", (err) => {
//       resolve("error");
//     });

//     socket.on("end", () => {
//       // Connection closed by server
//     });

//     function handleResponse(line) {
//       switch (step) {
//         case 0:
//           // 220 greeting
//           if (line.startsWith("220")) {
//             sendLine("EHLO yourdomain.com");
//             step = 1;
//           } else {
//             socket.end("QUIT\r\n");
//             resolve("error");
//           }
//           break;

//         case 1:
//           // Wait for EHLO response (look for a "250 " line)
//           if (line.startsWith("250 ")) {
//             sendLine(`MAIL FROM:<${fromEmail}>`);
//             step = 2;
//           }
//           break;

//         case 2:
//           // Wait for MAIL FROM response
//           if (line.startsWith("250")) {
//             sendLine(`RCPT TO:<${toEmail}>`);
//             step = 3;
//           } else {
//             socket.end("QUIT\r\n");
//             resolve("not_exists");
//           }
//           break;

//         case 3:
//           // Wait for RCPT TO response
//           if (line.startsWith("250")) {
//             sendLine("QUIT");
//             resolve("exists");
//           } else if (line.startsWith("550")) {
//             sendLine("QUIT");
//             resolve("not_exists");
//           } else {
//             sendLine("QUIT");
//             resolve("not_exists");
//           }
//           step = 99;
//           break;

//         case 99:
//           // Already resolved; ignore further lines
//           break;
//       }
//     }
//   });
// }

// /**
//  * Check if a domain has MX records and then perform an SMTP handshake on the primary host.
//  * @param {string} mainDomain - The domain to check (e.g. "example.com")
//  * @param {string} fromEmail  - A valid sender address on your domain
//  * @param {string} toEmail    - The full email you want to verify (e.g. "user@example.com")
//  */
// const dnsCheck = async (mainDomain, fromEmail, toEmail) => {
//   try {
//     const records = await dnsPromises.resolveMx(mainDomain);
//     // If no records, domain cannot receive email
//     if (!records || records.length === 0) {
//       console.log("email is invalid (no MX records)");
//       return;
//     }

//     // Sort MX records by ascending priority
//     records.sort((a, b) => a.priority - b.priority);
//     const primaryHost = records[0].exchange;
//     console.log("Primary MX host:", primaryHost);

//     // Perform SMTP handshake to check mailbox existence
//     const result = await checkMailbox(primaryHost, fromEmail, toEmail);

//     if (result === "exists") {
//       console.log("Mailbox exists");
//     } else if (result === "not_exists") {
//       console.log("Mailbox does not exist");
//     } else {
//       console.log("Error during SMTP handshake");
//     }
//   } catch (error) {
//     console.log("email is invalid (DNS lookup failed)");
//   }
// };

// module.exports = dnsCheck;
