import { BaileysEventMap, WASocket } from "@adiwajshing/baileys";

export function Command(name: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    return {
      value: function (...args: any[]): any {
        const value = descriptor.value.apply(target, args);
        const type: keyof BaileysEventMap<any> = "messages.upsert";

        class Call {
          sock: WASocket;
          constructor(sock) {
            this.sock = sock;
          }
          callback = (m) => {
            const msg = m.messages[0];
            const messageContent =
              msg.message?.conversation ||
              msg.message?.extendedTextMessage?.text;

            if (messageContent.toUpperCase() === name.toUpperCase()) {
              this.sock.sendMessage(m.messages[0].key.remoteJid, {
                text: value,
              });
            }
          };
        }
        return { type, Call };
      },
    };
  };
}
