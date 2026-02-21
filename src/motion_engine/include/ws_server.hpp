#pragma once

#include <string>
#include <functional>
#include <memory>
#include <thread>

namespace vtuber {
namespace motion {

#include "face_tracker.hpp"

namespace vtuber {
namespace motion {

class WSServerImpl;

class WebSocketServer {
public:
    WebSocketServer();
    ~WebSocketServer();

    bool start(int port = 9002);
    void stop();
    
    // Broadcast data to all connected clients (OBS Plugin, Avatar Builder)
    void broadcast_motion_data(const Avatar2DParams& data);

private:
    std::unique_ptr<WSServerImpl> impl_;
    std::thread server_thread_;
    bool is_running_;
};

} // namespace motion
} // namespace vtuber
