#include "camera_input.hpp"
#include <iostream>
#include <opencv2/highgui.hpp>

int main() {
    std::cout << "VTuber Realtime Motion Engine Simulator started." << std::endl;
    
    vtuber::motion::CameraInput camera;
    if (!camera.initialize(0, 640, 480)) {
        std::cerr << "Failed to initialize camera." << std::endl;
        return -1;
    }

    std::cout << "Press 'ESC' in the preview window to exit." << std::endl;

    while (camera.is_open()) {
        auto frame = camera.get_latest_frame();
        if (frame.is_valid) {
            // Display the current frame
            cv::imshow("Motion Engine - Camera Input Preview", frame.image);
        }

        // Wait a bit and check if ESC (27) was pressed
        if (cv::waitKey(30) == 27) {
            std::cout << "Exiting..." << std::endl;
            break;
        }
    }
    
    camera.shutdown();
    cv::destroyAllWindows();
    return 0;
}
