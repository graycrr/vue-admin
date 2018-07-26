<template>
    <el-containner>
        <el-header>Header</el-header>
        <el-containner>
            <el-aside width="200px">
                <el-menu
                  default-active="1"
                  close="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse"
                   ></el-menu>
                   <el-submenu>
                       
                   </el-submenu>
            </el-aside>
            <el-main>Main</el-main>
        </el-containner>
    </el-containner>
</template>
