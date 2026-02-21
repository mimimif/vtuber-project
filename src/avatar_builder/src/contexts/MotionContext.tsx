import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface Avatar2DParams {
    is_tracked: boolean;
    param_angle_x: number;
    param_angle_y: number;
    param_angle_z: number;
    param_eye_l_open: number;
    param_eye_r_open: number;
    param_mouth_open_y: number;
    param_body_angle_x: number;
}

const defaultParams: Avatar2DParams = {
    is_tracked: false,
    param_angle_x: 0,
    param_angle_y: 0,
    param_angle_z: 0,
    param_eye_l_open: 1,
    param_eye_r_open: 1,
    param_mouth_open_y: 0,
    param_body_angle_x: 0,
};

interface MotionContextType {
    motionData: Avatar2DParams;
    isConnected: boolean;
}

const MotionContext = createContext<MotionContextType>({
    motionData: defaultParams,
    isConnected: false,
});

export const useMotion = () => useContext(MotionContext);

export const MotionProvider = ({ children }: { children: ReactNode }) => {
    const [motionData, setMotionData] = useState<Avatar2DParams>(defaultParams);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let ws: WebSocket | null = null;
        let reconnectTimer: number;

        const connect = () => {
            ws = new WebSocket('ws://localhost:9002');

            ws.onopen = () => {
                console.log('Connected to Motion Engine WebSocket');
                setIsConnected(true);
            };

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'avatar_2d_params') {
                        setMotionData({
                            is_tracked: data.is_tracked,
                            param_angle_x: data.param_angle_x,
                            param_angle_y: data.param_angle_y,
                            param_angle_z: data.param_angle_z,
                            param_eye_l_open: data.param_eye_l_open,
                            param_eye_r_open: data.param_eye_r_open,
                            param_mouth_open_y: data.param_mouth_open_y,
                            param_body_angle_x: data.param_body_angle_x,
                        });
                    }
                } catch (e) {
                    console.error('Failed to parse motion data', e);
                }
            };

            ws.onclose = () => {
                console.log('Disconnected from Motion Engine');
                setIsConnected(false);
                setMotionData(prev => ({ ...prev, is_tracked: false }));
                // Try to reconnect every 3 seconds
                reconnectTimer = window.setTimeout(connect, 3000);
            };

            ws.onerror = () => {
                ws?.close();
            };
        };

        connect();

        return () => {
            clearTimeout(reconnectTimer);
            ws?.close();
        };
    }, []);

    return (
        <MotionContext.Provider value={{ motionData, isConnected }}>
            {children}
        </MotionContext.Provider>
    );
};
