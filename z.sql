-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-07-23 10:13:57
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `applet`
--

-- --------------------------------------------------------

--
-- 表的结构 `banner`
--

CREATE TABLE IF NOT EXISTS `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT 'Banner名称，通常作为标识',
  `description` varchar(255) DEFAULT NULL COMMENT 'Banner描述',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='banner管理表' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `banner`
--

INSERT INTO `banner` (`id`, `name`, `description`, `delete_time`, `update_time`) VALUES
(1, '首页置顶', '首页轮播图', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `banner_item`
--

CREATE TABLE IF NOT EXISTS `banner_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_id` int(11) NOT NULL COMMENT '外键，关联image表',
  `key_word` varchar(100) NOT NULL COMMENT '执行关键字，根据不同的type含义不同',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '跳转类型，可能导向商品，可能导向专题，可能导向其他。0，无导向；1：导向商品;2:导向专题',
  `delete_time` int(11) DEFAULT NULL,
  `banner_id` int(11) NOT NULL COMMENT '外键，关联banner表',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='banner子项表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `banner_item`
--

INSERT INTO `banner_item` (`id`, `img_id`, `key_word`, `type`, `delete_time`, `banner_id`, `update_time`) VALUES
(1, 65, '6', 1, NULL, 1, NULL),
(2, 2, '25', 1, NULL, 1, NULL),
(3, 3, '11', 1, NULL, 1, NULL),
(5, 1, '10', 1, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `topic_img_id` int(11) DEFAULT NULL COMMENT '外键，关联image表',
  `delete_time` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL COMMENT '描述',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='商品类目' AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `name`, `topic_img_id`, `delete_time`, `description`, `update_time`) VALUES
(2, '果味', 6, NULL, NULL, NULL),
(3, '蔬菜', 5, NULL, NULL, NULL),
(4, '炒货', 7, NULL, NULL, NULL),
(5, '点心', 4, NULL, NULL, NULL),
(6, '粗茶', 8, NULL, NULL, NULL),
(7, '淡饭', 9, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `img`
--

CREATE TABLE IF NOT EXISTS `img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '图片路径',
  `from` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1 来自本地，2 来自公网',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='图片总表' AUTO_INCREMENT=70 ;

--
-- 转存表中的数据 `img`
--

INSERT INTO `img` (`id`, `url`, `from`, `delete_time`, `update_time`) VALUES
(1, '/banner-1a.png', 1, NULL, NULL),
(2, '/banner-2a.png', 1, NULL, NULL),
(3, '/banner-3a.png', 1, NULL, NULL),
(4, '/category-cake.png', 1, NULL, NULL),
(5, '/category-vg.png', 1, NULL, NULL),
(6, '/category-dryfruit.png', 1, NULL, NULL),
(7, '/category-fry-a.png', 1, NULL, NULL),
(8, '/category-tea.png', 1, NULL, NULL),
(9, '/category-rice.png', 1, NULL, NULL),
(10, '/product-dryfruit@1.png', 1, NULL, NULL),
(13, '/product-vg@1.png', 1, NULL, NULL),
(14, '/product-rice@6.png', 1, NULL, NULL),
(16, '/1@theme.png', 1, NULL, NULL),
(17, '/2@theme.png', 1, NULL, NULL),
(18, '/3@theme.png', 1, NULL, NULL),
(19, '/detail-1@1-dryfruit.png', 1, NULL, NULL),
(20, '/detail-2@1-dryfruit.png', 1, NULL, NULL),
(21, '/detail-3@1-dryfruit.png', 1, NULL, NULL),
(22, '/detail-4@1-dryfruit.png', 1, NULL, NULL),
(23, '/detail-5@1-dryfruit.png', 1, NULL, NULL),
(24, '/detail-6@1-dryfruit.png', 1, NULL, NULL),
(25, '/detail-7@1-dryfruit.png', 1, NULL, NULL),
(26, '/detail-8@1-dryfruit.png', 1, NULL, NULL),
(27, '/detail-9@1-dryfruit.png', 1, NULL, NULL),
(28, '/detail-11@1-dryfruit.png', 1, NULL, NULL),
(29, '/detail-10@1-dryfruit.png', 1, NULL, NULL),
(31, '/product-rice@1.png', 1, NULL, NULL),
(32, '/product-tea@1.png', 1, NULL, NULL),
(33, '/product-dryfruit@2.png', 1, NULL, NULL),
(36, '/product-dryfruit@3.png', 1, NULL, NULL),
(37, '/product-dryfruit@4.png', 1, NULL, NULL),
(38, '/product-dryfruit@5.png', 1, NULL, NULL),
(39, '/product-dryfruit-a@6.png', 1, NULL, NULL),
(40, '/product-dryfruit@7.png', 1, NULL, NULL),
(41, '/product-rice@2.png', 1, NULL, NULL),
(42, '/product-rice@3.png', 1, NULL, NULL),
(43, '/product-rice@4.png', 1, NULL, NULL),
(44, '/product-fry@1.png', 1, NULL, NULL),
(45, '/product-fry@2.png', 1, NULL, NULL),
(46, '/product-fry@3.png', 1, NULL, NULL),
(47, '/product-tea@2.png', 1, NULL, NULL),
(48, '/product-tea@3.png', 1, NULL, NULL),
(49, '/1@theme-head.png', 1, NULL, NULL),
(50, '/2@theme-head.png', 1, NULL, NULL),
(51, '/3@theme-head.png', 1, NULL, NULL),
(52, '/product-cake@1.png', 1, NULL, NULL),
(53, '/product-cake@2.png', 1, NULL, NULL),
(54, '/product-cake-a@3.png', 1, NULL, NULL),
(55, '/product-cake-a@4.png', 1, NULL, NULL),
(56, '/product-dryfruit@8.png', 1, NULL, NULL),
(57, '/product-fry@4.png', 1, NULL, NULL),
(58, '/product-fry@5.png', 1, NULL, NULL),
(59, '/product-rice@5.png', 1, NULL, NULL),
(60, '/product-rice@7.png', 1, NULL, NULL),
(62, '/detail-12@1-dryfruit.png', 1, NULL, NULL),
(63, '/detail-13@1-dryfruit.png', 1, NULL, NULL),
(65, '/banner-4a.png', 1, NULL, NULL),
(66, '/product-vg@4.png', 1, NULL, NULL),
(67, '/product-vg@5.png', 1, NULL, NULL),
(68, '/product-vg@2.png', 1, NULL, NULL),
(69, '/product-vg@3.png', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(20) NOT NULL COMMENT '订单号',
  `user_id` int(11) NOT NULL COMMENT '外键，用户id，注意并不是openid',
  `delete_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `total_price` decimal(6,2) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1:未支付， 2：已支付，3：已发货 , 4: 已支付，但库存不足',
  `snap_img` varchar(255) DEFAULT NULL COMMENT '订单快照图片',
  `snap_name` varchar(80) DEFAULT NULL COMMENT '订单快照名称',
  `total_count` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) DEFAULT NULL,
  `snap_items` text COMMENT '订单其他信息快照（json)',
  `snap_address` varchar(500) DEFAULT NULL COMMENT '地址快照',
  `prepay_id` varchar(100) DEFAULT NULL COMMENT '订单微信支付的预订单id（用于发送模板消息）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_no` (`order_no`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=38 ;

--
-- 转存表中的数据 `order`
--

INSERT INTO `order` (`id`, `order_no`, `user_id`, `delete_time`, `create_time`, `total_price`, `status`, `snap_img`, `snap_name`, `total_count`, `update_time`, `snap_items`, `snap_address`, `prepay_id`) VALUES
(24, 'A625968220123975', 1, NULL, 1498396822, '0.02', 1, 'http://zerg.com/images/product-vg@1.png', '芹菜 半斤等', 2, 1498396822, '[{"id":1,"name":"\\u82b9\\u83dc \\u534a\\u65a4","productPrice":0.01,"count":1,"hasStock":true},{"id":2,"name":"\\u68a8\\u82b1\\u5e26\\u96e8 3\\u4e2a","productPrice":0.01,"count":1,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","country":"\\u4e2d\\u56fd","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(25, 'A625972657614294', 1, NULL, 1498397265, '0.02', 1, 'http://zerg.com/images/product-vg@1.png', '芹菜 半斤等', 2, 1498397265, '[{"id":1,"name":"\\u82b9\\u83dc \\u534a\\u65a4","productPrice":0.01,"count":1,"hasStock":true},{"id":2,"name":"\\u68a8\\u82b1\\u5e26\\u96e8 3\\u4e2a","productPrice":0.01,"count":1,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","country":"\\u4e2d\\u56fd","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(26, 'A706540371651676', 1, NULL, 1499354037, '0.04', 1, 'http://zerg.com/images/product-dryfruit-a@6.png', '贵妃笑 100克', 4, 1499354037, '[{"id":11,"name":"\\u8d35\\u5983\\u7b11 100\\u514b","productPrice":0.04,"count":4,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(27, 'A706542130427825', 1, NULL, 1499354213, '0.04', 1, 'http://zerg.com/images/product-dryfruit-a@6.png', '贵妃笑 100克', 4, 1499354213, '[{"id":11,"name":"\\u8d35\\u5983\\u7b11 100\\u514b","productPrice":0.04,"count":4,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(28, 'A706543413091340', 1, NULL, 1499354341, '0.04', 1, 'http://zerg.com/images/product-dryfruit-a@6.png', '贵妃笑 100克', 4, 1499354341, '[{"id":11,"name":"\\u8d35\\u5983\\u7b11 100\\u514b","productPrice":0.04,"count":4,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(29, 'A706544065470939', 1, NULL, 1499354406, '0.04', 1, 'http://zerg.com/images/product-dryfruit-a@6.png', '贵妃笑 100克', 4, 1499354406, '[{"id":11,"name":"\\u8d35\\u5983\\u7b11 100\\u514b","productPrice":0.04,"count":4,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(30, 'A706545474028242', 1, NULL, 1499354547, '0.04', 1, 'http://zerg.com/images/product-dryfruit-a@6.png', '贵妃笑 100克', 4, 1499354547, '[{"id":11,"name":"\\u8d35\\u5983\\u7b11 100\\u514b","productPrice":0.04,"count":4,"hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(31, 'A708231679092349', 1, NULL, 1499523167, '0.03', 1, 'http://zerg.com/images/product-dryfruit@2.png', '春生龙眼 500克等', 3, 1499523167, '[{"id":5,"name":"\\u6625\\u751f\\u9f99\\u773c 500\\u514b","productPrice":0.02,"count":2,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@2.png","hasStock":true},{"id":11,"name":"\\u8d35\\u5983\\u7b11 100\\u514b","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit-a@6.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(32, 'A708233973663186', 1, NULL, 1499523397, '0.03', 1, 'http://zerg.com/images/product-dryfruit@1.png', '梨花带雨 3个等', 3, 1499523397, '[{"id":5,"name":"\\u6625\\u751f\\u9f99\\u773c 500\\u514b","productPrice":0.02,"count":2,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@2.png","hasStock":true},{"id":2,"name":"\\u68a8\\u82b1\\u5e26\\u96e8 3\\u4e2a","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@1.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(33, 'A708236037095237', 1, NULL, 1499523603, '0.04', 1, 'http://zerg.com/images/product-dryfruit@1.png', '梨花带雨 3个等', 4, 1499523603, '[{"id":5,"name":"\\u6625\\u751f\\u9f99\\u773c 500\\u514b","productPrice":0.02,"count":2,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@2.png","hasStock":true},{"id":2,"name":"\\u68a8\\u82b1\\u5e26\\u96e8 3\\u4e2a","productPrice":0.02,"count":2,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@1.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(34, 'A708239801718486', 1, NULL, 1499523980, '0.03', 1, 'http://zerg.com/images/product-dryfruit@1.png', '梨花带雨 3个等', 3, 1499523980, '[{"id":5,"name":"\\u6625\\u751f\\u9f99\\u773c 500\\u514b","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@2.png","hasStock":true},{"id":2,"name":"\\u68a8\\u82b1\\u5e26\\u96e8 3\\u4e2a","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@1.png","hasStock":true},{"id":12,"name":"\\u73cd\\u5947\\u5f02\\u679c 3\\u4e2a","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@7.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(35, 'A708282698878690', 1, NULL, 1499528269, '0.02', 1, 'http://zerg.com/images/product-dryfruit@1.png', '梨花带雨 3个等', 2, 1499528269, '[{"id":5,"name":"\\u6625\\u751f\\u9f99\\u773c 500\\u514b","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@2.png","hasStock":true},{"id":2,"name":"\\u68a8\\u82b1\\u5e26\\u96e8 3\\u4e2a","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@1.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u7f57\\u5c71\\u53bf\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(36, 'A709794935082687', 1, NULL, 1499579493, '0.01', 1, 'http://zerg.com/images/product-dryfruit@7.png', '珍奇异果 3个', 1, 1499579493, '[{"id":12,"name":"\\u73cd\\u5947\\u5f02\\u679c 3\\u4e2a","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-dryfruit@7.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL),
(37, 'A709798420171248', 1, NULL, 1499579842, '0.02', 2, 'http://zerg.com/images/product-rice@3.png', '芝麻 50克等', 2, 1499579842, '[{"id":15,"name":"\\u7334\\u5934\\u83c7 370\\u514b","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-rice@4.png","hasStock":true},{"id":14,"name":"\\u829d\\u9ebb 50\\u514b","productPrice":0.01,"count":1,"main_img_url":"http:\\/\\/zerg.com\\/images\\/product-rice@3.png","hasStock":true}]', '{"id":1,"name":"\\u5218\\u4e2d\\u6797","mobile":"17739650739","province":"\\u6cb3\\u5357","city":"\\u4fe1\\u9633","county":"\\u7f57\\u5c71","detail":"\\u5468\\u515a\\u9547\\u6842\\u5e97\\u6751\\u6613\\u697c\\u7ec4","delete_time":null,"user_id":1,"update_time":"1970-01-01 08:00:00"}', NULL);

-- --------------------------------------------------------

--
-- 表的结构 `order_product`
--

CREATE TABLE IF NOT EXISTS `order_product` (
  `order_id` int(11) NOT NULL COMMENT '联合主键，订单id',
  `product_id` int(11) NOT NULL COMMENT '联合主键，商品id',
  `count` int(11) NOT NULL COMMENT '商品数量',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`,`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `order_product`
--

INSERT INTO `order_product` (`order_id`, `product_id`, `count`, `delete_time`, `update_time`) VALUES
(24, 1, 1, NULL, NULL),
(25, 1, 1, NULL, NULL),
(24, 2, 1, NULL, NULL),
(25, 2, 1, NULL, NULL),
(32, 2, 1, NULL, NULL),
(33, 2, 2, NULL, NULL),
(34, 2, 1, NULL, NULL),
(35, 2, 1, NULL, NULL),
(31, 5, 2, NULL, NULL),
(32, 5, 2, NULL, NULL),
(33, 5, 2, NULL, NULL),
(34, 5, 1, NULL, NULL),
(35, 5, 1, NULL, NULL),
(26, 11, 4, NULL, NULL),
(27, 11, 4, NULL, NULL),
(28, 11, 4, NULL, NULL),
(29, 11, 4, NULL, NULL),
(30, 11, 4, NULL, NULL),
(31, 11, 1, NULL, NULL),
(34, 12, 1, NULL, NULL),
(36, 12, 1, NULL, NULL),
(37, 14, 1, NULL, NULL),
(37, 15, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL COMMENT '商品名称',
  `price` decimal(6,2) NOT NULL COMMENT '价格,单位：分',
  `stock` int(11) NOT NULL DEFAULT '0' COMMENT '库存量',
  `delete_time` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `main_img_url` varchar(255) DEFAULT NULL COMMENT '主图ID号，这是一个反范式设计，有一定的冗余',
  `from` tinyint(4) NOT NULL DEFAULT '1' COMMENT '图片来自 1 本地 ，2公网',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL,
  `summary` varchar(50) DEFAULT NULL COMMENT '摘要',
  `img_id` int(11) DEFAULT NULL COMMENT '图片外键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `stock`, `delete_time`, `category_id`, `main_img_url`, `from`, `create_time`, `update_time`, `summary`, `img_id`) VALUES
(1, '芹菜 半斤', '0.01', 1000, NULL, 3, '/product-vg@1.png', 1, NULL, NULL, NULL, 13),
(2, '梨花带雨 3个', '0.01', 984, NULL, 2, '/product-dryfruit@1.png', 1, NULL, NULL, NULL, 10),
(3, '素米 327克', '0.01', 996, NULL, 7, '/product-rice@1.png', 1, NULL, NULL, NULL, 31),
(4, '红袖枸杞 6克*3袋', '0.01', 998, NULL, 6, '/product-tea@1.png', 1, NULL, NULL, NULL, 32),
(5, '春生龙眼 500克', '0.01', 995, NULL, 2, '/product-dryfruit@2.png', 1, NULL, NULL, NULL, 33),
(6, '小红的猪耳朵 120克', '0.01', 997, NULL, 5, '/product-cake@2.png', 1, NULL, NULL, NULL, 53),
(7, '泥蒿 半斤', '0.01', 998, NULL, 3, '/product-vg@2.png', 1, NULL, NULL, NULL, 68),
(8, '夏日芒果 3个', '0.01', 995, NULL, 2, '/product-dryfruit@3.png', 1, NULL, NULL, NULL, 36),
(9, '冬木红枣 500克', '0.01', 996, NULL, 2, '/product-dryfruit@4.png', 1, NULL, NULL, NULL, 37),
(10, '万紫千凤梨 300克', '0.01', 996, NULL, 2, '/product-dryfruit@5.png', 1, NULL, NULL, NULL, 38),
(11, '贵妃笑 100克', '0.01', 994, NULL, 2, '/product-dryfruit-a@6.png', 1, NULL, NULL, NULL, 39),
(12, '珍奇异果 3个', '0.01', 999, NULL, 2, '/product-dryfruit@7.png', 1, NULL, NULL, NULL, 40),
(13, '绿豆 125克', '0.01', 999, NULL, 7, '/product-rice@2.png', 1, NULL, NULL, NULL, 41),
(14, '芝麻 50克', '0.01', 999, NULL, 7, '/product-rice@3.png', 1, NULL, NULL, NULL, 42),
(15, '猴头菇 370克', '0.01', 999, NULL, 7, '/product-rice@4.png', 1, NULL, NULL, NULL, 43),
(16, '西红柿 1斤', '0.01', 999, NULL, 3, '/product-vg@3.png', 1, NULL, NULL, NULL, 69),
(17, '油炸花生 300克', '0.01', 999, NULL, 4, '/product-fry@1.png', 1, NULL, NULL, NULL, 44),
(18, '春泥西瓜子 128克', '0.01', 997, NULL, 4, '/product-fry@2.png', 1, NULL, NULL, NULL, 45),
(19, '碧水葵花籽 128克', '0.01', 999, NULL, 4, '/product-fry@3.png', 1, NULL, NULL, NULL, 46),
(20, '碧螺春 12克*3袋', '0.01', 999, NULL, 6, '/product-tea@2.png', 1, NULL, NULL, NULL, 47),
(21, '西湖龙井 8克*3袋', '0.01', 998, NULL, 6, '/product-tea@3.png', 1, NULL, NULL, NULL, 48),
(22, '梅兰清花糕 1个', '0.01', 997, NULL, 5, '/product-cake-a@3.png', 1, NULL, NULL, NULL, 54),
(23, '清凉薄荷糕 1个', '0.01', 998, NULL, 5, '/product-cake-a@4.png', 1, NULL, NULL, NULL, 55),
(25, '小明的妙脆角 120克', '0.01', 999, NULL, 5, '/product-cake@1.png', 1, NULL, NULL, NULL, 52),
(26, '红衣青瓜 混搭160克', '0.01', 999, NULL, 2, '/product-dryfruit@8.png', 1, NULL, NULL, NULL, 56),
(27, '锈色瓜子 100克', '0.01', 998, NULL, 4, '/product-fry@4.png', 1, NULL, NULL, NULL, 57),
(28, '春泥花生 200克', '0.01', 999, NULL, 4, '/product-fry@5.png', 1, NULL, NULL, NULL, 58),
(29, '冰心鸡蛋 2个', '0.01', 999, NULL, 7, '/product-rice@5.png', 1, NULL, NULL, NULL, 59),
(30, '八宝莲子 200克', '0.01', 999, NULL, 7, '/product-rice@6.png', 1, NULL, NULL, NULL, 14),
(31, '深涧木耳 78克', '0.01', 999, NULL, 7, '/product-rice@7.png', 1, NULL, NULL, NULL, 60),
(32, '土豆 半斤', '0.01', 999, NULL, 3, '/product-vg@4.png', 1, NULL, NULL, NULL, 66),
(33, '青椒 半斤', '0.01', 999, NULL, 3, '/product-vg@5.png', 1, NULL, NULL, NULL, 67);

-- --------------------------------------------------------

--
-- 表的结构 `product_img`
--

CREATE TABLE IF NOT EXISTS `product_img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img_id` int(11) NOT NULL COMMENT '外键，关联图片表',
  `delete_time` int(11) DEFAULT NULL COMMENT '状态，主要表示是否删除，也可以扩展其他状态',
  `order` int(11) NOT NULL DEFAULT '0' COMMENT '图片排序序号',
  `product_id` int(11) NOT NULL COMMENT '商品id，外键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=20 ;

--
-- 转存表中的数据 `product_img`
--

INSERT INTO `product_img` (`id`, `img_id`, `delete_time`, `order`, `product_id`) VALUES
(4, 19, NULL, 1, 11),
(5, 20, NULL, 2, 11),
(6, 21, NULL, 3, 11),
(7, 22, NULL, 4, 11),
(8, 23, NULL, 5, 11),
(9, 24, NULL, 6, 11),
(10, 25, NULL, 7, 11),
(11, 26, NULL, 8, 11),
(12, 27, NULL, 9, 11),
(13, 28, NULL, 11, 11),
(14, 29, NULL, 10, 11),
(18, 62, NULL, 12, 11),
(19, 63, NULL, 13, 11);

-- --------------------------------------------------------

--
-- 表的结构 `product_property`
--

CREATE TABLE IF NOT EXISTS `product_property` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT '' COMMENT '详情属性名称',
  `detail` varchar(255) NOT NULL COMMENT '详情属性',
  `product_id` int(11) NOT NULL COMMENT '商品id，外键',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `product_property`
--

INSERT INTO `product_property` (`id`, `name`, `detail`, `product_id`, `delete_time`, `update_time`) VALUES
(1, '品名', '杨梅', 11, NULL, NULL),
(2, '口味', '青梅味 雪梨味 黄桃味 菠萝味', 11, NULL, NULL),
(3, '产地', '火星', 11, NULL, NULL),
(4, '保质期', '180天', 11, NULL, NULL),
(5, '品名', '梨子', 2, NULL, NULL),
(6, '产地', '金星', 2, NULL, NULL),
(7, '净含量', '100g', 2, NULL, NULL),
(8, '保质期', '10天', 2, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `rest_banner`
--

CREATE TABLE IF NOT EXISTS `rest_banner` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT 'banner 名称，通常作为标识',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT 'banner 描述',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='banner 管理表' AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `rest_banner`
--

INSERT INTO `rest_banner` (`id`, `name`, `description`, `delete_time`, `update_time`) VALUES
(1, '水果派', '测试数据', 0, 0),
(2, '测试派1', '测试数据1', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_banner_item`
--

CREATE TABLE IF NOT EXISTS `rest_banner_item` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `img_id` int(11) unsigned NOT NULL COMMENT '外键，关联image表',
  `key_word` varchar(100) NOT NULL COMMENT '执行关键字，根据不同的type含义不同',
  `type` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '跳转类型，可能导向商品，可能导向',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `banner_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '外键管理banner表',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='banner的子项表' AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `rest_banner_item`
--

INSERT INTO `rest_banner_item` (`id`, `img_id`, `key_word`, `type`, `delete_time`, `banner_id`, `update_time`) VALUES
(1, 1, '测试数据', 1, 0, 1, 0),
(2, 2, '测试数据', 1, 0, 1, 0),
(3, 3, '测试数据3', 1, 0, 1, 0),
(4, 4, '测试数据4', 1, 0, 1, 0),
(5, 4, '测试数据5', 1, 0, 2, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_category`
--

CREATE TABLE IF NOT EXISTS `rest_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `top_img_id` int(11) NOT NULL DEFAULT '0',
  `description` varchar(255) NOT NULL DEFAULT '',
  `delete_time` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_name` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `rest_category`
--

INSERT INTO `rest_category` (`id`, `name`, `top_img_id`, `description`, `delete_time`, `update_time`) VALUES
(1, '果味', 1, '测试1', 0, 0),
(2, '点心', 2, '测试2', 0, 0),
(3, '炒菜', 3, '测试3', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_img`
--

CREATE TABLE IF NOT EXISTS `rest_img` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL DEFAULT '',
  `from` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='crest_banner_item 图片表' AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `rest_img`
--

INSERT INTO `rest_img` (`id`, `url`, `from`, `delete_time`, `update_time`) VALUES
(1, '1@theme-head.png', 1, 0, 0),
(2, '2@theme-head.png', 1, 0, 0),
(3, '3@theme.png', 1, 0, 0),
(4, 'banner-1a.png', 1, 0, 0),
(5, 'theme-1.jpg', 1, 0, 0),
(6, 'detail-7@1-dryfruit.png', 1, 0, 0),
(7, 'detail-8@1-dryfruit.png', 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_product`
--

CREATE TABLE IF NOT EXISTS `rest_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `stock` int(11) unsigned NOT NULL DEFAULT '0',
  `category_id` int(11) unsigned NOT NULL DEFAULT '0',
  `main_img_url` varchar(200) NOT NULL DEFAULT '',
  `from` tinyint(1) NOT NULL DEFAULT '1',
  `create_time` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) NOT NULL DEFAULT '0',
  `summary` decimal(10,2) NOT NULL DEFAULT '0.00',
  `img_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `rest_product`
--

INSERT INTO `rest_product` (`id`, `name`, `price`, `stock`, `category_id`, `main_img_url`, `from`, `create_time`, `update_time`, `summary`, `img_id`) VALUES
(1, '商品1', '100.00', 88, 1, 'theme-1.jpg', 1, 0, 0, '0.00', 5),
(2, '商品2', '88.00', 88, 1, 'theme-1.jpg', 1, 0, 0, '0.00', 4);

-- --------------------------------------------------------

--
-- 表的结构 `rest_product_img`
--

CREATE TABLE IF NOT EXISTS `rest_product_img` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `img_id` int(10) unsigned NOT NULL DEFAULT '0',
  `product_id` int(10) unsigned NOT NULL DEFAULT '0',
  `order` int(10) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `rest_product_img`
--

INSERT INTO `rest_product_img` (`id`, `img_id`, `product_id`, `order`, `delete_time`) VALUES
(1, 1, 1, 0, 0),
(2, 5, 1, 0, 0),
(3, 6, 1, 0, 0),
(4, 7, 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_product_property`
--

CREATE TABLE IF NOT EXISTS `rest_product_property` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `detail` varchar(200) NOT NULL DEFAULT '',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `delete_time` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `rest_product_property`
--

INSERT INTO `rest_product_property` (`id`, `name`, `detail`, `product_id`, `delete_time`, `update_time`) VALUES
(1, '测试名称', '测试内容', 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_theme`
--

CREATE TABLE IF NOT EXISTS `rest_theme` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `topic_img_id` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `head_img_id` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `rest_theme`
--

INSERT INTO `rest_theme` (`id`, `name`, `description`, `topic_img_id`, `delete_time`, `head_img_id`, `update_time`) VALUES
(1, '专题栏目1', '测试', 5, 0, 5, 0),
(2, '专题栏目2', '测试', 5, 0, 5, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_theme_product`
--

CREATE TABLE IF NOT EXISTS `rest_theme_product` (
  `theme_id` int(11) unsigned NOT NULL,
  `product_id` int(11) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `rest_theme_product`
--

INSERT INTO `rest_theme_product` (`theme_id`, `product_id`) VALUES
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- 表的结构 `rest_user`
--

CREATE TABLE IF NOT EXISTS `rest_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `openid` int(10) unsigned NOT NULL DEFAULT '0',
  `nickname` varchar(50) NOT NULL DEFAULT '',
  `extend` varchar(50) NOT NULL DEFAULT '',
  `delete_time` int(11) NOT NULL DEFAULT '0',
  `update_time` int(11) NOT NULL DEFAULT '0',
  `create_time` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_openid` (`openid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `rest_user`
--

INSERT INTO `rest_user` (`id`, `openid`, `nickname`, `extend`, `delete_time`, `update_time`, `create_time`) VALUES
(1, 123456789, '薛定谔', '', 0, 0, 0),
(2, 123456798, '测试用户', '', 0, 0, 0),
(7, 123456, '', '', 0, 0, 0),
(9, 123456, '', '', 0, 0, 0),
(10, 12389456, '', '', 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `rest_user_address`
--

CREATE TABLE IF NOT EXISTS `rest_user_address` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '',
  `mobile` varchar(15) NOT NULL DEFAULT '',
  `province` varchar(30) NOT NULL DEFAULT '',
  `city` varchar(30) NOT NULL DEFAULT '',
  `county` varchar(30) NOT NULL DEFAULT '',
  `detail` varchar(100) NOT NULL DEFAULT '',
  `userid` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` int(10) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `rest_user_address`
--

INSERT INTO `rest_user_address` (`id`, `name`, `mobile`, `province`, `city`, `county`, `detail`, `userid`, `create_time`, `delete_time`) VALUES
(1, 'liu', '123456789', '河南', '信阳', '罗山', '周党', 10, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `theme`
--

CREATE TABLE IF NOT EXISTS `theme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '专题名称',
  `description` varchar(255) DEFAULT NULL COMMENT '专题描述',
  `topic_img_id` int(11) NOT NULL COMMENT '主题图，外键',
  `delete_time` int(11) DEFAULT NULL,
  `head_img_id` int(11) NOT NULL COMMENT '专题列表页，头图',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='主题信息表' AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `theme`
--

INSERT INTO `theme` (`id`, `name`, `description`, `topic_img_id`, `delete_time`, `head_img_id`, `update_time`) VALUES
(1, '专题栏位一', '美味水果世界', 16, NULL, 49, NULL),
(2, '专题栏位二', '新品推荐', 17, NULL, 50, NULL),
(3, '专题栏位三', '做个干物女', 18, NULL, 18, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `theme_product`
--

CREATE TABLE IF NOT EXISTS `theme_product` (
  `theme_id` int(11) NOT NULL COMMENT '主题外键',
  `product_id` int(11) NOT NULL COMMENT '商品外键',
  PRIMARY KEY (`theme_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='主题所包含的商品';

--
-- 转存表中的数据 `theme_product`
--

INSERT INTO `theme_product` (`theme_id`, `product_id`) VALUES
(1, 2),
(1, 5),
(1, 8),
(1, 10),
(1, 12),
(2, 1),
(2, 2),
(2, 3),
(2, 5),
(2, 6),
(2, 16),
(2, 33),
(3, 15),
(3, 18),
(3, 19),
(3, 27),
(3, 30),
(3, 31);

-- --------------------------------------------------------

--
-- 表的结构 `third_app`
--

CREATE TABLE IF NOT EXISTS `third_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` varchar(64) NOT NULL COMMENT '应用app_id',
  `app_secret` varchar(64) NOT NULL COMMENT '应用secret',
  `app_description` varchar(100) DEFAULT NULL COMMENT '应用程序描述',
  `scope` varchar(20) NOT NULL COMMENT '应用权限',
  `scope_description` varchar(100) DEFAULT NULL COMMENT '权限描述',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='访问API的各应用账号密码表' AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `third_app`
--

INSERT INTO `third_app` (`id`, `app_id`, `app_secret`, `app_description`, `scope`, `scope_description`, `delete_time`, `update_time`) VALUES
(1, 'appid', 'e10adc3949ba59abbe56e057f20f883e', 'CMS', '32', 'Super', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `extend` varchar(255) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL COMMENT '注册时间',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `openid`, `nickname`, `extend`, `delete_time`, `create_time`, `update_time`) VALUES
(1, 'ov5YM0TreV0qoj_rwKyoaSsHtV_U', NULL, NULL, NULL, 1497605147, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `user_address`
--

CREATE TABLE IF NOT EXISTS `user_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '收获人姓名',
  `mobile` varchar(20) NOT NULL COMMENT '手机号',
  `province` varchar(20) DEFAULT NULL COMMENT '省',
  `city` varchar(20) DEFAULT NULL COMMENT '市',
  `county` varchar(20) DEFAULT NULL COMMENT '区',
  `detail` varchar(100) DEFAULT NULL COMMENT '详细地址',
  `delete_time` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL COMMENT '外键',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_address`
--

INSERT INTO `user_address` (`id`, `name`, `mobile`, `province`, `city`, `county`, `detail`, `delete_time`, `user_id`, `update_time`) VALUES
(1, '刘中林', '17739650739', '河南', '信阳', '罗山', '周党镇桂店村易楼组', NULL, 1, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
