#pragma once

#include <opencv2/opencv.hpp>
#include <memory>
#include <string>

namespace vtuber {
namespace motion {

struct CameraFrame {
    cv::Mat image;
    long long timestamp_ms;
    bool is_valid;
};

class CameraInput {
public:
    CameraInput();
    ~CameraInput();

    bool initialize(int camera_index = 0, int width = 1280, int height = 720);
    bool initialize(const std::string& video_path);
    void shutdown();

    CameraFrame get_latest_frame();
    bool is_open() const;

private:
    std::unique_ptr<cv::VideoCapture> capture_;
};

} // namespace motion
} // namespace vtuber
