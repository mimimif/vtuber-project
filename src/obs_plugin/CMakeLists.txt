cmake_minimum_required(VERSION 3.16)
project(obs-vtuber-plugin VERSION 0.1.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find libobs (Requires OBS Studio development environment to be setup)
# For the skeleton, we will use a placeholder or assume libobs is in path.
# find_package(libobs REQUIRED) 
# To actually build this eventually, the user will need to point to OBS Studio sources / build.

add_library(${PROJECT_NAME} MODULE 
    src/obs_vtuber_plugin.cpp
)

# Placeholder link info
# target_link_libraries(${PROJECT_NAME} OBS::libobs)

# Platform specific configurations for OBS plugins
if(WIN32)
    set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "")
endif()
