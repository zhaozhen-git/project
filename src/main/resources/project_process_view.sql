/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.3.240_3306
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : 192.168.3.240:3306
 Source Schema         : project_process_view

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 17/06/2019 15:20:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `departmentID` int(11) NOT NULL COMMENT '部门id',
  `departmentName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '部门名',
  PRIMARY KEY (`departmentID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '管理员');
INSERT INTO `department` VALUES (2, '信息部');
INSERT INTO `department` VALUES (3, '企管部');
INSERT INTO `department` VALUES (4, '销售部');
INSERT INTO `department` VALUES (5, '财务部');
INSERT INTO `department` VALUES (6, '品管部');
INSERT INTO `department` VALUES (7, '供应部');
INSERT INTO `department` VALUES (8, '需求部');

-- ----------------------------
-- Table structure for event
-- ----------------------------
DROP TABLE IF EXISTS `event`;
CREATE TABLE `event`  (
  `project_ID` int(11) NULL DEFAULT NULL,
  `event_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `event_groupLeader` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `event_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `event_startTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `event_endTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `event_description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `days` int(11) NULL DEFAULT NULL COMMENT '周期',
  `event_state` int(11) NULL DEFAULT 0 COMMENT '0:正常；1:紧急；',
  `event_success` int(11) NULL DEFAULT 1 COMMENT '0:完成；1:未完成；',
  `event_tab` int(11) NULL DEFAULT 0 COMMENT '0:选错时间；1:延期',
  `event_progress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '进度（0-100）',
  PRIMARY KEY (`event_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of event
-- ----------------------------
INSERT INTO `event` VALUES (1, 'e0', '水100斤', '901021', NULL, '2019-06-15', '2019-06-18', '2222', 3, 0, 1, 0, '40');

-- ----------------------------
-- Table structure for extra
-- ----------------------------
DROP TABLE IF EXISTS `extra`;
CREATE TABLE `extra`  (
  `project_ID` int(11) NULL DEFAULT NULL,
  `extra_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `extra_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '事件内容',
  `extra_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '负责人工号',
  `extra_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '时间',
  `extra_add` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `extra_success` int(11) NULL DEFAULT 1 COMMENT '0:完成；1：未完成',
  `extra_tab` int(11) NULL DEFAULT 0 COMMENT '0:选错时间；1：延期',
  PRIMARY KEY (`extra_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of extra
-- ----------------------------
INSERT INTO `extra` VALUES (1, 'ex0', '记录数据', '901001', '2019-06-17', '管理员', 1, 0);

-- ----------------------------
-- Table structure for project_user
-- ----------------------------
DROP TABLE IF EXISTS `project_user`;
CREATE TABLE `project_user`  (
  `project_ID` int(11) NOT NULL COMMENT '项目id',
  `user_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '工号',
  `departmentID` int(11) NULL DEFAULT NULL COMMENT '部门ID'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_user
-- ----------------------------
INSERT INTO `project_user` VALUES (1, '901001', 2);
INSERT INTO `project_user` VALUES (1, '901021', 3);
INSERT INTO `project_user` VALUES (1, 'admin', 1);

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects`  (
  `project_ID` int(11) NOT NULL COMMENT '项目ID',
  `project_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目名',
  `project_director` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '任务负责人',
  `project_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '任务完成周期',
  `project_person` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '项目成员',
  `project_supplier` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '供应商联系人',
  `supplier_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '供应商电话',
  `project_demand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '需求方联系人',
  `demand_phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '需求方电话',
  `project_detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '\r\n计划任务详情',
  `supplier_data` varchar(255) CHARACTER SET gb2312 COLLATE gb2312_chinese_ci NULL DEFAULT '' COMMENT '供应商文件',
  `demand_data` varchar(255) CHARACTER SET gb2312 COLLATE gb2312_chinese_ci NULL DEFAULT '' COMMENT '需求商文件',
  `project_state` int(11) NULL DEFAULT 0 COMMENT '0:未完成；1:完成',
  PRIMARY KEY (`project_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of projects
-- ----------------------------
INSERT INTO `projects` VALUES (1, '海飞丝', '901002', '2019-06-13 - 2019-06-22', NULL, '901111', '4', '901222', '1', '去屑丝滑', 'a496f256-dff3-4751-8eeb-8319415ecf052019.01-个税上传.xlsx;1438dd9b-cb47-4429-8284-e10d4309af8e4.23(2yue)(2).xlsx;334909fc-a533-484f-a301-1c94dad0bc8d2019.02-个税上传.xlsx;3d19f456-dad7-4a42-827d-0cb8843c72574.23(1yue)(2).xlsx', 'b3aa6f69-5eef-4d29-b591-04b75255c2d82019.01-个税上传.xlsx;a21d79ca-bb0b-47d0-b271-91d5566c9b362019.02-个税上传.xlsx', 0);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ROLE_ADMIN');
INSERT INTO `role` VALUES (2, 'ROLE_USER');
INSERT INTO `role` VALUES (3, 'ROLE_SUPPLIER');
INSERT INTO `role` VALUES (4, 'ROLE_DEMAND');
INSERT INTO `role` VALUES (5, 'ROLE_MANAGER');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '工号 ',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '姓名',
  `user_password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码',
  `departmentID` int(11) NULL DEFAULT NULL COMMENT '部门id',
  `user_cancel` int(2) NULL DEFAULT 1 COMMENT '0:注销；1:未注销',
  PRIMARY KEY (`user_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('901001', '小王', '123', 2, 1);
INSERT INTO `user` VALUES ('901002', '王哥', '123', 2, 1);
INSERT INTO `user` VALUES ('901010', '王无', '123', 2, 1);
INSERT INTO `user` VALUES ('901020', '王三', '123', 3, 1);
INSERT INTO `user` VALUES ('901021', '张长弓', '123', 3, 1);
INSERT INTO `user` VALUES ('901111', '啊啊啊', '123', 7, 1);
INSERT INTO `user` VALUES ('901222', '等等待', '123', 8, 1);
INSERT INTO `user` VALUES ('admin', '管理员', '123', 1, 1);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `user_ID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role_ID` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`user_ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('901001', 2);
INSERT INTO `user_role` VALUES ('901002', 5);
INSERT INTO `user_role` VALUES ('901010', 2);
INSERT INTO `user_role` VALUES ('901020', 2);
INSERT INTO `user_role` VALUES ('901021', 2);
INSERT INTO `user_role` VALUES ('901111', 3);
INSERT INTO `user_role` VALUES ('901222', 4);
INSERT INTO `user_role` VALUES ('admin', 1);

SET FOREIGN_KEY_CHECKS = 1;
