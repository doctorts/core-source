import makeWASocket, {
  ConnectionState,
  DisconnectReason,
  WASocket,
} from "@adiwajshing/baileys";
import { Boom } from "@hapi/boom";
import { ClientProps } from "../interfaces/client.interface";

export class Client implements ClientProps {
  sock: WASocket;
  options: object;

  constructor(options?: object) {
    this.options = options;
  }

  start(classes?: any[]) {
    this.sock = makeWASocket(this.options);
    this.connectionUpdate();
    this.message(classes);
  }

  connectionUpdate() {
    this.sock.ev.on("connection.update", async (update: ConnectionState) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        if (
          (lastDisconnect.error as Boom)?.output?.statusCode !==
          DisconnectReason.loggedOut
        ) {
          this.start();
        }
      }
    });
  }

  message(classes: any[]) {
    try {
      classes.map((element) => {
        const { type, Call } = element;

        const teste = new Call(this.sock);
        this.sock.ev.on(type, teste.callback);
      });
    } catch (err) {
      this.connectionUpdate();
      console.log("\x1b[32mYour session has been created, close the program and start again!\x1b[0m")
    }
  }
}
