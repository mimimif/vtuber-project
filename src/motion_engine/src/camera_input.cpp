#include "camera_input.hpp"
#include <iostream>
#include <chrono>

namespace vtuber {
namespace motion {

CameraInput::CameraInput() : capture_(nullptr) {}

CameraInput::~CameraInput() {
    shutdown();
}

bool CameraInput::initialize(int camera_index, int width, int height) {
    capture_ = std::make_unique<cv::VideoCapture>(camera_index);
    if (!capture_->isOpened()) {
        std::cerr << "Failed to open camera device: " << camera_index << std::endl;
        return false;
    }
    
    capture_->set(cv::CAP_PROP_FRAME_WIDTH, width);
    capture_->set(cv::CAP_PROP_FRAME_HEIGHT, height);
    
    std::cout << "Camera initialized successfully." << std::endl;
    return true;
}

bool CameraInput::initialize(const std::string& video_path) {
    capture_ = std::make_unique<cv::VideoCapture>(video_path);
    if (!capture_->isOpened()) {
        std::cerr << "Failed to open video file: " << video_path << std::endl;
        return false;
    }
    return true;
}

void CameraInput::shutdown() {
    if (capture_ && capture_->isOpened()) {
        capture_->release();
    }
    capture_.reset();
}

CameraFrame CameraInput::get_latest_frame() {
    CameraFrame frame;
    frame.is_valid = false;
    frame.timestamp_ms = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch()).count();

    if (capture_ && capture_->isOpened()) {
        capture_->read(frame.image);
        if (!frame.image.empty()) {
            frame.is_valid = true;
        }
    }
    return frame;
}

bool CameraInput::is_open() const {
    return capture_ != nullptr && capture_->isOpened();
}

} // namespace motion
} // namespace vtuber
