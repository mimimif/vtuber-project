cmake_minimum_required(VERSION 3.10)
project(MotionEngine VERSION 0.1.0)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Add include directories
include_directories(${PROJECT_SOURCE_DIR}/include)

# Add executable
add_executable(MotionEngine src/main.cpp)

# Example: target_link_libraries(MotionEngine PRIVATE SomeLibrary)
