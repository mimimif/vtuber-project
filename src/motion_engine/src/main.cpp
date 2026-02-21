#include "camera_input.hpp"
#include "ws_server.hpp"
#include "face_tracker.hpp"
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

    vtuber::motion::FaceTracker tracker;
    if (!tracker.initialize("haarcascade_frontalface_alt2.xml")) {
        std::cerr << "Failed to initialize face tracker." << std::endl;
    }

    std::cout << "Press 'ESC' in the preview window to exit." << std::endl;

    while (camera.is_open()) {
        auto frame = camera.get_latest_frame();
        if (frame.is_valid) {
            
            // Extract 2D parameters
            auto params = tracker.process_frame(frame.image, true);
            
            // Display the current frame
            cv::imshow("Motion Engine - 2D Face Tracking Preview", frame.image);
            
            // Broadcast parameters over WebSocket
            ws_server.broadcast_motion_data(params);
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
