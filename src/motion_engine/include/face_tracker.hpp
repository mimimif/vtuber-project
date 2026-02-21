#pragma once

#include <opencv2/opencv.hpp>
#include <string>

namespace vtuber {
namespace motion {

struct Avatar2DParams {
    bool is_tracked;
    
    // Face Angles [-30 to 30 degrees usually]
    float param_angle_x;
    float param_angle_y;
    float param_angle_z;
    
    // Eyes [0.0 to 1.0]
    float param_eye_l_open;
    float param_eye_r_open;
    
    // Mouth [0.0 to 1.0]
    float param_mouth_open_y;
    
    // Body Angle [-10 to 10 degrees]
    float param_body_angle_x;
};

class FaceTracker {
public:
    FaceTracker();
    ~FaceTracker();

    // Requires path to a haar cascade XML file
    bool initialize(const std::string& cascade_path);
    
    // Processes the frame and extracts 2D parameters
    // Also draws debug information on the frame if requested
    Avatar2DParams process_frame(cv::Mat& frame, bool draw_debug = true);

private:
    cv::CascadeClassifier face_cascade_;
    Avatar2DParams last_params_;
};

} // namespace motion
} // namespace vtuber
