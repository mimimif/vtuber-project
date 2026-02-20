#include "camera_input.hpp"
#include "ws_server.hpp"
#include <iostream>
#include <opencv2/highgui.hpp>

int main() {
    std::cout << "VTuber Realtime Motion Engine Simulator started." << std::endl;
    
    // Initialize WebSocket server
    vtuber::motion::WebSocketServer ws_server;
    if (!ws_server.start(9002)) {
        std::cerr << "Failed to start WebSocket server." << std::endl;
        return -1;
    }

    vtuber::motion::CameraInput camera;
    if (!camera.initialize(0, 640, 480)) {
        std::cerr << "Failed to initialize camera." << std::endl;
        return -1;
    }

    std::cout << "Press 'ESC' in the preview window to exit." << std::endl;

    float fake_angle = 0.0f;

    while (camera.is_open()) {
        auto frame = camera.get_latest_frame();
        if (frame.is_valid) {
            // Display the current frame
            cv::imshow("Motion Engine - Camera Input Preview", frame.image);
            
            // Broadcast simulated head rotation over WebSocket
            vtuber::motion::MotionData data;
            data.bone_name = "Head";
            data.is_blendshape = false;
            // Simulated simple rotation animation
            fake_angle += 0.05f;
            data.rotation_x = 0.0f;
            data.rotation_y = std::sin(fake_angle) * 0.5f;
            data.rotation_z = 0.0f;
            data.rotation_w = std::cos(fake_angle) * 0.5f;
            
            ws_server.broadcast_motion_data(data);
        }

        // Wait a bit and check if ESC (27) was pressed
        if (cv::waitKey(30) == 27) {
            std::cout << "Exiting..." << std::endl;
            break;
        }
    }
    
    camera.shutdown();
    ws_server.stop();
    cv::destroyAllWindows();
    return 0;
}
