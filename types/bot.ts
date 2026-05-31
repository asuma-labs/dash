export interface BotStatus {
    status: string;
    public: boolean;
    uptime: number;
    version: string;
    startTime: number;
    clones: number;
}

export interface SystemStats {
    ram: {
        used: number;
        heapTotal: number;
        heapUsed: number;
        external: number;
    };
    uptime: number;
    cpu: {
        user: number;
        system: number;
    };
    platform: string;
    nodeVersion: string;
    isBun: boolean;
}

export interface CloneBot {
    nomor: string;
    status: string;
    startTime?: number;
}
