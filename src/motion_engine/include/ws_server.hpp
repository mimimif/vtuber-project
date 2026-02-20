#pragma once

#include <string>
#include <functional>
#include <memory>
#include <thread>

namespace vtuber {
namespace motion {

struct MotionData {
    std::string bone_name;
    float rotation_x;
    float rotation_y;
    float rotation_z;
    float rotation_w; // quaternion
    float weight;     // for blendshapes
    bool is_blendshape;
};

class WSServerImpl;

class WebSocketServer {
public:
    WebSocketServer();
    ~WebSocketServer();

    bool start(int port = 9002);
    void stop();
    
    // Broadcast data to all connected clients (OBS Plugin, Avatar Builder)
    void broadcast_motion_data(const MotionData& data);

private:
    std::unique_ptr<WSServerImpl> impl_;
    std::thread server_thread_;
    bool is_running_;
};

} // namespace motion
} // namespace vtuber
