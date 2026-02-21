#include "face_tracker.hpp"
#include <iostream>

namespace vtuber {
namespace motion {

FaceTracker::FaceTracker() {
    last_params_ = {false, 0.0f, 0.0f, 0.0f, 1.0f, 1.0f, 0.0f, 0.0f};
}

FaceTracker::~FaceTracker() {}

bool FaceTracker::initialize(const std::string& cascade_path) {
    if (!face_cascade_.load(cascade_path)) {
        std::cerr << "Error loading face cascade: " << cascade_path << std::endl;
        return false;
    }
    std::cout << "Face tracker initialized with: " << cascade_path << std::endl;
    return true;
}

Avatar2DParams FaceTracker::process_frame(cv::Mat& frame, bool draw_debug) {
    Avatar2DParams params = last_params_;
    params.is_tracked = false;

    if (frame.empty() || face_cascade_.empty()) {
        return params;
    }

    cv::Mat gray;
    cv::cvtColor(frame, gray, cv::COLOR_BGR2GRAY);
    cv::equalizeHist(gray, gray);

    std::vector<cv::Rect> faces;
    face_cascade_.detectMultiScale(gray, faces, 1.1, 4, 0 | cv::CASCADE_SCALE_IMAGE, cv::Size(100, 100));

    if (!faces.empty()) {
        params.is_tracked = true;
        
        // Find the largest face
        cv::Rect face = faces[0];
        for (const auto& f : faces) {
            if (f.area() > face.area()) {
                face = f;
            }
        }

        // Draw debug bounding box
        if (draw_debug) {
            cv::rectangle(frame, face, cv::Scalar(0, 255, 0), 2);
        }

        // Calculate simple parameters based on bounding box
        float center_x = face.x + face.width / 2.0f;
        float center_y = face.y + face.height / 2.0f;
        
        float frame_center_x = frame.cols / 2.0f;
        float frame_center_y = frame.rows / 2.0f;

        // Map X position to Angle Y (turning head left/right)
        // Map Y position to Angle X (pitching head up/down)
        float normalized_x = (center_x - frame_center_x) / frame_center_x; // -1 to 1
        float normalized_y = (center_y - frame_center_y) / frame_center_y; // -1 to 1

        float target_angle_y = normalized_x * -30.0f; // Horizontal movement
        float target_angle_x = normalized_y * 30.0f;  // Vertical movement

        // Simple exponential smoothing
        float smoothing = 0.6f;
        params.param_angle_y = last_params_.param_angle_y * smoothing + target_angle_y * (1.0f - smoothing);
        params.param_angle_x = last_params_.param_angle_x * smoothing + target_angle_x * (1.0f - smoothing);
        params.param_angle_z = 0.0f; // Roll is hard to get from bounding box alone
        params.param_body_angle_x = params.param_angle_y * 0.4f;

        // Defaults for eyes and mouth
        params.param_eye_l_open = 1.0f;
        params.param_eye_r_open = 1.0f;
        params.param_mouth_open_y = 0.0f;

        last_params_ = params;
    } else {
        // Return to neutral if no face detected
        float smoothing = 0.8f;
        params.param_angle_y = last_params_.param_angle_y * smoothing;
        params.param_angle_x = last_params_.param_angle_x * smoothing;
        params.param_angle_z = last_params_.param_angle_z * smoothing;
        params.param_body_angle_x = last_params_.param_body_angle_x * smoothing;
        last_params_ = params;
    }

    return params;
}

} // namespace motion
} // namespace vtuber
