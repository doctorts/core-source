import {
  fetchLatestBaileysVersion,
  useSingleFileAuthState,
} from "@adiwajshing/baileys";

import { Client } from "./client.util";

export async function startSock(classes?: any[]) {
  const { version } = await fetchLatestBaileysVersion();

  const { state } = useSingleFileAuthState("./auth_info_multi.json");

  const sock = new Client({
    version,
    printQRInTerminal: true,
    auth: state,
  });

  sock.start(classes);
}
