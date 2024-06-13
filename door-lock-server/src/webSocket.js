const ws = require("ws");

const { User } = require("../models/user");

module.exports = server => {
  const wsServer = new ws.Server({ server: server });

  wsServer.on("connection", (ws, request) => {
    const ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress;

    console.log(`새로운 클라이언트[${ip}] 접속`);

    if (ws.readyState === ws.OPEN) {
      // 연결 여부 체크
      ws.send(`클라이언트[${ip}] 접속을 환영합니다 from 서버`); // 데이터 전송
    }

    // 3) 클라이언트로부터 메시지 수신 이벤트 처리
    ws.on("message", msg => {
      // console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`);
      const tempMsg = msg.toString().split("-");
      // for (let i in msg) {
      //   console.log(i);
      // }
      ws.send(`메시지 ${tempMsg[0]}-${tempMsg[1]} 잘 받았습니다! from 서버`);
      if (msg.toString() === "normal") {
        ws.send("test용 normal~");
        wsServer.clients.forEach(client => {
          if (client != ws) {
            client.send(`normal`);
          }
        });
      }

      if (tempMsg[0] === "doorlockStatus") {
        if (tempMsg[1] === "open") {
          ws.send("열렸노");
          User.updateDoorlockStatus({ userId: "test", doorlockStatus: false })
            .then(result => {
              wsServer.clients.forEach(client => {
                if (client != ws) {
                  client.send(`${tempMsg[1]}`);
                }
              });
            })
            .catch(err => {
              console.log("도어락 열림 오류 : ", err);
            });
        } else if (tempMsg[1] === "close") {
          ws.send("닫혔노");
          User.updateDoorlockStatus({ userId: "test", doorlockStatus: true })
            .then(result => {
              wsServer.clients.forEach(client => {
                if (client != ws) {
                  client.send(`${tempMsg[1]}`);
                }
              });
            })
            .catch(err => {
              console.log("도어락 닫힘 오류 : ", err);
            });
        } else if (tempMsg[1] === "mujeok") {
          ws.send("무적이노");
          User.updateDoorlockStatus({ userId: "test", doorlockStatus: "mujeok" })
            .then(result => {
              wsServer.clients.forEach(client => {
                if (client != ws) {
                  client.send(`${tempMsg[1]}`);
                }
              });
            })
            .catch(err => {
              console.log("도어락 무적 오류 : ", err);
            });
        } else if (tempMsg[1] === "unMujeok") {
          ws.send("언무적이노");
          User.updateDoorlockStatus({ userId: "test", doorlockStatus: "unMujeok" })
            .then(result => {
              wsServer.clients.forEach(client => {
                if (client != ws) {
                  client.send(`${tempMsg[1]}`);
                }
              });
            })
            .catch(err => {
              console.log("도어락 언무적 오류 : ", err);
            });
        }
      } else if (tempMsg[0] === "pwChange") {
        ws.send("비번 변경됐노");
        User.updateDoorlockPasswordById({ userId: "test", doorlockPassword: tempMsg[1] })
          .then(result => {
            wsServer.clients.forEach(client => {
              if (client != ws) {
                client.send(`${tempMsg[0]}-${tempMsg[1]}`);
              }
            });
          })
          .catch(err => {
            console.log(`비밀번호 변경 오류 : ${err}`);
          });
      }
    });

    // 4) 에러 처러
    ws.on("error", error => {
      console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`);
    });

    // 5) 연결 종료 이벤트 처리
    ws.on("close", () => {
      console.log(`클라이언트[${ip}] 웹소켓 연결 종료`);
    });
  });
};
