cmake_minimum_required(VERSION 3.14)
project(MotionEngine VERSION 0.1.0)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Add include directories
include_directories(${PROJECT_SOURCE_DIR}/include)

include(FetchContent)

# Asio (header only)
FetchContent_Declare(
  asio
  GIT_REPOSITORY https://github.com/chriskohlhoff/asio.git
  GIT_TAG asio-1-28-0
)
FetchContent_MakeAvailable(asio)

# WebSocket++ (header only)
FetchContent_Declare(
  websocketpp
  GIT_REPOSITORY https://github.com/zaphoyd/websocketpp.git
  GIT_TAG 0.8.2
)
FetchContent_MakeAvailable(websocketpp)

# JSON
FetchContent_Declare(json
  GIT_REPOSITORY https://github.com/nlohmann/json.git
  GIT_TAG v3.11.2
)
FetchContent_MakeAvailable(json)

# Find OpenCV
find_package(OpenCV REQUIRED)
message(STATUS "OpenCV library status:")
message(STATUS "    version: ${OpenCV_VERSION}")
message(STATUS "    libraries: ${OpenCV_LIBS}")
message(STATUS "    include path: ${OpenCV_INCLUDE_DIRS}")

include_directories(
    ${OpenCV_INCLUDE_DIRS}
    ${asio_SOURCE_DIR}/asio/include
    ${websocketpp_SOURCE_DIR}
)

# Add executable
add_executable(MotionEngine 
    src/main.cpp
    src/camera_input.cpp
    src/ws_server.cpp
)

# Link OpenCV, Json, and Threads
find_package(Threads REQUIRED)
target_link_libraries(MotionEngine PRIVATE 
    ${OpenCV_LIBS} 
    nlohmann_json::nlohmann_json
    Threads::Threads
)
