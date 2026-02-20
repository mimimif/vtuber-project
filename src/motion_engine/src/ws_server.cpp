#include "ws_server.hpp"
#include <iostream>
#include <vector>
#include <mutex>

// By defining ASIO_STANDALONE, we can use websocketpp without Boost
#define ASIO_STANDALONE
#include <websocketpp/config/asio_no_tls.hpp>
#include <websocketpp/server.hpp>
#include <nlohmann/json.hpp>

typedef websocketpp::server<websocketpp::config::asio> server;

using websocketpp::connection_hdl;
using json = nlohmann::json;

namespace vtuber {
namespace motion {

class WSServerImpl {
public:
    WSServerImpl() {
        srv.clear_access_channels(websocketpp::log::alevel::all);
        srv.set_access_channels(websocketpp::log::alevel::access_core);
        srv.set_access_channels(websocketpp::log::alevel::app);

        srv.init_asio();

        srv.set_open_handler(bind(&WSServerImpl::on_open, this, std::placeholders::_1));
        srv.set_close_handler(bind(&WSServerImpl::on_close, this, std::placeholders::_1));
    }

    void run(uint16_t port) {
        srv.listen(port);
        srv.start_accept();
        srv.run();
    }

    void stop() {
        srv.stop();
    }

    void on_open(connection_hdl hdl) {
        std::lock_guard<std::mutex> lock(m_connections_lock);
        m_connections.push_back(hdl);
        std::cout << "WebSocket Client connected." << std::endl;
    }

    void on_close(connection_hdl hdl) {
        std::lock_guard<std::mutex> lock(m_connections_lock);
        m_connections.erase(std::remove_if(m_connections.begin(), m_connections.end(),
            [&hdl](const connection_hdl& h) {
                return !h.owner_before(hdl) && !hdl.owner_before(h);
            }), m_connections.end());
        std::cout << "WebSocket Client disconnected." << std::endl;
    }

    void broadcast(const std::string& msg) {
        std::lock_guard<std::mutex> lock(m_connections_lock);
        for (auto it : m_connections) {
            srv.send(it, msg, websocketpp::frame::opcode::text);
        }
    }

private:
    server srv;
    std::vector<connection_hdl> m_connections;
    std::mutex m_connections_lock;
};

WebSocketServer::WebSocketServer() : impl_(std::make_unique<WSServerImpl>()), is_running_(false) {}

WebSocketServer::~WebSocketServer() {
    stop();
}

bool WebSocketServer::start(int port) {
    if (is_running_) return false;
    
    try {
        is_running_ = true;
        server_thread_ = std::thread([this, port]() {
            std::cout << "WebSocket Server starting on port " << port << std::endl;
            impl_->run(port);
        });
        return true;
    } catch (const std::exception& e) {
        std::cerr << "WebSocket server failed to start: " << e.what() << std::endl;
        is_running_ = false;
        return false;
    }
}

void WebSocketServer::stop() {
    if (!is_running_) return;
    
    impl_->stop();
    if (server_thread_.joinable()) {
        server_thread_.join();
    }
    is_running_ = false;
}

void WebSocketServer::broadcast_motion_data(const MotionData& data) {
    if (!is_running_) return;

    json j;
    j["type"] = data.is_blendshape ? "blendshape" : "bone";
    j["name"] = data.bone_name;
    
    if (data.is_blendshape) {
        j["weight"] = data.weight;
    } else {
        j["rotation"] = {
            {"x", data.rotation_x},
            {"y", data.rotation_y},
            {"z", data.rotation_z},
            {"w", data.rotation_w}
        };
    }

    impl_->broadcast(j.dump());
}

} // namespace motion
} // namespace vtuber
