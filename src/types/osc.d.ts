declare module 'osc' {
    export class UDPPort {
        constructor(options: {
            localAddress: string,
            localPort: number,
            remoteAddress?: string,
            remotePort?: number
        });

        open(): void;
        send(message: {
            address: string,
            args: any[]
        }): void;

        close(): void;
        options: {
            remoteAddress: string,
            remotePort: number
        };
    }
}
