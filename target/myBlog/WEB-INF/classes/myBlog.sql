/*
 Navicat Premium Data Transfer

 Source Server         : DB
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost
 Source Database       : myBlog

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : utf-8

 Date: 12/02/2017 15:29:48 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `article_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `article_name` varchar(255) NOT NULL,
  `article_content` text,
  `article_pic` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  `article_type` varchar(24) NOT NULL,
  `article_time` bigint(20) NOT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `favourite`
-- ----------------------------
DROP TABLE IF EXISTS `favourite`;
CREATE TABLE `favourite` (
  `favourite_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `favourite_title` varchar(255) NOT NULL,
  `favourite_desc` varchar(255) NOT NULL,
  `favourite_content` text NOT NULL,
  `favourite_pic` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `favourite_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`favourite_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `project_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) NOT NULL,
  `project_content` text,
  `project_pic` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `project_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(24) NOT NULL,
  `birth_date` bigint(20) NOT NULL DEFAULT '0',
  `user_info` text,
  `user_pic` varchar(255) DEFAULT NULL,
  `open_id` varchar(24) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
